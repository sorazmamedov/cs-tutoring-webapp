import React, { useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { format } from "date-fns";
import ActionButtons from "./actionButtons";
import { getErrors } from "../../common/errorHelper";
import { ActionsContext } from "../../../Context/timeslotContext";
import useAxios from "../../../hooks/useAxios";

const DeleteSlotDialog = ({ event, reset }) => {
  const { data, error, loading, axiosFetch } = useAxios();
  const { setEvents } = useContext(ActionsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reason = e.currentTarget.reason.value.trim();

    axiosFetch({
      method: "DELETE",
      url: `/timeslots/${event.id}`,
      requestConfig: { data: { reason } },
    });
  };

  useEffect(() => {
    if (Object.keys(data).length) {
      setEvents((prev) => [...prev.filter((item) => item.id !== event.id)]);
      setTimeout(() => {
        reset();
      }, 2000);
    }
    // eslint-disable-next-line
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
        <p className="text-success text-center mt-2">"Slot deleted!"</p>
      )}
      <Form noValidate onSubmit={handleSubmit} className="col-10 mx-auto mb-5">
        <Row className={`mb-2 col-lg-6 mx-auto ${event.booked ? "" : "mb-5 text-center"}`}>
          <Col xs="12">
            <Form.Label className="text-dark ps-1">
              {format(event.start, "PP")}
              <span className="mx-2 p-1 rounded">
                {format(event.start, "h:mm bbb")}
              </span>
              -
              <span className="mx-2 p-1 rounded">
                {format(event.end, "h:mm bbb")}
              </span>
            </Form.Label>
          </Col>
        </Row>
        {event.booked && (
          <Row className="mb-5 col-lg-6 mx-auto">
            <Col xs="12">
              <Form.Control
                as="textarea"
                className="roundBorder"
                name="reason"
                placeholder="Reason for cancelation"
                rows={3}
              />
            </Col>
          </Row>
        )}
        <Row className="justify-content-around col-lg-10 mx-auto" sm="2">
          <ActionButtons
            {...{
              saving: loading,
              reset,
              success: Object.keys(data).length !== 0,
            }}
          />
        </Row>
      </Form>
    </>
  );
};

export default DeleteSlotDialog;
