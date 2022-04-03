import { useState } from "react";

const useModal = () => {
  const [show, setShow] = useState(false);
  const [ModalBody, setModalBody] = useState();
  const [title, setTitle] = useState("");
  const [size, setSize] = useState("lg");
  const reset = () => {
    setShow(false);
    setTitle("");
    setModalBody();
  };

  return {
    show,
    title,
    ModalBody,
    size,
    reset,
    setShow,
    setTitle,
    setModalBody,
    setSize,
  };
};

export default useModal;
