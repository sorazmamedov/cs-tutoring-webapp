import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { courseValidator } from "../../../utils/validator/";
import { getErrors } from "../../common/errorHelper";
import useAxios from "../../../hooks/useAxios";

const UploadCourses = ({ semesterId, setAdded }) => {
  const { data, error, setError, axiosFetch } = useAxios();
  const [upload, setUpload] = useState(false);
  const [validated, setValidated] = useState(false);
  const fileTypes = [
    ".xlsx",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpload(true);
    if (error) {
      setError("");
    }

    const inputField = e.currentTarget.coursesFile;
    const file = inputField.files[0];

    try {
      if (file && fileTypes.includes(file.type)) {
        const { default: readXlsxFile } = await import("read-excel-file");
        const rows = await readXlsxFile(file);
        const newCourses = parseAndValidate(rows.slice(1));

        axiosFetch({
          method: "POST",
          url: `/courses/semester/${semesterId}`,
          requestConfig: {
            data: { courses: newCourses },
          },
        });

        return;
      }
      throw new Error("FileTypeMismatch");
    } catch (err) {
      setError(err);
      setValidated(false);
    }
  };

  useEffect(() => {
    if (Object.keys(data).length) {
      setUpload(false);
      setAdded(true);
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (error) {
      setValidated(false);
      setUpload(false);
    }
    // eslint-disable-next-line
  }, [error]);

  return (
    <>
      {error &&
        Object.entries(getErrors(error)).map(([key, value]) => (
          <p
            key={key}
            className="col-10 col-lg-8 mx-auto text-center text-danger"
          >
            {value}
          </p>
        ))}
      {Object.keys(data).length !== 0 && (
        <p
          className="text-success text-center mt-2"
          style={
            Object.keys(data).length
              ? { opacity: "1", transition: "opacity 0.6s linear" }
              : { opacity: 0 }
          }
        >
          Successfully uploaded!
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
              type="file"
              name="coursesFile"
              className="roundBorder"
              accept={fileTypes.join(", ")}
              required
            />
          </Col>
        </Row>
        {Object.keys(data).length === 0 && (
          <Row className="m-5">
            <Col xs="8" md="6" className="mt-2 mx-auto">
              {!upload ? (
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
            </Col>
          </Row>
        )}
      </Form>
    </>
  );
};

export default UploadCourses;

function parseAndValidate(arr) {
  const keys = ["section", "courseName", "instructorName", "instructorEmail"];
  if (arr?.length > 0) {
    const newArr = arr.map((row) => {
      let course = row.reduce((acc, cur, index) => {
        acc[keys[index]] = cur;
        return acc;
      }, {});
      return course;
    });

    newArr.forEach((course) => {
      const result = courseValidator(course);
      if (result) {
        throw new Error("Provided data failed to pass validation!");
      }
    });

    return newArr;
  } else {
    throw new Error(
      "Missing data! Please make sure that you have selected correct file!"
    );
  }
}
