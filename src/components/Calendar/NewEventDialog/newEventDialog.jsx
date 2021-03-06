import React, { useContext, useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { format, differenceInMinutes, addWeeks, addMinutes } from "date-fns";
import { ViewContext, ActionsContext } from "../../../Context/calendarContext";
import { eventValidator } from "../../../utils/validator";
import { getErrors } from "../../common/errorHelper";
import Preview from "./preview";
import ActionButtons from "./actionButtons";
import Choose from "./choose";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const NewEventDialog = ({ event, reset }) => {
  const { auth } = useAuth();
  const { data, error, setError, loading, axiosFetch } = useAxios();
  const { loadedSemester } = useContext(ViewContext);
  const { setRefetch } = useContext(ActionsContext);
  const [showDurations, setShowDurations] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [preview, setPreview] = useState([]);
  const [slots, setSlots] = useState([]);
  const [repeat, setRepeat] = useState(false);
  const [range, setRange] = useState({});
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newEvent = {
      semesterId: loadedSemester.id,
      start: event.start,
      end: event.end,
      slots,
      repeat,
      repeatUntil: range?.end,
    };

    const error = eventValidator(
      { tutorId: auth?.user?.id, ...newEvent },
      {
        context: {
          min: newEvent.start,
          max: newEvent.end,
          rangeMin: new Date(loadedSemester.startDate),
          rangeMax: new Date(loadedSemester.endDate),
        },
      }
    );

    if (error) {
      setError(error);
      return;
    }

    axiosFetch({
      method: "POST",
      url: `/users/${auth?.user?.id}/calendars`,
      requestConfig: { data: newEvent },
    });
  };

  const handleChange = () => {
    if (error) {
      setError("");
    }
    calculate(formRef, setError, event, setSlots, setPreview);
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
        end = addWeeks(event.end, 1);
      }
    } else {
      end = new Date(loadedSemester.endDate);
    }
    setRange({ start, end });
    setRepeat(true);
  };

  useEffect(() => {
    handleChange();
    // eslint-disable-next-line
  }, [event]);

  useEffect(() => {
    if (Object.keys(data).length) {
      setRefetch(true);
      setTimeout(() => {
        reset();
      }, 2000);
    }
    // eslint-disable-next-line
  }, [data]);

  return (
    <>
      {!loading &&
        error &&
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
            Object.keys(data).length !== 0
              ? { opacity: "1", transition: "opacity 0.6s linear" }
              : { opacity: 0 }
          }
        >
          Successfully created!
        </p>
      )}
      <Form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        className="col-10 mx-auto mb-5"
      >
        <Row className="mb-5">
          <Col xs="6" className="order-1 border-end border-primary">
            <Choose
              {...{
                event,
                loadedSemester,
                showDurations,
                setShowDurations,
                handleChange,
                showDatePicker,
                handleRepeatChange,
                handleCustomDateChange,
              }}
            />
          </Col>
          <Col xs="6" className="order-2 border-start border-primary">
            <Preview {...{ preview, repeat, range }} />
          </Col>
        </Row>
        <Row className="justify-content-around" sm="2">
          <ActionButtons
            {...{
              saving: loading,
              reset,
              preview,
              success: Object.keys(data).length !== 0,
            }}
          />
        </Row>
      </Form>
    </>
  );
};

export default NewEventDialog;

const calculate = (formRef, setError, event, setSlots, setPreview) => {
  const form = formRef.current;
  const tempPreview = [];
  const tempSlots = [];
  if (form.slotPreference.value === "0") {
    const duration = parseInt(form?.slotDuration?.value || "30");
    const difference = differenceInMinutes(event.end, event.start);

    if (difference < duration) {
      setPreview([]);
      setError({
        message: `Not possible to create a ${duration} minute slot between
        ${format(event.start, "h:mm bbb")}
        -
        ${format(event.end, "h:mm bbb")}`,
      });
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
