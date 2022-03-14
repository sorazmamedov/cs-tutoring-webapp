import { useContext, useState } from "react";
import { isEqual } from "../../utils/isEqual";
import { courseValidator } from "../../utils/validator";
import { ActionsContext, ViewContext } from "../Context/courseContext";
import EditableRow from "./editableRow";
import ReadOnlyRow from "./readOnlyRow";

const CourseRows = ({ courses, admin }) => {
  const {} = useContext(ViewContext);
  const { setShow, setTitle, setModalBody } = useContext(ActionsContext);
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

    const result = courseValidator(edited);

    if (result) {
      const errorData = {};
      for (let item of result.inner) {
        const name = item.path;
        const message = item.message;
        errorData[name] = message;
      }

      setTitle("Validation Error");
      setModalBody(() => () => getErrorModalBody(errorData));
      setShow(true);
      return;
    }

    console.log("Bitti");
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

export default CourseRows;

function getErrorModalBody(errorData) {
  return (
    <div className="col-10 col-lg-8 mx-auto mb-5 text-center">
      {Object.entries(errorData).map(([key, value]) => {
        return <p key={key}>{value}</p>;
      })}
    </div>
  );
}
