import React, { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { addMinutes, format } from "date-fns";
import { ViewContext, ActionsContext } from "../../Context/semesterContext";
import { semesterValidator } from "../../utils/validator";
import { isEqual } from "../../utils/isEqual";
import Id from "../../utils/Id";
import SpinnerBtn from "../common/spinnerBtn";
import { getErrors } from "../common/errorHelper";
import useAxios from "../../hooks/useAxios";

const SemesterDialog = ({ edit, reset }) => {
  const { data, error, loading, axiosFetch } = useAxios();
  const { semesters, currentSemester } = useContext(ViewContext);
  const { setSemesters } = useContext(ActionsContext);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState("");

  let newItem = {};

  const handleError = (error) => {
    setErrors(getErrors(error));
    setValidated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
    setErrors("");
    const form = e.currentTarget;

    newItem = getServerFotmatted(edit, currentSemester, form);
    if (isEqual(currentSemester, newItem)) {
      reset();
      return;
    }

    let error = semesterValidator(newItem);
    if (error) {
      handleError(error);
      return;
    }

    if (edit) {
      axiosFetch({
        method: "PUT",
        url: `/semesters/${currentSemester.id}`,
        requestConfig: { data: newItem },
      });
    } else {
      axiosFetch({
        method: "POST",
        url: "/semesters",
        requestConfig: { data: newItem },
      });
    }
  };

  useEffect(() => {
    if (Object.keys(data).length) {
      if (edit) {
        let index = semesters.findIndex(
          (item) => item.id === currentSemester.id
        );
        setSemesters([
          ...semesters.slice(0, index),
          { ...data },
          ...semesters.slice(++index),
        ]);
      } else {
        setSemesters([...semesters, { ...data }]);
      }
      setValidated(true);
      reset();
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (error) {
      handleError(error);
    }
    // eslint-disable-next-line
  }, [error]);

  return (
    <>
      {!loading &&
        !errors.semesterName &&
        !errors.startDate &&
        !errors.endDate &&
        errors &&
        Object.entries(errors).map(([key, value]) => (
          <p
            key={key}
            className="col-10 col-lg-8 mx-auto text-center text-danger"
          >
            {value}
          </p>
        ))}
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
              defaultValue={
                edit &&
                format(new Date(currentSemester.startDate), "yyyy-MM-dd")
              }
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
              defaultValue={
                edit && format(new Date(currentSemester.endDate), "yyyy-MM-dd")
              }
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
            <Button
              className="col-12 roundBorder dangerBtn"
              onClick={reset}
              disabled={loading}
            >
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
  const start = new Date(form.startDate.value.trim());
  const end = new Date(form.endDate.value.trim());
  let startOffset = start.getTimezoneOffset();
  let endOffset = end.getTimezoneOffset();

  const startDate = addMinutes(start, startOffset);
  const endDate = addMinutes(end, endOffset);
  const academicYear = startDate.getFullYear();
  return {
    id: edit ? currentSemester.id : Id.makeId(),
    semesterName: form.semesterName.value.trim(),
    academicYear,
    startDate,
    endDate,
    active: edit ? currentSemester.active : false,
  };
}
