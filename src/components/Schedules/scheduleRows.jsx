import React, { useEffect, useState } from "react";
import { scheduleValidator } from "../../utils/validator";
import { isEqual } from "../../utils/isEqual";
import ReadOnlyRow from "./readOnlyRow";
import EditableRow from "./editableRow";
import { showErrors } from "../common/errorHelper";
import useAxios from "../../hooks/useAxios";

const ScheduleRows = ({
  newItemId,
  setNewItemId,
  setTitle,
  setModalBody,
  setShow,
  tutors,
  isAdmin,
  schedules,
  setSchedules,
}) => {
  const { data, error, axiosFetch } = useAxios();
  const [saving, setSaving] = useState("");
  const [editId, setEditId] = useState(newItemId);
  const tutorIds = tutors.map((tutor) => tutor.id);

  const handleEdit = (e) => {
    e.stopPropagation();
    const scheduleId = e.target.getAttribute("scheduleid");
    setEditId(scheduleId);
  };

  const handleSave = async (edited) => {
    setSaving(edited.id);
    const schedule = schedules.find(({ id }) => id === edited.id);

    //Abort if nothing has changed or remove from schedules array if empty
    if (isEqual(schedule, edited)) {
      if (schedule.id === newItemId) {
        setSchedules([...schedules.slice(1)]);
        setNewItemId("");
      }
      resetStates();
      return;
    }

    const result = scheduleValidator(edited);
    if (result) {
      setSaving("");
      showErrors(result, setTitle, setShow, setModalBody);
      return;
    }

    if (newItemId) {
      axiosFetch({
        method: "POST",
        url: "/schedules",
        requestConfig: { data: edited },
      });
    } else {
      delete edited.id;
      axiosFetch({
        method: "PUT",
        url: `/schedules/${editId}`,
        requestConfig: { data: edited },
      });
    }
  };

  const handleCancel = () => {
    if (newItemId) {
      setSchedules([...schedules.filter(({ id }) => id !== newItemId)]);
    }
    resetStates();
  };

  const resetStates = () => {
    setNewItemId("");
    setEditId("");
    setSaving("");
  };

  const handleToggle = async (e) => {
    if (saving) {
      return;
    }

    const id = e.target.getAttribute("scheduleid");
    setSaving(id);
    const schedule = schedules.find((item) => item.id === id);

    axiosFetch({
      method: "PUT",
      url: `/schedules/${id}`,
      requestConfig: { data: { isActive: !schedule.isActive } },
    });
  };

  useEffect(() => {
    if (Object.keys(data).length) {
      if (newItemId || editId) {
        let index = schedules.findIndex((item) => item.id === editId);
        setSchedules([
          ...schedules.slice(0, index),
          data,
          ...schedules.slice(++index),
        ]);
      } else {
        let index = schedules.findIndex((item) => item.id === saving);
        setSchedules([
          ...schedules.slice(0, index),
          data,
          ...schedules.slice(++index),
        ]);
      }
      resetStates();
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (error) {
      setSaving("");
      showErrors(error, setTitle, setShow, setModalBody);
    }
    // eslint-disable-next-line
  }, [error]);

  useEffect(() => {
    if (newItemId) {
      setEditId(newItemId);
    }
    // eslint-disable-next-line
  }, [newItemId]);

  let filtered = isAdmin
    ? schedules
    : [...schedules.filter((item) => tutorIds.includes(item.tutorId) && item)];
    
  return filtered
    .sort(compare)
    .map((schedule) =>
      editId === schedule.id ? (
        <EditableRow
          key={schedule.id}
          saving={saving}
          tutors={tutors.filter((tutor) => tutor.isActive)}
          schedule={schedule}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      ) : (
        <ReadOnlyRow
          key={schedule.id}
          saving={saving}
          schedule={schedule}
          admin={isAdmin}
          tutor={tutors.find((tutor) => tutor.id === schedule.tutorId)}
          handleEdit={handleEdit}
          handleToggle={handleToggle}
        />
      )
    );
};

export default ScheduleRows;

function compare(a, b) {
  const days = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
  };

  return days[a.day] - days[b.day];
}
