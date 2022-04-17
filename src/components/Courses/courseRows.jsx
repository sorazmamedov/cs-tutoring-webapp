import React, { useContext, useEffect, useState } from "react";
import { isEqual } from "../../utils/isEqual";
import { courseValidator } from "../../utils/validator";
import { ActionsContext, ViewContext } from "../../Context/courseContext";
import EditableRow from "./editableRow";
import ReadOnlyRow from "./readOnlyRow";
import { showErrors } from "../common/errorHelper";
import DeleteCourseDialog from "./deleteCourseDialog";
import useAxios from "../../hooks/useAxios";

const CourseRows = ({ reset, setShow, setTitle, setModalBody }) => {
  const { data, error, axiosFetch } = useAxios();
  const { courses, auth, ROLES } = useContext(ViewContext);
  const { setCourses } = useContext(ActionsContext);
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
    setModalBody(<DeleteCourseDialog {...{ id, reset }} />);
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

    //Validate
    const result = courseValidator(edited);
    if (result) {
      setSaving(null);
      showErrors(result, setTitle, setShow, setModalBody);
      return;
    }

    //Persist
    axiosFetch({
      method: "PUT",
      url: `/courses/${edited.id}`,
      requestConfig: { data: edited },
    });
  };

  useEffect(() => {
    if (Object.keys(data).length) {
      let index = courses.findIndex((item) => item.id === saving);
      setCourses([...courses.slice(0, index), data, ...courses.slice(++index)]);
      setEditId(null);
      setSaving(null);
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (error) {
      setSaving(null);
      showErrors(error, setTitle, setShow, setModalBody);
    }
    // eslint-disable-next-line
  }, [error]);

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
        admin={auth?.user?.roles.includes(ROLES.Admin)}
        saving={saving}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    )
  );
};

export default CourseRows;
