import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { ViewContext, ActionsContext } from "../Context/DataContext";

const DeleteAnnouncementDialog = () => {
  const { announcementId, deleteAnnouncement } = useContext(ViewContext);
  const { setShow } = useContext(ActionsContext);

  return (
    <>
      <Modal.Title as="h4" className="w-100 pt-0 pb-5 text-center">
        Are you sure you want to delete?
      </Modal.Title>
      <Modal.Footer className="d-flex p-0 mb-5 col-md-6 mx-auto justify-content-center border-0">
        <Button
          data-action="delete"
          className="flex-fill roundBorder dangerBtn"
          onClick={() => deleteAnnouncement(announcementId)}
        >
          DELETE
        </Button>
        <Button
          className="flex-fill roundBorder primaryBtn"
          onClick={() => setShow(false)}
        >
          CANCEL
        </Button>
      </Modal.Footer>
    </>
  );
};

export default DeleteAnnouncementDialog;
