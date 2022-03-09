import React from "react";

const ErrorPlaceholder = () => {
  return (
    <div className="d-flex" style={{ height: "300px" }}>
      <p className="m-auto fs-5 text-muted">
        Error occured! Please try reloading the page!
      </p>
    </div>
  );
};

export default ErrorPlaceholder;
