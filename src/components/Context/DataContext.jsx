import { createContext, useState } from "react";

const ViewContext = createContext({});
const ActionsContext = createContext({});

export const DataProvider = ({ children }) => {
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [onClose, setOnClose] = useState(() => handleClose);

  //Announcement ModalBody
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [announcementId, setAnnouncementId] = useState(-1);
  const [addAnnouncement, setAddAnnouncement] = useState("");
  const [deleteAnnouncement, setDeleteAnnouncement] = useState(() => {});

  return (
    <ViewContext.Provider
      value={{
        show,
        modalBody,
        subject,
        content,
        onClose,
        announcementId,
        addAnnouncement,
        deleteAnnouncement,
      }}
    >
      <ActionsContext.Provider
        value={{
          setShow,
          setModalBody,
          setSubject,
          setContent,
          setOnClose,
          setAnnouncementId,
          setAddAnnouncement,
          setDeleteAnnouncement,
        }}
      >
        {children}
      </ActionsContext.Provider>
    </ViewContext.Provider>
  );
};

export { ViewContext, ActionsContext };
