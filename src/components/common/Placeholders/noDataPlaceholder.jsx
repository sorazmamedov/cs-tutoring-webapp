import React from "react";

const NoDataPlaceholder = ({ message }) => {
  return (
    <div className="d-flex table-placeholder justify-content-center align-items-center border rounded-3">
      <span className="fs-5 text-muted">
        {message ? message : "No data available!"}
      </span>
    </div>
  );
};

export default NoDataPlaceholder;
