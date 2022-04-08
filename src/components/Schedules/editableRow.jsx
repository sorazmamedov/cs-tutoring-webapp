import React, { useState } from "react";
import { CancelIcon, CheckIcon } from "../common/iconsWithTooltip";
import SpinnerBtn from "../common/spinnerBtn";

const EditableRow = ({
  saving,
  admin,
  tutors,
  schedule,
  handleSave,
  handleCancel,
}) => {
  const [edited, setEdited] = useState({ ...schedule });
  const tutor = tutors.find((item) => item.id === edited.tutorId);
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
          value={edited.day}
          onChange={(e) => setEdited({ ...edited, day: e.target.value })}
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
      <td className="px-0">
        <select
          className="roundBorder"
          defaultValue={`${tutor?.firstName} ${tutor?.lastName}`}
          onChange={(e) =>
            e.target.selectedIndex &&
            setEdited({
              ...edited,
              tutorId:
                tutors[e.target.selectedIndex ? e.target.selectedIndex - 1 : 0]
                  .id,
            })
          }
        >
          <option value="Select">Select</option>
          {tutors.map(({ id, firstName, lastName }) => (
            <option key={id} value={`${firstName} ${lastName}`}>
              {`${firstName} ${lastName}`}
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
          onChange={(e) =>
            setEdited({
              ...edited,
              location: e.target.value.startsWith("www")
                ? `https://${e.target.value}`
                : e.target.value,
            })
          }
          required
        />
      </td>
      {admin && (
        <td className="px-0 d-flex justify-content-evenly">
          {saving !== schedule.id ? (
            <>
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
            </>
          ) : (
            <SpinnerBtn btnVariant="" variant="primary" />
          )}
        </td>
      )}
    </tr>
  );
};

export default EditableRow;
