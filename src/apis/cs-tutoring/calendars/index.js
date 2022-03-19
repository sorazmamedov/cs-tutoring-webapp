import { makeRequest } from "../";

export const postCalendar = (semesterId, data) => {
  const configObj = {
    method: "post",
    url: "/calendars",
    requestConfig: { data: { semesterId, data } },
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

export const deleteCalendar = (id) => {
  const configObj = {
    method: "delete",
    url: `/calendars/${id}`,
    requestConfig: {},
  };
  return makeRequest(configObj);
};
