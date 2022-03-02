import React from "react";
import Button from "react-bootstrap/Button";

const StatusLabelWithBtn = ({ currentSemester, ...props }) => {
  return (
    <>
      <span className="ms-4 me-2 fw-bolder align-text-bottom">Status:</span>
      <Button
        size="sm"
        className="py-0 align-text-bottom"
        variant={currentSemester?.active ? "success" : "warning"}
        {...props}
      >
        {currentSemester?.active ? (
          <span className="px-2">Active</span>
        ) : (
          "Inactive"
        )}
      </Button>
    </>
  );
};

export default StatusLabelWithBtn;
