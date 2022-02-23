import { useState } from "react";

export default () => {
  const [announcementId, setAnnouncementId] = useState("");
  const [addAnnouncement, setAddAnnouncement] = useState("");
  const [deleteAnnouncement, setDeleteAnnouncement] = useState("");

  return [
    announcementId,
    setAnnouncementId,
    addAnnouncement,
    setAddAnnouncement,
    deleteAnnouncement,
    setDeleteAnnouncement,
  ];
};
