import { useEffect, useState, useContext } from "react";
import { scheduleValidator } from "../../utils/validator";
import { isEqual } from "../../utils/isEqual";
import ReadOnlyRow from "./readOnlyRow";
import EditableRow from "./editableRow";
import { GlobalViewContext } from "../Context/dataContext";

const ScheduleRowItem = ({
  schedules,
  admin,
  setSchedules,
  newItemId,
  setNewItemId,
}) => {
  const { loadedSemester } = useContext(GlobalViewContext);
  const [editId, setEditId] = useState(newItemId);
  const [saving, setSaving] = useState(false);
  const template = {
    id: null,
    semesterId: loadedSemester.id,
    day: "",
    startHour: "",
    endHour: "",
    tutor: { id: null, name: "" },
    location: "",
    isActive: false,
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    const scheduleId = e.target.getAttribute("scheduleid");
    console.log(scheduleId);
    setEditId(scheduleId);
  };

  const handleToggle = (e) => {
    console.log(e.target.getAttribute("scheduleid"));
  };

  const handleSave = (edited) => {
    console.log("Edited:", edited);
    const actual = schedules.find(({ id }) => id === edited.id);

    //Abort if nothing has changed or in case of new schedule drop it if empty
    if (actual && isEqual(actual, edited)) {
      if (actual.id === newItemId) {
        setSchedules([...schedules.slice(1)]);
        setNewItemId(null);
      }
      setEditId(null);
      return;
    }

    //Prepare for server format
    const schedule = {
      id: edited.id,
      semesterId: loadedSemester.id,
      tutorId: edited.tutor.id,
      day: edited.day,
      startHour: edited.startHour,
      endHour: edited.endHour,
      location: edited.location,
      isActive: edited.isActive,
    };
    console.log(schedule);
    const result = scheduleValidator(schedule);
    if (result) {
      const errorData = {};
      for (let item of result.inner) {
        const name = item.path;
        const message = item.message;
        errorData[name] = message;
      }
      console.log(JSON.stringify(errorData));
      return;
    }
  };

  const handleCancel = () => {
    console.log(newItemId);
    setEditId(null);
    setNewItemId(null);
    setSchedules([...schedules.filter(({ id }) => id !== newItemId)]);
  };

  useEffect(() => {
    if (newItemId) {
      setSchedules([{ ...template, id: newItemId }, ...schedules]);
    }
    setEditId(newItemId);
  }, [newItemId]);

  return schedules.map((schedule) =>
    editId === schedule.id ? (
      <EditableRow
        key={schedule.id}
        admin={admin}
        schedule={schedule}
        newItemId={newItemId}
        schedules={schedules}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
    ) : (
      <ReadOnlyRow
        key={schedule.id}
        schedule={schedule}
        admin={admin}
        handleEdit={handleEdit}
        handleToggle={handleToggle}
      />
    )
  );
};

export default ScheduleRowItem;
