import React from "react";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

const ModalDialog = () => {
  return (
    <Stack gap={2} className="col-md-5 mx-auto">
      <p className="text-muted fw-bold fs-4">Announcement</p>
      <FloatingLabel controlId="floatingTextarea" label="Subject" className="">
        <Form.Control placeholder="Provide a subject here" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea2" label="Content">
        <Form.Control
          as="textarea"
          placeholder="Provide a content for the subject"
          style={{ height: "100px" }}
        />
      </FloatingLabel>
      <Stack gap={2}>
        <Button variant="primary">PUBLISH</Button>
        <Button variant="danger">DRAFT</Button>
      </Stack>
    </Stack>
  );
};

export default ModalDialog;
