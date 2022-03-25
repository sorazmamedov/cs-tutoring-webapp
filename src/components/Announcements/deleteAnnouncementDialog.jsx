import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { ViewContext, ActionsContext } from "../Context/announcementContext";
import { deleteAnnouncement } from "../../apis/cs-tutoring/announcements";
import { getErrors } from "../common/errorHelper";

const DeleteAnnouncementDialog = ({ id, reset }) => {
  const { announcements } = useContext(ViewContext);
  const { setAnnouncements } = useContext(ActionsContext);
  const [deleting, setDeleting] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    const response = await deleteAnnouncement(id);

    if (response.status === 200) {
      setAnnouncements([...announcements.filter((item) => item.id !== id)]);
      setSuccess(true);
      setTimeout(() => {
        reset();
      }, 1500);
    } else {
      setDeleting(false);
      setErrors(getErrors(response));
    }
  };

  return (
    <>
      {errors &&
        !errors.subject &&
        !errors.content &&
        Object.entries(errors).map(([key, value]) => (
          <p
            key={key}
            className="col-10 col-lg-8 mx-auto text-center text-danger"
          >
            {value}
          </p>
        ))}
      {success && (
        <p
          className="text-success text-center mt-2"
          style={
            success
              ? { opacity: "1", transition: "opacity 0.6s linear" }
              : { opacity: 0 }
          }
        >
          Announcement deleted!
        </p>
      )}
      {!success && (
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
      )}
    </>
  );
};

export default DeleteAnnouncementDialog;
