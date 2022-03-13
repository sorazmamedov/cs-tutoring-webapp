import axios from "../";

const axiosInstance = { axiosInstance: axios };
export const postTutor = (data) => {
  const configObj = {
    ...axiosInstance,
    method: "post",
    url: "/tutors",
    requestConfig: { data: {} },
  };
  return configObj;
};

export const putTutor = (data) => {
  const { id, ...modified } = data;
  const configObj = {
    ...axiosInstance,
    method: "put",
    url: `/tutors/${id}`,
    requestConfig: { data: modified },
  };
  return configObj;
};
