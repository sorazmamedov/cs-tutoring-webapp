import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";

const TemplateModal = ({ viewContext }) => {
  const {
    show,
    modalBody: ModalBody,
    reset,
  } = useContext(viewContext);

  return (
    <Modal
      size="lg"
      show={show}
      onHide={reset}
      onExiting={reset}
      backdrop="static"
      keyboard={false}
      centered
      className="text-muted"
    >
      <Modal.Header className="pt-3 pb-0 border-0" closeButton />
      {ModalBody && <ModalBody />}
    </Modal>
  );
};

export default TemplateModal;
