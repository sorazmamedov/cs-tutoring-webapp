import React, { useState, useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { DeleteIcon, MegaphoneIcon } from "../common/IconsWithTooltip";
import MainContainer from "../common/MainContainer";
import CustomPagination from "../common/CustomPagination";
import AnnouncementDialog from "./AnnouncementDialog";
import DeleteAnnouncementDialog from "./DeleteAnnouncementDialog";
import { ActionsContext } from "../Context/DataContext";

const Announcements = () => {
  const {
    setOnClose,
    setShow,
    setModalBody,
    setSubject,
    setContent,
    setAnnouncementId,
    setDeleteAnnouncement,
  } = useContext(ActionsContext);

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      subject:
        "Victor’s tutoring hours today will be conducted remotely.  See attached for zoom link.",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      read: false,
      published: true,
    },
    {
      id: 2,
      subject:
        "Andrew’s tutoring hours today will be conducted remotely.  See attached for zoom link.",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      read: true,
      published: true,
    },
    {
      id: 3,
      subject:
        "Alin’s tutoring hours today will be conducted remotely.  See attached for zoom link.",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      read: true,
      published: false,
    },
    {
      id: 4,
      subject:
        "Berk’s tutoring hours today will be conducted remotely.  See attached for zoom link.",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      read: false,
      published: true,
    },
    {
      id: 5,
      subject:
        "Victor’s tutoring hours today will be conducted remotely.  See attached for zoom link.",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      read: false,
      published: true,
    },
    {
      id: 6,
      subject:
        "Serdar’s tutoring hours today will be conducted remotely.  See attached for zoom link.",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      read: true,
      published: false,
    },
    {
      id: 7,
      subject:
        "Thomas’s tutoring hours today will be conducted remotely.  See attached for zoom link.",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      read: true,
      published: true,
    },
  ]);

  const resetModalBody = () => {
    setShow(false);
    setModalBody("");
    setContent("");
    setSubject("");
    setAnnouncementId(-1);
    setDeleteAnnouncement("");
  };

  const handleCreateAnnouncement = () => {
    setOnClose(() => resetModalBody);
    setModalBody(() => AnnouncementDialog);
    setShow(true);
  };

  const handleShowAnnouncement = (e) => {
    const targetId = parseInt(e.currentTarget.id);
    const { subject, content } = announcements.find(
      ({ id }) => id === parseInt(targetId)
    );

    setOnClose(() => resetModalBody);
    setSubject(subject);
    setContent(content);
    setModalBody(() => AnnouncementDialog);
    setShow(true);
  };

  const deleteById = (id) => {
    setAnnouncements(announcements.filter((item) => item.id !== id));
    setShow(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    const targetId = parseInt(e.currentTarget.id);
    setAnnouncementId(targetId);
    setDeleteAnnouncement(() => deleteById);
    setModalBody(() => DeleteAnnouncementDialog);
    setOnClose(() => resetModalBody);
    setShow(true);
  };

  return (
    <MainContainer
      title="Announcements"
      icon={<MegaphoneIcon onClick={handleCreateAnnouncement} />}
    >
      <Table bordered hover responsive>
        <tbody>
          {announcements.map((announcement) => (
            <tr
              id={announcement.id}
              key={announcement.id}
              className={announcement.published ? "" : "draft"}
              onClick={handleShowAnnouncement}
            >
              <td className="w-100 d-flex justify-content-between border-start-0 border-end-0">
                <p className="m-0">{announcement.subject}</p>
                <div>
                  {!announcement.published && (
                    <span className="d-inline me-4">Draft</span>
                  )}
                  <DeleteIcon id={announcement.id} onClick={handleDelete} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CustomPagination />
    </MainContainer>
  );
};

export default Announcements;
