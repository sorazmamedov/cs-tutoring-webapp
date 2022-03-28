import React, { useState } from "react";
import { CancelIcon, CheckIcon } from "../common/iconsWithTooltip";
import SpinnerBtn from "../common/spinnerBtn";

const EditableRow = ({ course, saving, handleSave, setEditId, setSaving }) => {
  const [edited, setEdited] = useState({ ...course });

  return (
    <tr>
      <td className="px-0">
        <input
          className="text-center roundBorder"
          type="text"
          defaultValue={edited.section}
          style={{
            width: `${edited.section.length + 1}ch`,
            minWidth: "10ch",
            maxWidth: "15ch",
          }}
          onChange={(e) => setEdited({ ...edited, section: e.target.value })}
          required
        />
      </td>
      <td className="px-0">
        <input
          className="text-center roundBorder"
          type="text"
          defaultValue={edited.courseName}
          style={{
            width: `${edited.courseName.length + 1}ch`,
            minWidth: "10ch",
            maxWidth: "25ch",
          }}
          onChange={(e) => setEdited({ ...edited, courseName: e.target.value })}
          required
        />
      </td>
      <td className="px-0">
        <input
          className="text-center roundBorder"
          type="text"
          defaultValue={edited.instructorName}
          style={{
            width: `${edited.instructorName.length + 1}ch`,
            minWidth: "10ch",
            maxWidth: "25ch",
          }}
          onChange={(e) =>
            setEdited({ ...edited, instructorName: e.target.value })
          }
          required
        />
      </td>
      <td className="px-0">
        <input
          className="text-center roundBorder"
          type="email"
          defaultValue={edited.instructorEmail}
          style={{
            width: `${edited.instructorEmail.length + 1}ch`,
            minWidth: "10ch",
            maxWidth: "30ch",
          }}
          onChange={(e) =>
            setEdited({ ...edited, instructorEmail: e.target.value })
          }
          required
        />
      </td>
      <td className="px-0 d-flex justify-content-evenly">
        {edited.id !== saving ? (
          <>
            <CheckIcon
              type="submit"
              onClick={() => handleSave(edited)}
              aria-label="Save"
              style={{ color: "green" }}
            />
            <CancelIcon
              onClick={() => {
                setEditId(null);
                setSaving(null);
              }}
              aria-label="Cancel"
              style={{ color: "red" }}
            />
          </>
        ) : (
          <SpinnerBtn btnVariant="" variant="primary" />
        )}
      </td>
    </tr>
  );
};

export default EditableRow;
