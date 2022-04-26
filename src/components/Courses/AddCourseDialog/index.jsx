import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import AddCourse from "./addCourse";
import UploadCourses from "./uploadCourses";

const AddCourseDialog = ({ semesterId, pageCount, setRefetch }) => {
  const [selected, setSelected] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    return () => {
      if (added && pageCount <= 1) {
        setRefetch(true);
        setAdded(false);
      }
    };
    // eslint-disable-next-line
  });

  return (
    <>
      <Nav
        variant="tabs"
        fill
        defaultActiveKey={selected}
        className="col-10 col-lg-8 mb-5 mx-auto"
      >
        <Nav.Item>
          <Nav.Link
            eventKey={0}
            className={selected ? "" : ""}
            onClick={() => setSelected(0)}
          >
            Add Course
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey={1}
            className={selected ? "" : ""}
            onClick={() => setSelected(1)}
          >
            Upload File
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {selected ? (
        <UploadCourses {...{ semesterId, setAdded }} />
      ) : (
        <AddCourse {...{ semesterId, setAdded }} />
      )}
    </>
  );
};

export default AddCourseDialog;
