import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { ViewContext, ActionsContext } from "../../Context/announcementContext";
import { isEqual } from "../../utils/isEqual";
import Id from "../../utils/Id";
import { announcementValidator } from "../../utils/validator";
import { getErrors } from "../common/errorHelper";
import useAxios from "../../hooks/useAxios";

const AnnouncementDialog = ({ id, reset, isAdmin }) => {
  const { data, error, setError, loading, axiosFetch } = useAxios();
  const { announcements, loadedSemester } = useContext(ViewContext);
  const { setAnnouncements } = useContext(ActionsContext);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const [publish, setPublish] = useState(false);

  const current = id && { ...announcements.find((item) => item.id === id) };
  let newItem = {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    const form = e.currentTarget;

    if (!id) {
      newItem = {
        id: Id.makeId(),
        publisherId: Id.makeId(),
        semesterId: loadedSemester.id,
        subject: form.subject.value.trim(),
        content: form.content.value.trim(),
        published: publish,
      };
    } else {
      newItem = {
        ...current,
        subject: form.subject.value.trim(),
        content: form.content.value.trim(),
        published: publish,
      };

      if (isEqual(current, newItem)) {
        reset();
        return;
      }
    }
    newItem.createdOn = new Date();

    const error = announcementValidator(newItem);
    if (error) {
      setError(error);
      setValidated(false);
      return;
    }

    if (id) {
      axiosFetch({
        method: "PUT",
        url: `/announcements/${id}`,
        requestConfig: { data: newItem },
      });
    } else {
      axiosFetch({
        method: "POST",
        url: "/announcements",
        requestConfig: { data: newItem },
      });
    }
  };

  useEffect(() => {
    if (Object.keys(data).length) {
      const filtered = id
        ? announcements.filter((item) => item.id !== id)
        : announcements;
      setAnnouncements([
        { ...data, createdOn: new Date(data.createdOn) },
        ...filtered,
      ]);
      reset();
    } else if (error) {
      setErrors(getErrors(error));
      setValidated(false);
      return;
    }
  }, [data, error]);

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
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="col-10 col-lg-8 mx-auto mb-5"
      >
        <Row className="mb-2">
          <Col xs="12">
            <Form.Label className="text-muted mb-0">Subject</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="subject"
              className="roundBorder"
              defaultValue={current?.subject}
              isInvalid={errors.subject}
              readOnly={!isAdmin}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.subject}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col xs="12">
            <Form.Label className="text-muted mb-0">Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={7}
              name="content"
              className="roundBorder"
              defaultValue={current?.content}
              isInvalid={errors.content}
              readOnly={!isAdmin}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.content}
            </Form.Control.Feedback>
          </Col>
        </Row>
        {isAdmin && (
          <Row className="mb-5" sm="2">
            <Col sm="6" className="order-2 order-sm-1 mb-3 mb-sm-auto pe-sm-4">
              <Button
                className="col-12 roundBorder dangerBtn"
                onClick={() => setPublish(false)}
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
                DRAFT
              </Button>
            </Col>
            <Col sm="6" className="order-1 order-sm-2 mb-3 mb-sm-auto ps-sm-4">
              <Button
                className="col-12 roundBorder primaryBtn"
                onClick={() => setPublish(true)}
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
                PUBLISH
              </Button>
            </Col>
          </Row>
        )}
      </Form>
    </>
  );
};

export default AnnouncementDialog;
