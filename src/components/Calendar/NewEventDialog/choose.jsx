import React from "react";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { format } from "date-fns";
import SlotSelector from "./slotSelector";
import RepeatDateSelector from "./repeatDateSelector";

const Choose = (props) => {
  const {
    event,
    loadedSemester,
    showDurations,
    setShowDurations,
    handleChange,
    showDatePicker,
    handleRepeatChange,
    handleCustomDateChange,
  } = props;
  return (
    <>
      <Row className="mb-2">
        <p className="text-center fw-bolder">Choose:</p>
      </Row>
      <Row className="mb-4">
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
      </Row>
      <Row className="mb-4">
        <SlotSelector
          showDurations={showDurations}
          setShowDurations={setShowDurations}
          handleChange={handleChange}
        />
      </Row>
      <Row className="mb-4">
        <RepeatDateSelector
          event={event}
          loadedSemester={loadedSemester}
          showDatePicker={showDatePicker}
          handleRepeatChange={handleRepeatChange}
          handleCustomDateChange={handleCustomDateChange}
        />
      </Row>
    </>
  );
};

export default Choose;
