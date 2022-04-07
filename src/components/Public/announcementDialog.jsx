import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AnnouncementDialog = ({ announcement }) => {
  return (
    <>
      <Form className="col-10 col-lg-8 mx-auto mb-5">
        <Row className="mb-2">
          <Col xs="12">
            <Form.Label className="text-muted mb-0">Subject</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="subject"
              className="roundBorder"
              defaultValue={announcement?.subject}
              readOnly
            />
          </Col>
        </Row>
        <Row className="mb-5">
          <Col xs="12">
            <Form.Label className="text-muted mb-0">Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={7}
              name="content"
              className="roundBorder"
              defaultValue={announcement?.content}
              readOnly
            />
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AnnouncementDialog;
