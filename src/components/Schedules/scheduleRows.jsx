import { useEffect, useState, useContext } from "react";
import { scheduleValidator } from "../../utils/validator";
import { isEqual } from "../../utils/isEqual";
import ReadOnlyRow from "./readOnlyRow";
import EditableRow from "./editableRow";
import { GlobalViewContext } from "../Context/dataContext";
import { ViewContext as TutorContext } from "../Context/tutorsContext";
import { ActionsContext, ViewContext } from "../Context/scheduleContext";
import { postSchedule, putSchedule } from "../../apis/cs-tutoring/schedules";

const ScheduleRows = ({ newItemId, setNewItemId }) => {
  const { tutors } = useContext(TutorContext);
  const { loadedSemester, admin } = useContext(GlobalViewContext);
  const { schedules } = useContext(ViewContext);
  const { setSchedules, setTitle, setModalBody, setShow } =
    useContext(ActionsContext);
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
      const errorData = {};
      if (result.status === 400) {
        errorData.badRequest = result.data.error;
      } else if (result.message === "Network Error") {
        errorData.networkError = "Please check your internet connection!";
      }

      setSaving(null);
      setTitle(result.message ? result.message : "Error Occured");
      const errorBody = getErrorModalBody(errorData);
      setModalBody(() => () => errorBody);
      setShow(true);
    }
  };

  const handleSave = async (edited) => {
    const actual = schedules.find(({ id }) => id === edited.id);
    console.log("Edited:", edited);
    //Abort if nothing has changed or in case of new schedule, drop it if empty
    if (actual && isEqual(actual, edited)) {
      if (actual.id === newItemId) {
        setSchedules([...schedules.slice(1)]);
        setNewItemId(null);
      }
      setEditId(null);
      return;
    }

    //Prepare for server format
    // const schedule = getServerFormatted(edited, loadedSemester.id);
    const result = scheduleValidator(edited);
    if (result) {
      const errorData = {};
      for (let item of result.inner) {
        const name = item.path;
        const message = item.message;
        errorData[name] = message;
      }

      setTitle("Validation Error");
      setModalBody(() => () => getErrorModalBody(errorData));
      setShow(true);
      return;
    }

    const response =
      edited.id === newItemId
        ? await postSchedule(edited)
        : await putSchedule(edited);

    console.log(response);


  };

  const handleCancel = () => {
    console.log(newItemId);
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

  return (
    <>
      {schedules.map((schedule) =>
        editId === schedule.id ? (
          <EditableRow
            key={schedule.id}
            admin={admin}
            tutors={tutors}
            schedule={schedule}
            schedules={schedules}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
        ) : (
          <ReadOnlyRow
            key={schedule.id}
            schedule={schedule}
            admin={admin}
            tutor={tutors.find((tutor) => tutor.id === schedule.tutorId)}
            saving={saving}
            handleEdit={handleEdit}
            handleToggle={handleToggle}
          />
        )
      )}
    </>
  );
};

export default ScheduleRows;

function getErrorModalBody(errorData) {
  return (
    <div className="col-10 col-lg-8 mx-auto mb-5 text-center">
      {Object.entries(errorData).map(([key, value]) => {
        return <p key={key}>{value}</p>;
      })}
    </div>
  );
}

function getServerFormatted(schedule, semesterId) {
  return {
    id: schedule.id,
    semesterId,
    tutorId: schedule.tutorId,
    day: schedule.day,
    startHour: schedule.startHour,
    endHour: schedule.endHour,
    location: schedule.location,
    isActive: schedule.isActive,
  };
}
