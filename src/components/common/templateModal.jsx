import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { GlobalViewContext } from "../../Context/dataContext";

const TemplateModal = ({ title, show, ModalBody, reset, size = "lg" }) => {
  const { darkTheme } = useContext(GlobalViewContext);
  return (
    <Modal
      size={size}
      show={show}
      onHide={reset}
      backdrop="static"
      centered
      className="text-muted"
      contentClassName={darkTheme ? "shadow-dark" : ""}
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
