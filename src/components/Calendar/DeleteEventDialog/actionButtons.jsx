import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

const ActionButtons = ({ saving, reset, success }) => {
  if (success) {
    return (
      <Col lg="4" className="mb-3 mb-sm-auto ps-sm-4">
        <Button className="col-12 roundBorder primaryBtn" onClick={reset}>
          CLOSE
        </Button>
      </Col>
    );
  }
  return (
    <>
      <Col lg="4" className="order-2 order-sm-1 mb-3 mb-sm-auto pe-sm-4">
        <Button
          className="col-12 roundBorder dangerBtn"
          type="submit"
          disabled={saving}
        >
          {saving && (
            <>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="visually-hidden">Deleting...</span>
            </>
          )}
          DELETE
        </Button>
      </Col>
      <Col lg="4" className="order-1 order-sm-2 mb-3 mb-sm-auto ps-sm-4">
        <Button
          className="col-12 roundBorder primaryBtn"
          onClick={reset}
          disabled={saving}
        >
          CANCEL
        </Button>
      </Col>
    </>
  );
};

export default ActionButtons;
