import { useContext, useState } from "react";
import { isEqual } from "../../utils/isEqual";
import { courseValidator } from "../../utils/validator";
import { ActionsContext, ViewContext } from "../Context/courseContext";
import EditableRow from "./editableRow";
import ReadOnlyRow from "./readOnlyRow";
import { showErrors } from "../common/errorHelper";
import { putCourse } from "../../apis/cs-tutoring/courses";
import DeleteCourseDialog from "./deleteCourseDialog";

const CourseRows = ({ admin }) => {
  const { courses } = useContext(ViewContext);
  const { setShow, setTitle, setModalBody, setCourses } =
    useContext(ActionsContext);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(null);

  const handleEdit = (e) => {
    if (saving) {
      return;
    }
    const courseId = e.target.getAttribute("courseid");
    setEditId(courseId);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    const id = e.target.getAttribute("courseid");
    setTitle("Are you sure you want to delete?");
    setModalBody(() => () => DeleteCourseDialog(id));
    setShow(true);
  };

  const handleSave = async (edited) => {
    setSaving(edited.id);

    //Dismiss if nothing has changed
    const actual = courses.find(({ id }) => id === edited.id);
    if (actual && isEqual(actual, edited)) {
      setSaving(null);
      setEditId(null);
      return;
    }

    //Validation
    const result = courseValidator(edited);
    if (result) {
      setSaving(null);
      showErrors(result, setTitle, setShow, setModalBody);
      return;
    }

    //Persistence
    const response = await putCourse(edited);
    if (response.status === 200) {
      let index = courses.findIndex((item) => item.id === edited.id);
      setCourses([
        ...courses.slice(0, index),
        edited,
        ...courses.slice(++index),
      ]);
    } else {
      showErrors(response, setTitle, setShow, setModalBody);
    }

    setEditId(null);
    setSaving(null);
  };

  return courses.map((course) =>
    editId === course.id ? (
      <EditableRow
        key={course.id}
        course={course}
        saving={saving}
        handleSave={handleSave}
        setEditId={setEditId}
        setSaving={setSaving}
      />
    ) : (
      <ReadOnlyRow
        key={course.id}
        course={course}
        admin={admin}
        saving={saving}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    )
  );
};

export default CourseRows;
