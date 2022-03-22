import React, { useContext, useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { format, differenceInMinutes, addWeeks, addMinutes } from "date-fns";
import { ViewContext } from "../../Context/calendarContext";
import Id from "../../../utils/Id";
import { calendarValidator } from "../../../utils/validator";
import { getErrors } from "../../common/errorHelper";
import { postCalendar } from "../../../apis/cs-tutoring/calendars";
import Preview from "./preview";
import ActionButtons from "./actionButtons";
import Choose from "./choose";

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
    setValidated(true);
    const form = e.currentTarget;

    let newEvent = {
      id: Id.makeId(),
      tutorId: "123456789123",
      semesterId: loadedSemester.id,
      start: event.start,
      end: event.end,
      slots,
      repeat,
      range,
    };

    const error = calendarValidator(newEvent, {
      context: {
        min: newEvent.start,
        max: newEvent.end,
        rangeMax: new Date(loadedSemester.endDate),
      },
    });
    if (error) {
      setErrors(getErrors(error));
      setValidated(false);
      setSaving(false);
      return;
    }
    // console.log("New Item:", newEvent);
    // const response = await postCalendar(newEvent);

    // console.log(response);
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
      end = new Date(loadedSemester.endDate);
    }
    setRange({ start, end });
    setRepeat(true);
  };

  useEffect(() => {
    handleChange();
  }, [event]);
  return (
    <>
      {errors &&
        Object.entries(errors).map(([key, value]) => (
          <p
            key={key}
            className="col-10 col-lg-8 mx-auto text-center text-danger"
          >
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
          <Col xs="6" className="order-1 border-end border-primary">
            <Choose
              event={event}
              loadedSemester={loadedSemester}
              showDurations={showDurations}
              setShowDurations={setShowDurations}
              handleChange={handleChange}
              showDatePicker={showDatePicker}
              handleRepeatChange={handleRepeatChange}
              handleCustomDateChange={handleCustomDateChange}
            />
          </Col>
          <Col xs="6" className="order-2 border-start border-primary">
            <Preview preview={preview} repeat={repeat} range={range} />
          </Col>
        </Row>
        <Row className="mb-5 justify-content-around" sm="2">
          <ActionButtons saving={saving} reset={reset} preview={preview} />
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
