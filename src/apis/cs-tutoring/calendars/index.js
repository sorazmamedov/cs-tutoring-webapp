import { makeRequest } from "../";

export const postCalendar = (data) => {
  const configObj = {
    method: "post",
    url: "/calendars",
    requestConfig: { data },
  };
  return makeRequest(configObj);
};

export const putCalendar = (data) => {
  const { id, ...modified } = data;
  const configObj = {
    method: "put",
    url: `/calendars/${id}`,
    requestConfig: { data: modified },
  };
  return makeRequest(configObj);
};

export const deleteCalendar = ({ id, deleteAll }) => {
  const configObj = {
    method: "delete",
    url: `/calendars/${id}`,
    requestConfig: {
      params: { deleteAll },
    },
  };
  return makeRequest(configObj);
};
