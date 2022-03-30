import React, { useEffect, useState, useContext } from "react";
import { scheduleValidator } from "../../utils/validator";
import { isEqual } from "../../utils/isEqual";
import ReadOnlyRow from "./readOnlyRow";
import EditableRow from "./editableRow";
import { ViewContext as TutorContext } from "../../Context/tutorsContext";
import { ActionsContext, ViewContext } from "../../Context/scheduleContext";
import { postSchedule, putSchedule } from "../../apis/cs-tutoring/schedules";
import { showErrors } from "../common/errorHelper";

const ScheduleRows = ({
  newItemId,
  setNewItemId,
  setTitle,
  setModalBody,
  setShow,
}) => {
  const { tutors } = useContext(TutorContext);
  const { schedules, auth, ROLES } = useContext(ViewContext);
  const { setSchedules } = useContext(ActionsContext);
  const [saving, setSaving] = useState(null);
  const [editId, setEditId] = useState(newItemId);

  const handleEdit = (e) => {
    e.stopPropagation();
    const scheduleId = e.target.getAttribute("scheduleid");
    setEditId(scheduleId);
  };

  const handleToggle = async (e) => {
    const id = e.target.getAttribute("scheduleid");
    if (saving) {
      return;
    }

    setSaving(id);
    const item = schedules.find((item) => item.id === id);
    const modified = { ...item, isActive: !item.isActive };
    const result = await putSchedule(modified);

    if (result.status === 200) {
      let index = schedules.findIndex((item) => item.id === id);
      setSaving(null);
      setSchedules([
        ...schedules.slice(0, index),
        result.data,
        ...schedules.slice(++index),
      ]);
    } else {
      setSaving(null);
      showErrors(result, setTitle, setShow, setModalBody);
    }
  };

  const handleSave = async (edited) => {
    setSaving(edited.id);
    const actual = schedules.find(({ id }) => id === edited.id);

    //Abort if nothing has changed or in case of new schedule, drop it if empty
    if (actual && isEqual(actual, edited)) {
      if (actual.id === newItemId) {
        setSchedules([...schedules.slice(1)]);
        setNewItemId(null);
      }
      setEditId(null);
      setSaving(null);
      return;
    }

    const result = scheduleValidator(edited);
    if (result) {
      setSaving(null);
      showErrors(result, setTitle, setShow, setModalBody);
      return;
    }

    const response =
      edited.id === newItemId
        ? await postSchedule(edited)
        : await putSchedule(edited);

    if (response.status === 200 || response.status === 201) {
      let index = schedules.findIndex((item) => item.id === edited.id);
      setSchedules([
        ...schedules.slice(0, index),
        edited,
        ...schedules.slice(++index),
      ]);
      setEditId(null);
      setNewItemId(null);
    } else {
      showErrors(response, setTitle, setShow, setModalBody);
    }

    setSaving(null);
  };

  const handleCancel = () => {
    if (newItemId) {
      setSchedules([...schedules.filter(({ id }) => id !== newItemId)]);
      setNewItemId(null);
    }
    setEditId(null);
  };

  useEffect(() => {
    if (newItemId) {
      setEditId(newItemId);
    }
  }, [newItemId]);

  return [...schedules]
    .sort(compare)
    .map((schedule) =>
      editId === schedule.id ? (
        <EditableRow
          key={schedule.id}
          saving={saving}
          admin={auth?.user?.roles.includes(ROLES.Admin)}
          tutors={tutors.filter((tutor) => tutor.isActive)}
          schedule={schedule}
          schedules={schedules}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      ) : (
        <ReadOnlyRow
          key={schedule.id}
          saving={saving}
          schedule={schedule}
          admin={auth?.user?.roles.includes(ROLES.Admin)}
          isLogged={auth?.user}
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
