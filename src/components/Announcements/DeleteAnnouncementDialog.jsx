import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { ViewContext, ActionsContext } from "../Context/AnnouncementContext";

const DeleteAnnouncementDialog = () => {
  const { reset, announcements, announcementId } = useContext(ViewContext);
  const { setAnnouncements } = useContext(ActionsContext);

  const deleteAnnouncement = () => {
    setAnnouncements(
      announcements.filter((item) => item.id !== announcementId)
    );
    reset();
  };

  return (
    <>
      <Modal.Title as="h4" className="w-100 pt-0 pb-5 text-center">
        Are you sure you want to delete?
      </Modal.Title>
      <Modal.Footer className="d-flex p-0 mb-5 col-md-6 mx-auto justify-content-center border-0">
        <Button
          data-action="delete"
          className="flex-fill roundBorder dangerBtn"
          onClick={deleteAnnouncement}
        >
          DELETE
        </Button>
        <Button className="flex-fill roundBorder primaryBtn" onClick={reset}>
          CANCEL
        </Button>
      </Modal.Footer>
    </>
  );
};

export default DeleteAnnouncementDialog;
