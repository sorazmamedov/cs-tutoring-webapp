import axios from "../";

const axiosInstance = { axiosInstance: axios };
export const postCourse = (semesterId, data) => {
  const configObj = {
    ...axiosInstance,
    method: "post",
    url: "/courses",
    requestConfig: { data: { semesterId, data } },
  };
  return configObj;
};

export const putCourse = (data) => {
  const { id, ...modified } = data;
  const configObj = {
    ...axiosInstance,
    method: "put",
    url: `/courses/${id}`,
    requestConfig: { data: modified },
  };
  return configObj;
};
