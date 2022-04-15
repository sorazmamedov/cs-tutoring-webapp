import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { format, addWeeks } from "date-fns";

const RepeatDateSelector = ({
  event,
  loadedSemester,
  showDatePicker,
  handleRepeatChange,
  handleCustomDateChange,
}) => {
  return (
    <>
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
            max={format(new Date(loadedSemester.endDate), "yyyy-MM-dd")}
            defaultValue={format(addWeeks(event.start, 1), "yyyy-MM-dd")}
            name="customDate"
            onChange={handleCustomDateChange}
            required
          />
        </Col>
      )}
    </>
  );
};

export default RepeatDateSelector;
