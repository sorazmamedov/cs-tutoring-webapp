import { makeRequest } from "../";

export const postAuth = (token) => {
  const configObj = {
    method: "post",
    url: "/auth/google",
    requestConfig: { data: token },
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
