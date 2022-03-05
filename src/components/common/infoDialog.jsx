import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ViewContext } from "../Context/semesterContext";

const InfoDialog = () => {
  const { message, reset } = useContext(ViewContext);
  return (
    <>
      <Row className="col-10 col-lg-8 mx-auto m-0 mb-5">
        <p className="text-center text-dark">{message}</p></Row>
      <Row className="col-10 col-lg-8 mx-auto m-0 mb-5">
        <Col xs="6" className="mb-3 mb-sm-auto ps-sm-4 mx-auto">
          <Button className="col-12 roundBorder primaryBtn" onClick={reset}>
            CLOSE
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default InfoDialog;
