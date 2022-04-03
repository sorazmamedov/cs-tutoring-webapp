import React, { useContext } from "react";
import { format, parseISO } from "date-fns";
import Table from "react-bootstrap/Table";
import { DeleteIcon, MegaphoneIcon } from "../common/iconsWithTooltip";
import MainContainer from "../common/mainContainer";
import TemplateModal from "../common/templateModal";
import CustomPagination from "../common/customPagination";
import AnnouncementDialog from "./announcementDialog";
import DeleteAnnouncementDialog from "./deleteAnnouncementDialog";
import { ViewContext } from "../../Context/announcementContext";
import TitleBar from "../common/titleBar";
import {
  NoDataPlaceholder,
  ErrorPlaceholder,
  LoadingPlaceholder,
} from "../common/Placeholders/";
import useModal from "../../hooks/useModalStates";

const Announcements = () => {
  const { show, title, ModalBody, reset, setShow, setTitle, setModalBody } =
    useModal();
  const { announcements, auth, ROLES, error, loading } =
    useContext(ViewContext);

  const isAdmin = auth?.user?.roles.includes(ROLES.Admin);

  const handleCreateAnnouncement = () => {
    setTitle("New Announcement");
    setModalBody(<AnnouncementDialog {...{ reset, isAdmin }} />);
    setShow(true);
  };

  const handleShowAnnouncement = (e) => {
    const id = e.currentTarget.id;
    setTitle("Announcement");
    setModalBody(<AnnouncementDialog {...{ id, reset, isAdmin }} />);
    setShow(true);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    const id = e.target.id;
    setTitle("Are you sure you want to delete?");
    setModalBody(<DeleteAnnouncementDialog {...{ id, reset }} />);
    setShow(true);
  };

  return (
    <MainContainer>
      {!loading && !error && (
        <TitleBar
          title="Announcements"
          icon={isAdmin && <MegaphoneIcon onClick={handleCreateAnnouncement} />}
        />
      )}

      {loading && <LoadingPlaceholder />}
      {!loading && error && <ErrorPlaceholder />}
      {!loading && !error && announcements.length === 0 && (
        <NoDataPlaceholder />
      )}
      {!loading && !error && announcements && announcements.length !== 0 && (
        <>
          <Table bordered hover responsive>
            <tbody>
              {[...announcements]
                .sort((a, b) => b.createdOn - a.createdOn)
                .map((announcement) => (
                  <tr
                    id={announcement.id}
                    key={announcement.id}
                    className={announcement.published ? "" : "draft"}
                    onClick={handleShowAnnouncement}
                  >
                    <td className="no-stretch">
                      {format(parseISO(announcement.createdOn), "M-d-yyyy")}
                    </td>
                    <td className="d-flex justify-content-between border-start-0 border-end-0">
                      <p className="m-0">
                        {`${
                          announcement.subject.length > 100
                            ? announcement.subject.substring(0, 100) + "..."
                            : announcement.subject
                        }`}
                      </p>
                      {isAdmin && (
                        <div>
                          {!announcement.published && (
                            <span className="me-4">Draft</span>
                          )}
                          <DeleteIcon
                            id={announcement.id}
                            onClick={handleDelete}
                            className="me-3"
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <CustomPagination />
        </>
      )}
      <TemplateModal {...{ show, title, ModalBody, reset }} />
    </MainContainer>
  );
};

export default Announcements;
