import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ModalDialog from "react-bootstrap/ModalDialog";

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const CustomModal = ({ show, handleClose }) => {
  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <Button className="btn-close p-2" aria-label="Close" />
      </div>
      <ModalDialog className="w-100 my-3 pb-5">
        <p className="text-muted text-center fw-bold fs-5 mb-3">Announcement</p>
        <FloatingLabel
          controlId="floatingTextarea"
          label="Subject"
          className="m-3"
        >
          <Form.Control placeholder="Provide a subject here" />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingTextarea2"
          label="Content"
          className="m-3"
        >
          <Form.Control
            as="textarea"
            placeholder="Provide a content for the subject"
            style={{ height: "100px" }}
          />
        </FloatingLabel>
        <div className="d-flex gap-4 justify-content-center">
          <Button variant="primary" style={{ width: "100px" }}>
            PUBLISH
          </Button>
          <Button variant="danger" style={{ width: "100px" }}>
            DRAFT
          </Button>
        </div>
      </ModalDialog>
    </Modal>
  );
};

export default CustomModal;
