import React, { useContext, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { ActionsContext, ViewContext } from "../Context/courseContext";
import { courseValidator } from "../../utils/validator";
import Id from "../../utils/Id";
import { postCourse } from "../../apis/cs-tutoring/courses";

const CourseDialog = () => {
  const { reset, courses, loadedSemester } = useContext(ViewContext);
  const { setCourses } = useContext(ActionsContext);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);
  const fileTypes = [
    ".xlsx",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleSubmit = async (e) => {
    setErrors(false);
    setUploading(true);
    e.preventDefault();
    e.stopPropagation();
    const file = inputRef.current.files[0];

    try {
      if (file && fileTypes.includes(file.type)) {
        const { default: readXlsxFile } = await import("read-excel-file");
        const semesterId = loadedSemester?.id;
        const rows = await readXlsxFile(file);
        const newCourses = transformAndValidate(semesterId, rows.slice(1));
        const result = await postCourse(semesterId, newCourses);

        if (result.status === 201) {
          setSuccess(true);
          setCourses([...courses, ...newCourses]);
          setTimeout(() => reset(), 1500);
        } else {
          if (result.message) {
            setErrors({ response: result.message });
          } else if (result) {
            setErrors({ response: result });
          } else {
            setErrors({ response: result });
          }
          setValidated(false);
          setUploading(false);
        }
      } else {
        throw new Error("FileTypeMismatch");
      }
    } catch (err) {
      if (err.name === "ChunkLoadError") {
        setErrors({ response: "Network Error" });
      } else if (err.name === "ValidationError") {
        setErrors({ validationError: err.error });
      } else if (err.message === "FileTypeMismatch") {
        setErrors({ coursesFile: ".xlsx format excel file is required!" });
      } else {
        setErrors({ validationError: err.error });
      }
      setValidated(false);
    }
    setUploading(false);
  };

  return (
    <>
      {errors && (
        <p className="col-10 col-lg-8 mx-auto text-center text-danger">
          {errors.response === "Network Error" &&
            "Please check your internet connection!"}
          {errors?.response?.status === 404 && errors.response?.data?.error}
          {errors.validationError}
        </p>
      )}
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="col-10 col-lg-8 mx-auto"
      >
        <Row className="mb-5">
          <Col xs="12" className="px-0">
            <Form.Control
              ref={inputRef}
              type="file"
              name="coursesFile"
              className="roundBorder"
              accept={fileTypes.join(", ")}
              isInvalid={errors.coursesFile}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.coursesFile}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className="m-5">
          <Col xs="8" md="6" className="mt-2 mx-auto">
            {!uploading ? (
              <Button type="submit" className="col-12 roundBorder primaryBtn">
                UPLOAD
              </Button>
            ) : (
              <Button className="col-12 roundBorder" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="upload"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Uploading...</span>
                Uploading...
              </Button>
            )}
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
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CourseDialog;

function transformAndValidate(semesterId, arr) {
  const keys = ["section", "courseName", "instructorName", "instructorEmail"];
  if (semesterId && arr?.length > 0) {
    const newArr = arr.map((row) => {
      let course = row.reduce(
        (acc, cur, index) => {
          acc[keys[index]] = cur;
          return acc;
        },
        { id: Id.makeId(), semesterId }
      );
      return course;
    });

    newArr.forEach((course) => {
      const result = courseValidator(course);
      if (result) {
        throw { error: "Provided data failed to pass validation!" };
      }
    });

    return newArr;
  } else {
    throw {
      error:
        "Missing data! Please make sure that you have selected correct file!",
    };
  }
}
