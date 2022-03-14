import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ViewContext, ActionsContext } from "../Context/courseContext";
import { deleteCourse } from "../../apis/cs-tutoring/courses";
import { showErrors } from "../common/errorHelper";
import SpinnerBtn from "../common/spinnerBtn";

const DeleteCourseDialog = (id) => {
  const { reset, courses } = useContext(ViewContext);
  const { setCourses, setTitle, setShow, setModalBody } = useContext(ActionsContext);
  const [deleting, setDeleting] = useState(false);

  const removeCourse = async () => {
    setDeleting(true);
    const response = await deleteCourse(id);

    if (response.status === 200) {
      setCourses([...courses.filter((item) => item.id !== id)]);
      setTitle("Success")
      setModalBody(() => () => <p className="text-center pb-3">Course deleted!</p>)
      setShow(true);
    } else {
      reset();
      showErrors(response, setTitle, setShow, setModalBody);
    }
  };

  return (
    <Row className="col-10 col-lg-8 mx-auto m-0 mb-5">
      <Col xs="6" className="mb-3 mb-sm-auto pe-sm-4">
        {!deleting ? (
          <Button
            className="col-12 roundBorder dangerBtn"
            onClick={removeCourse}
          >
            DELETE
          </Button>
        ) : (
          <SpinnerBtn
            className="col-12 roundBorder"
            text="Deleting"
            role="delete"
            accessibilityText="Deleting"
          />
        )}
      </Col>
      <Col xs="6" className="mb-3 mb-sm-auto ps-sm-4">
        <Button
          className="col-12 roundBorder primaryBtn"
          onClick={reset}
          disabled={deleting}
        >
          CANCEL
        </Button>
      </Col>
    </Row>
  );
};

export default DeleteCourseDialog;
