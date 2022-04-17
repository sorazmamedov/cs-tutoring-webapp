import { useState } from "react";
import { CancelIcon, CheckIcon } from "../common/iconsWithTooltip";

const TemplateRow = ({ admin, schedule, tutors, handleSave, handleCancel }) => {
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
        <select
          className="roundBorder"
        >
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
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
      <td>
        <select
          className="roundBorder"
        >
          {tutors.map((tutor) => (
            <option key={tutor} value={tutor}>
              {tutor}
            </option>
          ))}
        </select>
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

export default TemplateRow;
