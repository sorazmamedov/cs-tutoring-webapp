import React, { useState, useEffect, useContext } from "react";
import { format, compareDesc } from "date-fns";
import Table from "react-bootstrap/Table";
import MainContainer from "../common/mainContainer";
import TemplateModal from "../common/templateModal";
import CustomPagination from "../common/customPagination";
import AnnouncementDialog from "./announcementDialog";
import TitleBar from "../common/titleBar";
import {
  NoDataPlaceholder,
  ErrorPlaceholder,
  LoadingPlaceholder,
} from "../common/Placeholders/";
import useAxios from "../../hooks/useAxios";
import { GlobalViewContext } from "../../Context/dataContext";
import useModal from "../../hooks/useModalStates";

const Announcements = () => {
  const { show, title, ModalBody, reset, setShow, setTitle, setModalBody } =
    useModal();
  const { loadedSemester } = useContext(GlobalViewContext);
  const { data, error, loading, axiosFetch } = useAxios();
  const [announcements, setAnnouncements] = useState([]);

  const handleShowAnnouncement = (e) => {
    const id = e.currentTarget.id;
    setTitle("Announcement");
    const announcement = announcements.find((item) => item.id === id);
    setModalBody(<AnnouncementDialog {...{ announcement }} />);
    setShow(true);
  };

  const fetchAnnouncements = () => {
    axiosFetch({
      method: "GET",
      url: "/announcements/public",
      requestConfig: {
        params: { semesterId: loadedSemester.id },
      },
    });
  };

  useEffect(() => {
    if (loadedSemester.id) {
      fetchAnnouncements();
      console.log("[Fetching public announcements]");
    }
    // eslint-disable-next-line
  }, [loadedSemester]);

  useEffect(() => {
    const temp = data
      .map((item) => ({ ...item, createdOn: new Date(item.createdOn) }))
      .sort((a, b) => compareDesc(a.createdOn, b.createdOn));
    setAnnouncements(temp);
  }, [data]);

  return (
    <MainContainer>
      {!loading && !error && <TitleBar title="Announcements" />}
      {loading && <LoadingPlaceholder />}
      {!loading && error && <ErrorPlaceholder />}
      {!loading && !error && announcements && announcements.length === 0 && (
        <NoDataPlaceholder />
      )}
      {!loading && !error && announcements && announcements.length !== 0 && (
        <>
          <Table className="text-center" bordered hover responsive>
            <tbody>
              {announcements.map((announcement) => (
                <tr
                  id={announcement.id}
                  key={announcement.id}
                  onClick={handleShowAnnouncement}
                >
                  <td className="no-stretch">
                    {format(announcement.createdOn, "M-d-yyyy")}
                  </td>
                  <td className="d-flex justify-content-between border-start-0 border-end-0">
                    <p className="m-0">
                      {`${
                        announcement.subject.length > 100
                          ? announcement.subject.substring(0, 100) + "..."
                          : announcement.subject
                      }`}
                    </p>
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
