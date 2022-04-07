import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { ViewContext, ActionsContext } from "../../Context/announcementContext";
import { getErrors } from "../common/errorHelper";
import useAxios from "../../hooks/useAxios";

const DeleteAnnouncementDialog = ({ id, reset }) => {
  const { data, error, loading, axiosFetch } = useAxios();
  const { announcements } = useContext(ViewContext);
  const { setAnnouncements } = useContext(ActionsContext);

  const handleDelete = async () => {
    axiosFetch({
      method: "DELETE",
      url: `/announcements/${id}`,
    });
  };

  useEffect(() => {
    if (Object.keys(data).length) {
      setAnnouncements([...announcements.filter((item) => item.id !== id)]);
      setTimeout(() => {
        reset();
      }, 1500);
    }
  }, [data]);

  return (
    <>
      {!loading &&
        error &&
        Object.entries(getErrors(error)).map(([key, value]) => (
          <p
            key={key}
            className="col-10 col-lg-8 mx-auto text-center text-danger"
          >
            {value}
          </p>
        ))}
      {Object.keys(data).length !== 0 && (
        <p
          className="text-success text-center mt-2"
          style={
            Object.keys(data).length !== 0
              ? { opacity: "1", transition: "opacity 0.6s linear" }
              : { opacity: 0 }
          }
        >
          Announcement deleted!
        </p>
      )}
      {!Object.keys(data).length && (
        <Row className="col-10 col-lg-8 mx-auto m-0 mb-5">
          <Col xs="6" className="mb-3 mb-sm-auto pe-sm-4">
            <Button
              className="col-12 roundBorder dangerBtn"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading && (
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
              disabled={loading}
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
