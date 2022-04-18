import React from "react";

const ErrorPlaceholder = () => {
  return (
    <div className="d-flex table-placeholder justify-content-center align-items-center border rounded-3">
      <p className="fs-5 text-muted">
        Error occured! Please try reloading the page!
      </p>
    </div>
  );
};

export default ErrorPlaceholder;
