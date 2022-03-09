import { useState } from "react";
import { CancelIcon, CheckIcon, EditIcon } from "../common/iconsWithTooltip";
import { isEqual } from "../../utils/isEqual";
import { courseValidator } from "../../utils/validator";

const CourseRowItem = ({ courses, admin }) => {
  const [editId, setEditId] = useState(null);

  const handleEdit = (e) => {
    e.stopPropagation();
    const courseId = e.target.getAttribute("courseid");
    setEditId(courseId);
  };

  const handleSave = (edited) => {
    const actual = courses.find(({ id }) => id === edited.id);
    if (actual && isEqual(actual, edited)) {
      setEditId(null);
      return;
    }

    const validated = courseValidator(edited);
    console.log(validated);
  };

  return courses.map((course) =>
    editId === course.id ? (
      <EditableRow
        key={course.id}
        course={course}
        handleSave={handleSave}
        setEditId={setEditId}
      />
    ) : (
      <ReadOnlyRow
        key={course.id}
        course={course}
        admin={admin}
        handleEdit={handleEdit}
      />
    )
  );
};

export default CourseRowItem;

const ReadOnlyRow = ({ course, admin, handleEdit }) => {
  return (
    <tr>
      <td>{course.section}</td>
      <td>{course.courseName}</td>
      <td>{course.instructorName}</td>
      <td>{course.instructorEmail}</td>
      {admin && (
        <td>
          <EditIcon courseid={course.id} onClick={handleEdit} />
        </td>
      )}
    </tr>
  );
};

const EditableRow = ({ course, handleSave, setEditId }) => {
  const [edited, setEdited] = useState({ ...course });

  return (
    <tr>
      <td className="px-0">
        <input
          className="text-center roundBorder"
          type="text"
          defaultValue={edited.section}
          style={{ width: `${edited.section.length + 1}ch` }}
          onChange={(e) => setEdited({ ...edited, section: e.target.value })}
          required
        />
      </td>
      <td className="px-0">
        <input
          className="text-center roundBorder"
          type="text"
          defaultValue={edited.courseName}
          style={{ width: `${edited.courseName.length + 1}ch` }}
          onChange={(e) => setEdited({ ...edited, courseName: e.target.value })}
          required
        />
      </td>
      <td className="px-0">
        <input
          className="text-center roundBorder"
          type="text"
          defaultValue={edited.instructorName}
          style={{ width: `${edited.instructorName.length + 1}ch` }}
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
          style={{ width: `${edited.instructorEmail.length + 1}ch` }}
          onChange={(e) =>
            setEdited({ ...edited, instructorEmail: e.target.value })
          }
          required
        />
      </td>
      <td className="px-0 d-flex justify-content-evenly">
        <CheckIcon
          type="submit"
          onClick={() => handleSave(edited)}
          aria-label="Save"
          style={{ color: "green" }}
        />
        <CancelIcon
          onClick={() => setEditId(null)}
          aria-label="Cancel"
          style={{ color: "red" }}
        />
      </td>
    </tr>
  );
};
