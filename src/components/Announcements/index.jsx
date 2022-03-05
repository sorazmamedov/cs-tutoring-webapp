import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import { DeleteIcon, MegaphoneIcon } from "../common/iconsWithTooltip";
import MainContainer from "../common/mainContainer";
import TemplateModal from "../common/templateModal";
import CustomPagination from "../common/customPagination";
import AnnouncementDialog from "./announcementDialog";
import DeleteAnnouncementDialog from "./deleteAnnouncementDialog";
import { ViewContext, ActionsContext } from "../Context/announcementContext";
import { GlobalViewContext } from "../Context/dataContext";

const Announcements = () => {
  const { loadedSemester } = useContext(GlobalViewContext);
  const { setShow, setTitle, setModalBody, setAnnouncementId } =
    useContext(ActionsContext);
  const { announcements } = useContext(ViewContext);

  const handleCreateAnnouncement = () => {
    setTitle("New Announcement");
    setModalBody(() => AnnouncementDialog);
    setShow(true);
  };

  const handleShowAnnouncement = (e) => {
    const targetId = parseInt(e.currentTarget.id);
    setTitle("Announcement");
    setAnnouncementId(targetId);
    setModalBody(() => AnnouncementDialog);
    setShow(true);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    const targetId = parseInt(e.target.id);
    setTitle("Are you sure you want to delete?");
    setAnnouncementId(targetId);
    setModalBody(() => DeleteAnnouncementDialog);
    setShow(true);
  };

  return (
    <MainContainer
      title={
        !loadedSemester?.semesterName
          ? "Announcements"
          : `Announcements <--> ${loadedSemester.semesterName} ${loadedSemester.academicYear}`
      }
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
