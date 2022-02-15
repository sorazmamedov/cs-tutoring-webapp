import { EditIcon } from "../common/IconsWithTooltip";

const CourseRowItem = ({ data, admin }) => {
  const handleEdit = (e) => {
    console.log("edit clicked..", e.target);
  };

  return data.map((course) => (
    <tr id={course.id} key={course.id}>
      <td>{course.courseCode}</td>
      <td>{course.courseName}</td>
      <td>{course.semesterId}</td>
      <td>{course.instructorName}</td>
      <td>{course.instructorEmail}</td>
      {admin && (
        <td>
          <EditIcon sourceId={course.id} onEdit={handleEdit}/>
        </td>
      )}
    </tr>
  ));
};

export default CourseRowItem;
