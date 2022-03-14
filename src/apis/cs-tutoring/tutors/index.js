import { makeRequest } from "../";

export const postTutor = () => {
  const configObj = {
    method: "post",
    url: "/tutors",
    requestConfig: { data: {} },
  };
  return makeRequest(configObj);
};

export const putTutor = (data) => {
  const { id, ...modified } = data;
  const configObj = {
    method: "put",
    url: `/tutors/${id}`,
    requestConfig: { data: modified },
  };
  return makeRequest(configObj);
};
