import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
    <Row className="col-10 col-lg-8 mx-auto m-0 mb-5">
      <Col xs="6" className="mb-3 mb-sm-auto pe-sm-4">
        <Button
          className="col-12 roundBorder dangerBtn"
          onClick={deleteAnnouncement}
        >
          DELETE
        </Button>
      </Col>
      <Col xs="6" className="mb-3 mb-sm-auto ps-sm-4">
        <Button className="col-12 roundBorder primaryBtn" onClick={reset}>
          CANCEL
        </Button>
      </Col>
    </Row>
  );
};

export default DeleteAnnouncementDialog;
