import { makeRequest } from "../";

export const postSchedule = (newSchedule) => {
  const configObj = {
    method: "post",
    url: "/schedules",
    requestConfig: { data: newSchedule },
  };
  return makeRequest(configObj);
};

export const putSchedule = (modifiedSchedule) => {
  const { id, ...modified } = modifiedSchedule;
  const configObj = {
    method: "put",
    url: `/schedules/${id}`,
    requestConfig: { data: modified },
  };
  return makeRequest(configObj);
};
