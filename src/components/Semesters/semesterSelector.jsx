import React from "react";

const SemesterSelector = ({ semesters, ...props }) => {
  return (
    <select
      className="ms-3 text-muted align-text-bottom rounded bg-white px-1"
      {...props}
    >
      {semesters.map((semester) => (
        <option key={semester.id} value={semester.id}>
          {semester.semesterName}
        </option>
      ))}
    </select>
  );
};

export default SemesterSelector;
