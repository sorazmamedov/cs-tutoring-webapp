import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { format } from "date-fns";
import { ViewContext } from "../Context/calendarContext";
// import Id from "../../utils/Id";
import { calendarValidator } from "../../utils/validator";
import { getErrors } from "../common/errorHelper";
import { postCalendar } from "../../apis/cs-tutoring/calendars";

const NewEventDialog = (range) => {
  const { reset, loadedSemester } = useContext(ViewContext);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [showDurations, setShowDurations] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setValidated(true);
    // const form = e.currentTarget;

    let newEvent = {};

    const error = calendarValidator(newEvent);
    if (error) {
      console.log("validation");
      setErrors(getErrors(error));
      setValidated(false);
      setSaving(false);
      return;
    }
    console.log("New Item:", newEvent);
    const response = await postCalendar(newEvent);

    const statusCode = 201;
    if (response.status === statusCode) {
    } else {
      setErrors(getErrors(response));
      setValidated(false);
      setSaving(false);
      return;
    }

    setSaving(false);
    reset();
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
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="col-10 col-lg-8 mx-auto"
      >
        <Row className="mb-4">
          <Col xs="12">
            <Form.Label className="mb-0 text-dark">
              {format(range.start, "PP")}
              <span className="mx-2 p-1 border border-3 rounded">
                {format(range.start, "h:mm bbb")}
              </span>
              -
              <span className="mx-2 p-1 border border-3 rounded">
                {format(range.end, "h:mm bbb")}
              </span>
            </Form.Label>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col xs="12">
            <select
              className="mb-0 roundBorder"
              onChange={() => setShowDurations(!showDurations)}
            >
              <option value="Slots with duration">Slots with duration</option>
              <option value="Single slot">Single slot</option>
            </select>
            {showDurations && (
              <>
                <select
                  className="mb-0 roundBorder ms-3 me-2 px-1"
                  name="slotDuration"
                >
                  <option value="30">30</option>
                  <option value="45">45</option>
                  <option value="60">60</option>
                </select>
                <span className="text-dark">minutes</span>
              </>
            )}
          </Col>
        </Row>
        <Row className="mb-4">
          <Col xs="6">
            <span className="me-3 text-dark">Repeat until:</span>
            <select
              className="mb-0 roundBorder"
              onChange={(e) =>
                e.target.value === "Custom"
                  ? setShowDatePicker(true)
                  : setShowDatePicker(false)
              }
            >
              <option value="Does not repeat">Does not repeat</option>
              <option value="End of semester">End of semester</option>
              <option value="Custom">Custom</option>
            </select>
          </Col>

          {showDatePicker && (
            <Col xs="6">
              <Form.Control
                type="date"
                className="d-inlin roundBorder p-0"
                min={"2022-03-17"}
                name="customDate"
                defaultValue={"2022-03-17"}
                isInvalid={errors.customDate}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.customDate}
              </Form.Control.Feedback>
            </Col>
          )}
        </Row>
        <Row className="mb-5" sm="2">
          <Col sm="6" className="order-2 order-sm-1 mb-3 mb-sm-auto pe-sm-4">
            <Button
              className="col-12 roundBorder dangerBtn"
              onClick={() => reset()}
              disabled={saving}
            >
              {saving && (
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Saving...</span>
                </>
              )}
              CANCEL
            </Button>
          </Col>
          <Col sm="6" className="order-1 order-sm-2 mb-3 mb-sm-auto ps-sm-4">
            <Button
              className="col-12 roundBorder primaryBtn"
              type="submit"
              disabled={saving}
            >
              {saving && (
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Saving...</span>
                </>
              )}
              CREATE
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default NewEventDialog;
