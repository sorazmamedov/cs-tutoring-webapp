import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import useAxios from "../../../hooks/useAxios";
import SpinnerBtn from "../../common/spinnerBtn";
import { courseValidator } from "../../../utils/validator";
import { getErrors } from "../../common/errorHelper";

const AddCourse = ({ semesterId, setAdded }) => {
  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState(false);
  const { data, error, loading, setError, axiosFetch } = useAxios();
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (error) {
      setError("");
    }
    const form = formRef.current;

    let course = {
      section: form.section.value.trim(),
      courseName: form.course.value.trim(),
      instructorName: form.name.value.trim(),
      instructorEmail: form.email.value.trim(),
    };

    const err = courseValidator(course);
    if (err) {
      setError(getErrors(err));
      setValidated(false);
      return;
    }

    axiosFetch({
      method: "POST",
      url: `/courses/semester/${semesterId}`,
      requestConfig: { data: { course } },
    });
  };

  const reset = (e) => {
    e.stopPropagation();
    setSuccess(false);
    const form = formRef.current;
    form.section.value = "";
    form.course.value = "";
    form.name.value = "";
    form.email.value = "";
  };

  useEffect(() => {
    if (Object.keys(data).length) {
      setSuccess(true);
      setAdded(true);
    }
    // eslint-disable-next-line
  }, [data]);

  return (
    <>
      {error &&
        !error.section &&
        !error.courseName &&
        !error.instructorName &&
        !error.instructorEmail &&
        Object.entries(getErrors(error)).map(([key, value]) => (
          <p
            key={key}
            className="col-10 col-lg-8 mx-auto text-center text-danger"
          >
            {value}
          </p>
        ))}
      {success && (
        <p
          className="text-success text-center mt-2"
          style={
            success
              ? { opacity: "1", transition: "opacity 0.6s linear" }
              : { opacity: 0 }
          }
        >
          Successfully uploaded!
        </p>
      )}
      <Form
        noValidate
        ref={formRef}
        onSubmit={handleSubmit}
        validated={validated}
        className="col-10 col-lg-8 mx-auto"
      >
        <Row className="mb-sm-3">
          <Col sm="6" className="mb-3 mb-sm-auto pe-sm-4">
            <Form.Label className="mb-0">Section</Form.Label>
            <Form.Control
              type="text"
              className="roundBorder"
              name="section"
              isInvalid={error.section}
              required
            />
            <Form.Control.Feedback type="invalid">
              {error.section}
            </Form.Control.Feedback>
          </Col>
          <Col sm="6" className="mb-3 mb-sm-auto ps-sm-4">
            <Form.Label className="mb-0">Course</Form.Label>
            <Form.Control
              type="text"
              className="roundBorder"
              name="course"
              isInvalid={error.courseName}
              required
            />
            <Form.Control.Feedback type="invalid">
              {error.courseName}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className="mb-5" sm="2">
          <Col sm="6" className="mb-3 mb-sm-auto pe-sm-4">
            <Form.Label className="mb-0">Instructor</Form.Label>
            <Form.Control
              type="text"
              className="roundBorder"
              name="name"
              isInvalid={error.instructorName}
              required
            />
            <Form.Control.Feedback type="invalid">
              {error.instructorName}
            </Form.Control.Feedback>
          </Col>
          <Col sm="6" className="mb-3 mb-sm-auto ps-sm-4">
            <Form.Label className="mb-0">Email</Form.Label>
            <Form.Control
              type="text"
              className="roundBorder"
              name="email"
              isInvalid={error.instructorEmail}
              required
            />
            <Form.Control.Feedback type="invalid">
              {error.instructorEmail}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col sm="6" className="mx-auto mb-3 mb-sm-auto pe-sm-4">
            <Button
              className="col-12 roundBorder dangerBtn"
              onClick={reset}
              disabled={loading}
            >
              RESET
            </Button>
          </Col>
          <Col sm="6" className="mx-auto mb-3 mb-sm-auto ps-sm-4">
            {!loading ? (
              <Button type="submit" className="col-12 roundBorder primaryBtn">
                SUBMIT
              </Button>
            ) : (
              <SpinnerBtn className="col-12 roundBorder" text="Submitting" />
            )}
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AddCourse;
