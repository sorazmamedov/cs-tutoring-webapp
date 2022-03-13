import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";

const TemplateModal = ({ viewContext }) => {
  let { title, show, modalBody: ModalBody, reset } = useContext(viewContext);

  return (
    <Modal
      size="lg"
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
      {ModalBody && <ModalBody />}
    </Modal>
  );
};

export default TemplateModal;

export const TemplateModalNoCtx = ({
  title,
  show,
  modalBody: ModalBody,
  reset,
}) => {
  return (
    <Modal
      size="lg"
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
      {ModalBody && <ModalBody />}
    </Modal>
  );
};
