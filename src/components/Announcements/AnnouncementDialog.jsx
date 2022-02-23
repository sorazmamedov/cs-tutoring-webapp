import React from "react";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { ViewContext, ActionsContext } from "../Context/DataContext";

const AnnouncementDialog = () => {
  const { subject, content } = useContext(ViewContext);
  const { setSubject, setContent } = useContext(ActionsContext);

  return (
    <>
      <Modal.Title as="h4" className="w-100 pt-0 pb-5 text-center">
        Announcement
      </Modal.Title>
      <Stack gap={2} className="col-10 col-md-8 mx-auto mb-4">
        <Form.Group>
          <Form.Label className="text-muted mb-0">Subject</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            className="roundBorder"
            onChange={(e) => setSubject(e.target.value)}
            defaultValue={subject}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="text-muted mb-0">Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            className="roundBorder"
            onChange={(e) => setContent(e.target.value)}
            defaultValue={content}
          />
        </Form.Group>
      </Stack>
      <Modal.Footer className="d-flex p-0 mb-5 col-md-6 mx-auto justify-content-center border-0">
        <Button className="flex-fill roundBorder primaryBtn">PUBLISH</Button>
        <Button className="flex-fill roundBorder dangerBtn">DRAFT</Button>
      </Modal.Footer>
    </>
  );
};

export default AnnouncementDialog;
