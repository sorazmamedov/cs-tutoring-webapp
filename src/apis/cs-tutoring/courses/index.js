import {makeRequest} from "../";

export const postCourse = (semesterId, data) => {
  const configObj = {
    method: "post",
    url: "/courses",
    requestConfig: { data: { semesterId, data } },
  };
  return makeRequest(configObj);
};

export const putCourse = (data) => {
  const { id, ...modified } = data;
  const configObj = {
    method: "put",
    url: `/courses/${id}`,
    requestConfig: { data: modified },
  };
  return makeRequest(configObj);
};
