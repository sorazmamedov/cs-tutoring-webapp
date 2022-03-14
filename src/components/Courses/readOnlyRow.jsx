import { DeleteIcon, EditIcon } from "../common/iconsWithTooltip";
import SpinnerBtn from "../common/spinnerBtn";

const ReadOnlyRow = ({ course, admin, saving, handleEdit, handleDelete }) => {
  return (
    <tr>
      <td>{course.section}</td>
      <td>{course.courseName}</td>
      <td>{course.instructorName}</td>
      <td>{course.instructorEmail}</td>
      {admin && (
        <td className="pe-0 no-stretch">
        {saving !== course.id ? (
          <>
            <EditIcon courseid={course.id} onClick={handleEdit} />
            <DeleteIcon
              courseid={course.id}
              className="ms-3"
              onClick={handleDelete}
            />
          </>
        ) : (
          <SpinnerBtn accessibilityText="Saving" />
        )}
      </td>
      )}
    </tr>
  );
};

export default ReadOnlyRow;
