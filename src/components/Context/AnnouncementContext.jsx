import { createContext, useState } from "react";

const ViewContext = createContext({});
const ActionsContext = createContext({});

export const AnnouncementDataProvider = ({ children }) => {
  //Announcement
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

  //Modal
  const [show, setShow] = useState(false);
  const [modalBody, setModalBody] = useState("");

  //Announcement ModalBody

  const handleReset = () => {
    console.log("Resetting everything....");
    setShow(false);
    setModalBody("");
    setContent("");
    setSubject("");
    setAnnouncementId(0);
  };
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [announcementId, setAnnouncementId] = useState(0);
  const [addAnnouncement, setAddAnnouncement] = useState("");
  const [reset] = useState(() => handleReset);

  return (
    <ViewContext.Provider
      value={{
        show,
        modalBody,
        subject,
        content,
        announcementId,
        addAnnouncement,
        announcements,
        reset,
      }}
    >
      <ActionsContext.Provider
        value={{
          setShow,
          setModalBody,
          setSubject,
          setContent,
          setAnnouncementId,
          setAddAnnouncement,
          setAnnouncements,
        }}
      >
        {children}
      </ActionsContext.Provider>
    </ViewContext.Provider>
  );
};

export { ViewContext, ActionsContext };
