import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ViewContext, ActionsContext } from "../Context/semesterContext";
import { semesterValidator } from "../../utils/validator";
import { localToUtc, utcToLocal } from "../../utils/date";
import { isEqual } from "../../utils/isEqual";
import Id from "../../utils/Id";
import { postSemester, putSemester } from "../../apis/cs-tutoring/semesters";
import { useEffect } from "react";
import SpinnerBtn from "../common/spinnerBtn";

const SemesterDialog = () => {
  const { semesters, reset, currentSemester, edit } = useContext(ViewContext);
  const { setSemesters, setCurrentSemester } = useContext(ActionsContext);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    const newItem = getServerFotmatted(edit, currentSemester, form);
    if (isEqual(currentSemester, newItem)) {
      reset();
    }

    let error = semesterValidator(newItem);

    if (!error) {
      setLoading(true);
      setValidated(true);
      setErrors({});

      const result = edit
        ? await putSemester(newItem)
        : await postSemester(newItem);
      const statusCode = edit ? 200 : 201;

      if (result.status === statusCode) {
        if (edit) {
          let index = semesters.findIndex(
            (item) => item.id === currentSemester.id
          );
          setSemesters([
            ...semesters.slice(0, index),
            { ...newItem },
            ...semesters.slice(++index),
          ]);
        } else {
          setSemesters([...semesters, { ...newItem }]);
        }

        setCurrentSemester({ ...newItem });
        setErrors({});
        setValidated(true);
        setLoading(false);
        reset();
      } else {
        if (result.message) {
          setErrors({ response: result.message });
        } else if (result) {
          setErrors({ response: result });
        } else {
          setErrors({ response: result });
        }
        setValidated(false);
        setLoading(false);
      }
    } else if (error) {
      const errorData = {};
      for (let item of error.inner) {
        const name = item.path;
        const message = item.message;
        errorData[name] = message;
      }
      setErrors(errorData);
      setValidated(false);
    }
  };

  useEffect(() => {
    return () => {
      console.log("Aborting fetch from semesters...");
      // controller && controller.abort();
    };
  });

  return (
    <>
      {errors.response && (
        <p className="col-10 col-lg-8 mx-auto text-center text-danger">
          {errors.response === "Network Error" &&
            "Please check your internet connection!"}
          {errors.response.status === 404 && errors.response.data.error}
          {Object.keys(errors.response).length === 0 &&
            "Something went wrong! Please, try again!"}
        </p>
      )}
      {errors.id && (
        <p className="col-10 col-lg-8 mx-auto text-center text-danger">
          {errors.id}
        </p>
      )}
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="col-10 col-lg-8 mx-auto"
      >
        <Row className="mb-sm-3" sm="2">
          <Col sm="6" className="mb-3 mb-sm-auto pe-sm-4">
            <Form.Label className="text-muted mb-0">Select Semester</Form.Label>
            <Form.Select
              aria-label="Select Semester"
              className="pe-3 roundBorder"
              name="semesterName"
              defaultValue={edit && currentSemester.semesterName}
            >
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Fall">Fall</option>
              <option value="Winter">Winter</option>
            </Form.Select>
          </Col>
        </Row>
        <Row className="mb-5" sm="2">
          <Col sm="6" className="mb-3 mb-sm-auto pe-sm-4">
            <Form.Label className="text-muted mb-0">Start Date</Form.Label>
            <Form.Control
              type="date"
              className="roundBorder"
              name="startDate"
              defaultValue={edit && localToUtc(currentSemester.startDate)}
              isInvalid={errors.startDate}
              required
            />
            <Form.Control.Feedback type="invalid">
              {"Start date " + errors.startDate}
            </Form.Control.Feedback>
          </Col>
          <Col sm="6" className="mb-3 mb-sm-auto ps-sm-4">
            <Form.Label className="text-muted mb-0">End Date</Form.Label>
            <Form.Control
              type="date"
              className="roundBorder"
              name="endDate"
              defaultValue={edit && localToUtc(currentSemester.endDate)}
              isInvalid={errors.endDate}
              required
            />
            <Form.Control.Feedback type="invalid">
              {"End date " + errors.endDate}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className="mb-5" sm="2">
          <Col sm="6" className="order-2 order-sm-1 mb-3 mb-sm-auto pe-sm-4">
            <Button className="col-12 roundBorder dangerBtn" onClick={reset}>
              CANCEL
            </Button>
          </Col>
          <Col sm="6" className="order-1 order-sm-2 mb-3 mb-sm-auto ps-sm-4">
            {!loading ? (
              <Button type="submit" className="col-12 roundBorder primaryBtn">
                SAVE CHANGES
              </Button>
            ) : (
              <SpinnerBtn className="col-12 roundBorder" text="Saving" />
            )}
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default SemesterDialog;

function getServerFotmatted(edit, currentSemester, form) {
  return {
    id: edit ? currentSemester.id : Id.makeId(),
    semesterName: form.semesterName.value.trim(),
    academicYear: new Date(
      utcToLocal(form.startDate.value.trim())
    ).getFullYear(),
    startDate: +new Date(utcToLocal(form.startDate.value.trim())),
    endDate: +new Date(utcToLocal(form.endDate.value.trim())),
    active: edit ? currentSemester.active : false,
  };
}
