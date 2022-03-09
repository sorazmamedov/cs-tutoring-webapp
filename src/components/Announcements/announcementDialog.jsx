import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { ViewContext, ActionsContext } from "../Context/announcementContext";

const AnnouncementDialog = () => {
  const [validated, setValidated] = useState(false);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const { announcementId, announcements, reset } = useContext(ViewContext);
  const { setAnnouncements } = useContext(ActionsContext);

  const current = announcementId
    ? { ...announcements.find((item) => item.id === announcementId) }
    : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setValidated(true);
    const isPublished =
      e.target.getAttribute("data-action") === "draft" ? false : true;
    let announcement = {};
    if (announcementId) {
      announcement = {
        ...current,
        subject: subject,
        content: content,
        published: isPublished,
      };
    } else {
      announcement = {
        id: announcements.length + 1,
        subject: subject,
        content: content,
        published: isPublished,
      };
    }

    setAnnouncements([
      ...announcements.filter((item) => item.id !== announcement.id),
      announcement,
    ]);

    reset();
  };

  useEffect(() => {
    setSubject(announcementId ? current.subject : null);
    setContent(announcementId ? current.content : null);
  }, [announcementId]);

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className="col-10 col-lg-8 mx-auto"
    >
      <Row className="mb-2">
        <Col xs="12">
          <Form.Label className="text-muted mb-0">Subject</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            className="roundBorder"
            onChange={(e) => setSubject(e.target.value.trim())}
            defaultValue={current?.subject}
            required
          />
        </Col>
      </Row>
      <Row className="mb-5">
        <Col xs="12">
          <Form.Label className="text-muted mb-0">Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={7}
            className="roundBorder"
            onChange={(e) => setContent(e.target.value.trim())}
            defaultValue={current?.content}
            required
          />
        </Col>
      </Row>
      <Row className="mb-5" sm="2">
        <Col sm="6" className="order-2 order-sm-1 mb-3 mb-sm-auto pe-sm-4">
          <Button
            disabled={!subject || !content}
            data-action="draft"
            className="col-12 roundBorder dangerBtn"
            onClick={handleSubmit}
            type="submit"
          >
            DRAFT
          </Button>
        </Col>
        <Col sm="6" className="order-1 order-sm-2 mb-3 mb-sm-auto ps-sm-4">
          <Button
            disabled={!subject || !content}
            data-action="publish"
            className="col-12 roundBorder primaryBtn"
            onClick={handleSubmit}
            type="submit"
          >
            PUBLISH
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AnnouncementDialog;
