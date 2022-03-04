import React from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const StatusLabelWithBtn = (props) => {
  const { changing, currentSemester, ...rest } = props;
  return (
    <>
      <span className="ms-4 me-2 fw-bolder align-text-bottom">Status:</span>
      {!changing ? (
        <Button
          size="sm"
          className="py-0 align-text-bottom"
          variant={currentSemester?.active ? "success" : "warning"}
          {...rest}
        >
          {currentSemester?.active ? (
            <span className="px-2">Active</span>
          ) : (
            "Inactive"
          )}
        </Button>
      ) : (
        <Button
          variant="secondary"
          size="sm"
          className="py-0 align-text-bottom"
          disabled
        >
          <span className="px-3">
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="visually-hidden">Changing semester status...</span>
          </span>
        </Button>
      )}
    </>
  );
};

export default StatusLabelWithBtn;
