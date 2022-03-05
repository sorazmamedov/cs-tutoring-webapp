import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { ActionsContext, ViewContext } from "../Context/courseContext";

const CourseDialog = () => {
  const { show, reset } = useContext(ViewContext);
  const { setCourses } = useContext(ActionsContext);
  const [uploading, setUploading] = useState(false);
  const handleSubmit = () => {
    console.log("[Submit courses...]");
  };

  return (
    <Form onSubmit={handleSubmit} className="col-10 col-lg-8 mx-auto">
      <Row className="mb-5">
        <Col xs="12" className="px-0">
          <Form.Control type="file" className="roundBorder" required />
        </Col>
      </Row>
      <Row className="m-5">
        <Col xs="8" md="6" className="mx-auto">
          {!uploading ? (
            <Button type="submit" className="col-12 roundBorder primaryBtn">
              UPLOAD
            </Button>
          ) : (
            <Button className="col-12 roundBorder" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="upload"
                aria-hidden="true"
              />
              <span className="visually-hidden">Uploading...</span>
              Uploading...
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  );
};

export default CourseDialog;
