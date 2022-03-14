import { makeRequest } from "../";

export const postSemester = (newSemester) => {
  const configObj = {
    method: "post",
    url: "/semesters",
    requestConfig: { data: newSemester },
  };
  return makeRequest(configObj);
};

export const putSemester = (modifiedSemester) => {
  const { id, ...modified } = modifiedSemester;
  const configObj = {
    method: "put",
    url: `/semesters/${id}`,
    requestConfig: { data: modified },
  };
  return makeRequest(configObj);
};
