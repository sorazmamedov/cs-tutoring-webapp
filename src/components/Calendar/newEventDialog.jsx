import React, { useContext, useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { format, differenceInMinutes, addWeeks } from "date-fns";
import { ViewContext } from "../Context/calendarContext";
import Id from "../../utils/Id";
import { calendarValidator } from "../../utils/validator";
import { getErrors } from "../common/errorHelper";
import { postCalendar } from "../../apis/cs-tutoring/calendars";
import { addMinutes } from "date-fns/esm";

const NewEventDialog = (event) => {
  const { reset, loadedSemester } = useContext(ViewContext);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [showDurations, setShowDurations] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [preview, setPreview] = useState([]);
  const [slots, setSlots] = useState([]);
  const [repeat, setRepeat] = useState(false);
  const [range, setRange] = useState({});
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setSaving(true);
    // setValidated(true);
    const form = e.currentTarget;
    console.log(slots);

    let newEvent = {
      id: Id.makeId(),
      tutorId: "123456789123",
      semesterId: loadedSemester.id,
      start: event.start,
      end: event.end,
      slots: {
        single: true,
      },
      repeat: true,
      repeatInterval: {
        from: loadedSemester.startDate,
        to: loadedSemester.endDate,
      },
    };

    // const error = calendarValidator(newEvent);
    // if (error) {
    //   console.log("validation");
    //   setErrors(getErrors(error));
    //   setValidated(false);
    //   setSaving(false);
    //   return;
    // }
    // console.log("New Item:", newEvent);
    // const response = await postCalendar(newEvent);

    // const statusCode = 201;
    // if (response.status === statusCode) {
    // } else {
    //   setErrors(getErrors(response));
    //   setValidated(false);
    //   setSaving(false);
    //   return;
    // }

    // setSaving(false);
    // reset();
  };

  const handleChange = () => {
    calculate(formRef, setErrors, event, setValidated, setSlots, setPreview);
  };

  const handleRepeatChange = () => {
    setRange({});
    setRepeat(false);
    const form = formRef.current;
    if (form.repeatSelector.value === "2") {
      setShowDatePicker(true);
      handleCustomDateChange();
      return;
    } else if (form.repeatSelector.value === "1") {
      setShowDatePicker(false);
      handleCustomDateChange();
      return;
    }

    setShowDatePicker(false);
  };

  const handleCustomDateChange = () => {
    const form = formRef.current;
    const start = event.start;
    let end;

    if (form.repeatSelector.value === "2") {
      if (form?.customDate) {
        let offset = new Date(form.customDate.value.trim()).getTimezoneOffset();
        end = addMinutes(new Date(form.customDate.value.trim()), offset);
      } else {
        end = addWeeks(event.start, 1);
      }
    } else {
      console.log("should not be here");
      end = new Date(loadedSemester.endDate);
    }
    console.log(start, end);
    setRange({ start, end });
    setRepeat(true);
  };

  useEffect(() => {
    handleChange();
  }, [event]);
  return (
    <>
      {errors &&
        !errors.subject &&
        !errors.content &&
        Object.entries(errors).map(([key, value]) => (
          <p key={key} className="col-10 mx-auto text-center text-danger">
            {value}
          </p>
        ))}
      <Form
        ref={formRef}
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="col-10 mx-auto"
      >
        <Row className="mb-5">
          <Col xs="6" className="border-end border-primary">
            <Col className="mb-4">
              <p className="text-center fw-bolder">Choose:</p>
            </Col>
            <Col>
              <Row className="mb-4">
                <Col>
                  <Form.Label className="mb-0 text-dark">
                    {format(event.start, "PP")}
                    <span className="mx-2 p-1 border border-3 rounded">
                      {format(event.start, "h:mm bbb")}
                    </span>
                    -
                    <span className="mx-2 p-1 border border-3 rounded">
                      {format(event.end, "h:mm bbb")}
                    </span>
                  </Form.Label>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <select
                    className="mb-0 roundBorder"
                    name="slotPreference"
                    onChange={() => {
                      setShowDurations(!showDurations);
                      handleChange();
                    }}
                  >
                    <option value="0">Slots with duration</option>
                    <option value="1">Single slot</option>
                  </select>
                  {showDurations && (
                    <>
                      <select
                        className="mb-0 roundBorder ms-3 me-2 px-1"
                        name="slotDuration"
                        onChange={handleChange}
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
                <Col>
                  <span className="me-3 text-dark">Repeat until:</span>
                  <select
                    className="mb-0 roundBorder"
                    name="repeatSelector"
                    onChange={handleRepeatChange}
                  >
                    <option value="0">Does not repeat</option>
                    <option value="1">End of semester</option>
                    <option value="2">Custom</option>
                  </select>
                </Col>

                {showDatePicker && (
                  <Col className="mt-3">
                    <Form.Control
                      type="date"
                      className="roundBorder px-1 py-0"
                      min={format(addWeeks(event.start, 1), "yyyy-MM-dd")}
                      max={format(
                        new Date(loadedSemester.endDate),
                        "yyyy-MM-dd"
                      )}
                      defaultValue={format(
                        addWeeks(event.start, 1),
                        "yyyy-MM-dd"
                      )}
                      name="customDate"
                      onChange={handleCustomDateChange}
                      required
                    />
                  </Col>
                )}
              </Row>
            </Col>
          </Col>
          <Col xs="6" className="border-start border-primary">
            <Col className="mb-4">
              <p className="text-center fw-bolder">Preview:</p>
            </Col>
            {preview.length > 0 && (
              <Col>
                <p className="text-dark mb-0">Slots:</p>
                {preview.map((item, index) => (
                  <p key={index} className="text-center text-dark">
                    {`${++index}) ${item}`}
                  </p>
                ))}
                {repeat && (
                  <>
                    <p className="text-dark">Repeat between:</p>
                    <p className="text-center text-dark">
                      {`${format(range.start, "M/d/yyyy")} -
                        ${format(range.end, "M/d/yyyy")}`}
                    </p>
                  </>
                )}
              </Col>
            )}
          </Col>
        </Row>
        <Row className="mb-5 justify-content-around" sm="2">
          <Col lg="4" className="order-2 order-sm-1 mb-3 mb-sm-auto pe-sm-4">
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
          <Col lg="4" className="order-1 order-sm-2 mb-3 mb-sm-auto ps-sm-4">
            <Button
              className="col-12 roundBorder primaryBtn"
              type="submit"
              disabled={saving || preview.length === 0}
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
              SUBMIT
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default NewEventDialog;

const calculate = (
  formRef,
  setErrors,
  event,
  setValidated,
  setSlots,
  setPreview
) => {
  setErrors({});
  const form = formRef.current;
  const tempPreview = [];
  const tempSlots = [];
  if (form.slotPreference.value === "0") {
    const duration = parseInt(form?.slotDuration?.value || "30");
    const difference = differenceInMinutes(event.end, event.start);

    if (difference < duration) {
      setPreview([]);
      setErrors({
        insufficientRange: `Not possible to create a ${duration} minute slot between
        ${format(event.start, "h:mm bbb")}
        -
        ${format(event.end, "h:mm bbb")}`,
      });
      setValidated(false);
      return;
    }
    const slotCount = duration / 15;
    for (
      let i = 0;
      i + slotCount < event.slots.length && i < event.slots.length;
      i += slotCount
    ) {
      tempPreview.push(
        `${format(event.slots[i], "h:mm bbb")} - ${format(
          event.slots[i + slotCount],
          "h:mm bbb"
        )}`
      );
      tempSlots.push({
        start: event.slots[i],
        end: event.slots[i + slotCount],
      });

      console.log(
        format(event.slots[i], "h:mm bbb") +
          " - " +
          format(event.slots[i + slotCount], "h:mm bbb")
      );
    }
  } else {
    tempPreview.push(
      `${format(event.start, "h:mm bbb")} - ${format(event.end, "h:mm bbb")}`
    );
    tempSlots.push({
      start: event.start,
      end: event.end,
    });
  }

  setPreview([...tempPreview]);
  setSlots([...tempSlots]);
};
