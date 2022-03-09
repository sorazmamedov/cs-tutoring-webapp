import { useState } from "react";
import { CancelIcon, CheckIcon } from "../common/iconsWithTooltip";

const EditableRow = (props) => {
  const { admin, schedule, schedules, newItemId, handleSave, handleCancel } =
    props;
  const tutors = [
    ...new Set(schedules.slice(1).map(({ tutor }) => tutor.name)),
  ];
  const [edited, setEdited] = useState({ ...schedule });
  const days = [
    "Select",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <tr>
      <td className="px-0">
        {newItemId !== edited.id ? (
          <input
            className="text-center roundBorder"
            type="text"
            defaultValue={edited.day}
            style={{
              width: !edited.day.length ? "10ch" : `${edited.day.length + 1}ch`,
            }}
            onChange={(e) => setEdited({ ...edited, day: e.target.value })}
            required
          />
        ) : (
          <select
            className="roundBorder"
            onChange={(e) => setEdited({ ...edited, day: e.target.value })}
          >
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        )}
      </td>
      <td className="px-0">
        <input
          className="text-center roundBorder"
          type="text"
          defaultValue={edited.startHour}
          style={{
            width: `${edited.startHour.length + 1}ch`,
            minWidth: "10ch",
            maxWidth: "15ch",
          }}
          onChange={(e) => setEdited({ ...edited, startHour: e.target.value })}
          list="hours"
          required
        />
      </td>
      <td className="px-0">
        <input
          className="text-center roundBorder"
          type="text"
          defaultValue={edited.endHour}
          style={{
            width: `${edited.endHour.length + 1}ch`,
            minWidth: "10ch",
            maxWidth: "15ch",
          }}
          onChange={(e) => setEdited({ ...edited, endHour: e.target.value })}
          required
        />
      </td>
      <td className="px-0">
        {newItemId !== edited.id ? (
          <input
            className="text-center roundBorder"
            type="text"
            defaultValue={edited.tutor.name}
            style={{
              width: `${edited.tutor.name.length + 1}ch`,
              minWidth: "10ch",
              maxWidth: "15ch",
            }}
            onChange={(e) =>
              setEdited({
                ...edited,
                tutor: { ...edited.tutor, name: e.target.value },
              })
            }
            required
          />
        ) : (
          <select
            className="roundBorder"
            onChange={(e) =>
              setEdited({
                ...edited,
                tutor: { ...edited.tutor, name: e.target.value },
              })
            }
          >
            <option value="Select">Select</option>
            {tutors.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        )}
      </td>
      <td className="px-0">
        <input
          className="text-center roundBorder"
          type="text"
          defaultValue={edited.location}
          style={{
            width: `${edited.location.length + 1}ch`,
            minWidth: "20ch",
            maxWidth: "30ch",
          }}
          onChange={(e) => setEdited({ ...edited, location: e.target.value })}
          required
        />
      </td>
      {admin && (
        <td className="px-0 d-flex justify-content-evenly">
          <CheckIcon
            onClick={() => handleSave(edited)}
            aria-label="Save"
            style={{ color: "green" }}
          />
          <CancelIcon
            onClick={handleCancel}
            aria-label="Cancel"
            style={{ color: "red" }}
          />
        </td>
      )}
    </tr>
  );
};

export default EditableRow;
