import { EditIcon } from "../common/iconsWithTooltip";

const CourseRowItem = ({ data, admin }) => {
  const handleEdit = (e) => {
    console.log("edit clicked..", e.target);
  };

  return data.map((course) => (
    <tr id={course.id} key={course.id}>
      <td>{course.section}</td>
      <td>{course.courseName}</td>
      <td>{course.semesterId}</td>
      <td>{course.instructorName}</td>
      <td>{course.instructorEmail}</td>
      {admin && (
        <td>
          <EditIcon sourceid={course.id} onClick={handleEdit} />
        </td>
      )}
    </tr>
  ));
};

export default CourseRowItem;
