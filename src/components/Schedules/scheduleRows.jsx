import { useEffect, useState, useContext } from "react";
import { scheduleValidator } from "../../utils/validator";
import { isEqual } from "../../utils/isEqual";
import ReadOnlyRow from "./readOnlyRow";
import EditableRow from "./editableRow";
import { GlobalViewContext } from "../Context/dataContext";
import { TemplateModalNoCtx } from "../common/templateModal";

const ScheduleRows = ({
  schedules,
  admin,
  setSchedules,
  newItemId,
  setNewItemId,
}) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const handleReset = () => {
    setShow(false);
    setModalBody("");
    setTitle("");
  };

  const [reset] = useState(() => handleReset);

  const { loadedSemester } = useContext(GlobalViewContext);
  const [editId, setEditId] = useState(newItemId);
  const [saving, setSaving] = useState(false);


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
    const schedule = getServerFormatted(edited, loadedSemester.id);

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

      setTitle("Validation Error");
      setModalBody(() => () => getErrorModalBody(errorData));
      setShow(true);
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
      )}
      <TemplateModalNoCtx
        title={title}
        show={show}
        modalBody={modalBody}
        reset={reset}
      />
    </>
  );
};

export default ScheduleRows;

function getErrorModalBody(errorData) {
  return (
    <div className="col-10 col-lg-8 mx-auto mb-5">
      {Object.entries(errorData).map(([key, value]) => {
        return (
          <p key={key}>
            {key}: {value}
          </p>
        );
      })}
    </div>
  );
}

function getServerFormatted(schedule, semesterId) {
  return {
    id: schedule.id,
    semesterId,
    tutorId: schedule.tutor.id,
    day: schedule.day,
    startHour: schedule.startHour,
    endHour: schedule.endHour,
    location: schedule.location,
    isActive: schedule.isActive,
  };
}