import React from "react";

const YearSelector = ({ years, ...props }) => {
  return (
    <select
      className="ms-3 text-muted align-text-bottom rounded bg-white px-1"
      {...props}
    >
      {years.map((year) => (
        <option key={year} value={year}>{year}</option>
      ))}
    </select>
  );
};

export default YearSelector;
