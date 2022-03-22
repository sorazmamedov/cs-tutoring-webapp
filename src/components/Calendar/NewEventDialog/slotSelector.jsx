import React from "react";
import Col from "react-bootstrap/Col";

const SlotSelector = ({ showDurations, setShowDurations, handleChange }) => {
  return (
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
  );
};

export default SlotSelector;
