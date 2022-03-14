import { EditIcon } from "../common/iconsWithTooltip";

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

export default ReadOnlyRow;
