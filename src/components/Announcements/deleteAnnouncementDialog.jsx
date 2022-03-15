import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { ViewContext, ActionsContext } from "../Context/announcementContext";
import { deleteAnnouncement } from "../../apis/cs-tutoring/announcements";
import { showErrors } from "../common/errorHelper";

const DeleteAnnouncementDialog = ({ id }) => {
  const { reset, announcements } = useContext(ViewContext);
  const { setAnnouncements, setShow, setTitle, setModalBody } =
    useContext(ActionsContext);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    const response = await deleteAnnouncement(id);

    if (response.status === 200) {
      setAnnouncements([...announcements.filter((item) => item.id !== id)]);
      setTitle("Success");
      setModalBody(() => () => (
        <p className="text-center pb-3">Announcement deleted!</p>
      ));
      setShow(true);
      setTimeout(() => {
        reset();
      }, 1500);
    } else {
      reset();
      showErrors(response, setTitle, setShow, setModalBody);
    }
  };

  return (
    <Row className="col-10 col-lg-8 mx-auto m-0 mb-5">
      <Col xs="6" className="mb-3 mb-sm-auto pe-sm-4">
        <Button
          className="col-12 roundBorder dangerBtn"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting && (
            <>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="visually-hidden">Deleting...</span>
            </>
          )}
          DELETE
        </Button>
      </Col>
      <Col xs="6" className="mb-3 mb-sm-auto ps-sm-4">
        <Button
          className="col-12 roundBorder primaryBtn"
          onClick={reset}
          disabled={deleting}
        >
          CANCEL
        </Button>
      </Col>
    </Row>
  );
};

export default DeleteAnnouncementDialog;
