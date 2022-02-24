import React from "react";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { ViewContext, ActionsContext } from "../Context/AnnouncementContext";
import { useEffect } from "react";

const AnnouncementDialog = () => {
  const { subject, content, announcementId, announcements } =
    useContext(ViewContext);
  const {
    setSubject,
    setContent,
    setAnnouncements,
    setAnnouncementId,
    setShow,
  } = useContext(ActionsContext);
  const current = announcementId
    ? { ...announcements.find((item) => item.id === announcementId) }
    : null;

  const handleSubmit = (e) => {
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
    setShow(false);
    setSubject(null);
    setContent(null);
    setAnnouncementId(null);
  };

  useEffect(() => {
    setSubject(announcementId ? current.subject : null);
    setContent(announcementId ? current.content : null);
  }, [announcementId]);

  return (
    <>
      <Modal.Title as="h4" className="w-100 pt-0 pb-5 text-center">
        Announcement
      </Modal.Title>
      <Stack gap={2} className="col-10 col-md-8 mx-auto mb-4">
        <Form.Group>
          <Form.Label className="text-muted mb-0">Subject</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            className="roundBorder"
            onChange={(e) => setSubject(e.target.value)}
            defaultValue={current?.subject}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="text-muted mb-0">Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={7}
            className="roundBorder"
            onChange={(e) => setContent(e.target.value)}
            defaultValue={current?.content}
          />
        </Form.Group>
      </Stack>
      <Modal.Footer className="d-flex p-0 mb-5 col-md-6 mx-auto justify-content-center border-0">
        <Button
          disabled={!subject || !content}
          data-action="publish"
          className="flex-fill roundBorder primaryBtn"
          onClick={handleSubmit}
        >
          PUBLISH
        </Button>
        <Button
          disabled={!subject || !content}
          data-action="draft"
          className="flex-fill roundBorder dangerBtn"
          onClick={handleSubmit}
        >
          DRAFT
        </Button>
      </Modal.Footer>
    </>
  );
};

export default AnnouncementDialog;