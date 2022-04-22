import React, { useState, useRef, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { format, isBefore } from "date-fns";
import ActionButtons from "./actionButtons";
import { getErrors } from "../../common/errorHelper";
import { ActionsContext, ViewContext } from "../../../Context/calendarContext";
import { SwitchIcon } from "../../common/iconsWithTooltip";
import useAxios from "../../../hooks/useAxios";

const DeleteSlotDialog = ({ event, reset }) => {
  const { data, error, loading, axiosFetch } = useAxios();
  const { events } = useContext(ViewContext);
  const { setEvents } = useContext(ActionsContext);
  const [deleteAll, setDeleteAll] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axiosFetch({
      method: "DELETE",
      url: `/calendars/${event.id}`,
      requestConfig: {
        params: { deleteAll },
      },
    });
  };

  useEffect(() => {
    if (Object.keys(data).length) {
      const temp = deleteAll
        ? events.filter(
            (item) =>
              item.eventId !== event.eventId ||
              isBefore(item.start, event.start)
          )
        : events.filter((item) => item.id !== event.id);
      setEvents([...temp]);
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
        <p className="text-success text-center mt-2">
          {deleteAll ? "Events deleted!" : "Event deleted!"}
        </p>
      )}
      <Form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        className="col-10 mx-auto mb-5"
      >
        <Row className="mb-5">
          <Col xs="12" className="text-center">
            <Form.Label className="mb-2 text-dark">
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
          {event.repeat && (
            <Col xs="12" className="mb-3 text-center">
              <SwitchIcon
                label="Delete recurring events as well."
                className="mb-0 text-dark"
                onChange={() => setDeleteAll(!deleteAll)}
              />
            </Col>
          )}
        </Row>
        <Row className="justify-content-around" sm="2">
          <ActionButtons {...{ saving: loading, reset, success: Object.keys(data).length !== 0 }} />
        </Row>
      </Form>
    </>
  );
};

export default DeleteSlotDialog;
