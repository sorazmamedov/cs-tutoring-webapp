import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CancelDialog = ({ appointment, handleCancel, reset }) => {
  return (
    <Row className="col-10 col-lg-8 mx-auto m-0 mb-5">
      <Col xs="6" className="mb-3 mb-sm-auto pe-sm-4">
        <Button
          className="col-12 roundBorder dangerBtn"
          onClick={() => {
            handleCancel(appointment);
            reset();
          }}
        >
          PROCEED
        </Button>
      </Col>
      <Col xs="6" className="mb-3 mb-sm-auto ps-sm-4">
        <Button className="col-12 roundBorder primaryBtn" onClick={reset}>
          ABORT
        </Button>
      </Col>
    </Row>
  );
};

export default CancelDialog;
