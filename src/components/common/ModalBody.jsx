import React from "react";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import DataContext from "../Context/DataContext";

const ModalBody = () => {
  const { subject, setSubject, content, setContent } = useContext(DataContext);

  return (
    <Stack gap={2} className="col-10 col-md-8 mx-auto mb-4">
      <Form.Group>
        <Form.Label className="text-muted mb-0">Subject</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          className="roundBorder"
          onChange={(e) => setContent(e.target.value)}
          defaultValue={subject}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="text-muted mb-0">Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          className="roundBorder"
          onChange={(e) => setSubject(e.target.value)}
          defaultValue={content}
        />
      </Form.Group>
    </Stack>
  );
};

export default ModalBody;
