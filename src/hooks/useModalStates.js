import { useState } from "react";

const useModal = () => {
  const [show, setShow] = useState(false);
  const [ModalBody, setModalBody] = useState();
  const [title, setTitle] = useState("");
  const reset = () => {
    setShow(false);
    setTitle("");
    setModalBody();
  };

  return { show, title, ModalBody, reset, setShow, setTitle, setModalBody };
};

export default useModal;
