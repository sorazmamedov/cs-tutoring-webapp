import React, { useState, useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { DeleteIcon, MegaphoneIcon } from "../common/IconsWithTooltip";
import MainContainer from "../common/MainContainer";
import TemplateModal from "../common/TemplateModal";
import CustomPagination from "../common/CustomPagination";
import AnnouncementDialog from "./AnnouncementDialog";
import DeleteAnnouncementDialog from "./DeleteAnnouncementDialog";
import { ViewContext, ActionsContext } from "../Context/AnnouncementContext";

const Announcements = () => {
  const { setShow, setModalBody, setAnnouncementId } =
    useContext(ActionsContext);
  const { announcements } = useContext(ViewContext);

  const handleCreateAnnouncement = () => {
    setModalBody(() => AnnouncementDialog);
    setShow(true);
  };

  const handleShowAnnouncement = (e) => {
    const targetId = parseInt(e.currentTarget.id);
    setModalBody(() => AnnouncementDialog);
    setAnnouncementId(targetId);
    setShow(true);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    const targetId = parseInt(e.target.id);
    setAnnouncementId(targetId);
    setModalBody(() => DeleteAnnouncementDialog);
    setShow(true);
  };

  useEffect(() => {
    console.log("Announcements change...");
  }, [announcements]);

  return (
    <MainContainer
      title="Announcements"
      icon={<MegaphoneIcon onClick={handleCreateAnnouncement} />}
    >
      <Table bordered hover responsive>
        <tbody>
          {announcements
            .sort((a, b) => a.id - b.id)
            .map((announcement) => (
              <tr
                id={announcement.id}
                key={announcement.id}
                className={announcement.published ? "" : "draft"}
                onClick={handleShowAnnouncement}
              >
                <td className="d-flex justify-content-between border-start-0 border-end-0">
                  <p className="m-0">
                    {`${announcement.id}: ${
                      announcement.subject.length > 100
                        ? announcement.subject.substring(0, 100) + "..."
                        : announcement.subject
                    }`}
                  </p>
                  <div>
                    {!announcement.published && (
                      <span className="me-4">Draft</span>
                    )}
                    <DeleteIcon id={announcement.id} onClick={handleDelete} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <CustomPagination />
      <TemplateModal viewContext={ViewContext} />
    </MainContainer>
  );
};

export default Announcements;
