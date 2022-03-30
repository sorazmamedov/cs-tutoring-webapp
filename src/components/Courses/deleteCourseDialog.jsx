import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ViewContext, ActionsContext } from "../../Context/courseContext";
import { deleteCourse } from "../../apis/cs-tutoring/courses";
import { getErrors } from "../common/errorHelper";
import SpinnerBtn from "../common/spinnerBtn";

const DeleteCourseDialog = ({ id, reset }) => {
  const { courses } = useContext(ViewContext);
  const { setCourses } = useContext(ActionsContext);
  const [deleting, setDeleting] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const removeCourse = async () => {
    setDeleting(true);
    setErrors({});
    const response = await deleteCourse(id);

    if (response.status === 200) {
      setCourses([...courses.filter((item) => item.id !== id)]);
      setSuccess(true);
      setTimeout(() => {
        reset();
      }, 1500);
    } else {
      setErrors(getErrors(response));
    }
    setDeleting(false);
  };

  return (
    <>
      {errors &&
        !errors.subject &&
        !errors.content &&
        Object.entries(errors).map(([key, value]) => (
          <p
            key={key}
            className="col-10 col-lg-8 mx-auto text-center text-danger"
          >
            {value}
          </p>
        ))}
      {success && (
        <p
          className="text-success text-center mt-2 mb-5"
          style={
            success
              ? { opacity: "1", transition: "opacity 0.6s linear" }
              : { opacity: 0 }
          }
        >
          Course deleted!
        </p>
      )}
      {!success && (
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
      )}
    </>
  );
};

export default DeleteCourseDialog;
