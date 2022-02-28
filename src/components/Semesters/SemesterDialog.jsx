import React, { useState, useContext } from "react";
// import { format } from "date-fns";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ViewContext, ActionsContext } from "../Context/SemesterContext";
import { semesterValidator } from "../../utils/validator/";
import { localToUtc, utcToLocal } from "../../utils/date";
import Id from "../../utils/Id";

const SemesterDialog = () => {
  const { semesters, reset, editSemesterId } = useContext(ViewContext);
  const { setSemesters } = useContext(ActionsContext);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const [datepickerYear, setDatepickerYear] = useState(
    new Date().getFullYear()
  );
  const [editSemester, setEditSemester] = useState(
    semesters.find((item) => item.id === editSemesterId)
  );

  const handleYearFilter = (e) => {
    setDatepickerYear(e.target.value);
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    const newItem = {
      id: editSemesterId ? editSemesterId : Id.makeId(),
      semesterName: form.semesterName.value.trim(),
      academicYear: parseInt(form.academicYear.value.trim()),
      startDate: +new Date(utcToLocal(form.startDate.value.trim())),
      endDate: +new Date(utcToLocal(form.endDate.value.trim())),
      active: editSemesterId ? editSemester.active : false,
    };

    let error = semesterValidator(newItem);
    if (!error) {
      if (editSemesterId) {
        let index = semesters.findIndex((item) => item.id === editSemesterId);
        setSemesters([
          ...semesters.slice(0, index),
          newItem,
          ...semesters.slice(++index),
        ]);
      } else {
        setSemesters([...semesters, newItem]);
      }
      setValidated(true);
      reset();
    } else {
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

  return (
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
            defaultValue={editSemester?.semesterName}
          >
            <option value="Fall">Fall</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
          </Form.Select>
        </Col>
        <Col sm="6" className="mb-3 mb-sm-auto ps-sm-4">
          <Form.Label className="text-muted mb-0">Academic Year</Form.Label>
          <Form.Control
            type="number"
            min="2022"
            placeholder="yyyy"
            className="roundBorder"
            name="academicYear"
            defaultValue={editSemester?.academicYear}
            onChange={handleYearFilter}
            isInvalid={errors.academicYear}
            required
          />
          <Form.Control.Feedback type="invalid">
            {"Academic year " + errors.academicYear}
          </Form.Control.Feedback>
        </Col>
      </Row>
      <Row className="mb-5" sm="2">
        <Col sm="6" className="mb-3 mb-sm-auto pe-sm-4">
          <Form.Label className="text-muted mb-0">Start Date</Form.Label>
          <Form.Control
            type="date"
            className="roundBorder"
            name="startDate"
            min={`${datepickerYear}-01-01`}
            max={`${datepickerYear}-12-31`}
            defaultValue={editSemester && localToUtc(editSemester.startDate)}
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
            min={`${datepickerYear}-01-01`}
            max={`${datepickerYear}-12-31`}
            defaultValue={editSemester && localToUtc(editSemester.endDate)}
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
          <Button type="submit" className="col-12 roundBorder primaryBtn">
            SAVE CHANGES
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SemesterDialog;
