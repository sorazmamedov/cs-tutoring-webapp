import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SemesterDialog = () => {
  const [validated, setValidated] = useState(false);
  const [newSemester, setNewSemester] = useState({
    semesterName: "",
    academicYear: "",
    startDate: "",
    endDate: "",
    active: false,
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
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
            required
          />
        </Col>
      </Row>
      <Row className="mb-5" sm="2">
        <Col sm="6" className="mb-3 mb-sm-auto pe-sm-4">
          <Form.Label className="text-muted mb-0">Start Date</Form.Label>
          <Form.Control
            type="date"
            className="roundBorder"
            required
          />
        </Col>
        <Col sm="6" className="mb-3 mb-sm-auto ps-sm-4">
          <Form.Label className="text-muted mb-0">End Date</Form.Label>
          <Form.Control
            type="date"
            className="roundBorder"
            required
          />
        </Col>
      </Row>
      <Row className="mb-5" sm="2">
        <Col sm="6" className="order-2 order-sm-1 mb-3 mb-sm-auto pe-sm-4">
          <Button className="col-12 roundBorder dangerBtn">CANCEL</Button>
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
