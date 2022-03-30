import React from "react";
import Modal from "react-bootstrap/Modal";

const TemplateModal = ({ title, show, ModalBody, reset, size = "lg" }) => {
  return (
    <Modal
      size={size}
      show={show}
      onHide={reset}
      backdrop="static"
      keyboard={false}
      centered
      className="text-muted"
    >
      <Modal.Header className="pt-3 pb-0 border-0" closeButton />
      <Modal.Title as="h4" className="w-100 pt-0 pb-5 text-center">
        {title}
      </Modal.Title>
      {ModalBody}
    </Modal>
  );
};

export default TemplateModal;
