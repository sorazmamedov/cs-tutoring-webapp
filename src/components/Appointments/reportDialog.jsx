import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { parseISO } from "date-fns";
import Spinner from "react-bootstrap/Spinner";
import { getErrors } from "../common/errorHelper";
import useAxios from "../../hooks/useAxios";
import { appointmentValidator } from "../../utils/validator";

const ReportDialog = ({ userId, appointment, reset, setAppointments }) => {
  const { data, error, setError, loading, axiosFetch } = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const report = form.report.value.trim();

    if (report === appointment.report) {
      reset();
      return;
    }

    const result = appointmentValidator({ report });
    if (result) {
      setError(result);
      return;
    }

    axiosFetch({
      method: "PUT",
      url: `/users/${userId}/appointments/${appointment.id}`,
      requestConfig: { data: { report } },
    });
  };

  useEffect(() => {
    if (Object.keys(data).length) {
      setAppointments((prev) => {
        let index = prev.findIndex((item) => item.id === appointment.id);
        return [
          ...prev.slice(0, index),
          { ...data, start: parseISO(data.start), end: parseISO(data.end) },
          ...prev.slice(++index),
        ];
      });

      reset();
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
      <Form
        noValidate
        onSubmit={handleSubmit}
        className="col-10 col-lg-8 mx-auto mb-5"
      >
        <Row className="mb-5">
          <Col xs="12">
            <Form.Control
              as="textarea"
              rows={7}
              name="report"
              className="roundBorder"
              defaultValue={appointment?.report}
              readOnly={appointment?.sent}
              required
            />
          </Col>
        </Row>
        {!appointment?.sent && (
          <Row className="mb-5" sm="2">
            <Col sm="6" className="order-2 order-sm-1 mb-3 mb-sm-auto pe-sm-4">
              <Button
                className="col-12 roundBorder dangerBtn"
                onClick={() => reset()}
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
                    <span className="visually-hidden">Saving...</span>
                  </>
                )}
                CANCEL
              </Button>
            </Col>
            <Col sm="6" className="order-1 order-sm-2 mb-3 mb-sm-auto ps-sm-4">
              <Button
                className="col-12 roundBorder primaryBtn"
                type="submit"
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
                    <span className="visually-hidden">Saving...</span>
                  </>
                )}
                SAVE
              </Button>
            </Col>
          </Row>
        )}
      </Form>
    </>
  );
};

export default ReportDialog;
