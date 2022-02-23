import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { ViewContext } from "../Context/DataContext";

const CustomModal = () => {
  const { onClose, show, modalBody: ModalBody } = useContext(ViewContext);

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onClose}
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

export default CustomModal;
