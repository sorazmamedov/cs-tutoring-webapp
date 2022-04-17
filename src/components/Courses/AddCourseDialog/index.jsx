import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import AddCourse from "./addCourse";
import UploadCourses from "./uploadCourses";

const AddCourseDialog = ({ semesterId }) => {
  const [selected, setSelected] = useState(0);

  return (
    <>
      <Row className="col-10 col-lg-8 mb-5 mx-auto">
        <Col sm="6" className="p-0 mb-3 mb-sm-auto pe-sm-4">
          <Button
            className="col-12 roundBorder dangerBtn"
            disabled={selected === 1}
            onClick={() => setSelected(1)}
          >
            Add Course
          </Button>
        </Col>
        <Col sm="6" className="p-0 mb-3 mb-sm-auto ps-sm-4">
          <Button
            className="col-12 roundBorder primaryBtn"
            disabled={selected === 2}
            onClick={() => setSelected(2)}
          >
            Upload File
          </Button>
        </Col>
      </Row>
      {selected === 1 && <AddCourse {...{ semesterId }} />}
      {selected === 2 && <UploadCourses {...{ semesterId }} />}
    </>
  );
};

export default AddCourseDialog;
