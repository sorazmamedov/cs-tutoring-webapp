import { makeRequest } from "../";

export const postAnnouncement = (newAnnouncement) => {
  const configObj = {
    method: "post",
    url: "/announcements",
    requestConfig: { data: newAnnouncement },
  };
  return makeRequest(configObj);
};

export const putAnnouncement = (data) => {
  const { id, ...modified } = data;
  const configObj = {
    method: "put",
    url: `/announcements/${id}`,
    requestConfig: { data: modified },
  };
  return makeRequest(configObj);
};

export const deleteAnnouncement = (id) => {
  const configObj = {
    method: "delete",
    url: `/announcements/${id}`,
    requestConfig: {},
  };
  return makeRequest(configObj);
};
