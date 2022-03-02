import React from "react";
import Button from "react-bootstrap/Button";

const LoadBtn = ({ loadedSemester, currentSemester, ...props }) => {
  return (
    <Button
      disabled={loadedSemester?.id === currentSemester?.id}
      size="sm"
      className={`ms-4 px-3 py-0 align-text-bottom ${
        loadedSemester?.id === currentSemester?.id
          ? "btn-secondary"
          : "available"
      }`}
      {...props}
    >
      LOAD
    </Button>
  );
};

export default LoadBtn;
