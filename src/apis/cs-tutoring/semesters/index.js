import axios from "../";

const axiosInstance = { axiosInstance: axios };
export const postSemester = (newSemester) => {
  const configObj = {
    ...axiosInstance,
    method: "post",
    url: "/semesters",
    requestConfig: { data: newSemester },
  };
  return configObj;
};

export const putSemester = (editedSemester) => {
  const { id, ...modified } = editedSemester;
  const configObj = {
    ...axiosInstance,
    method: "put",
    url: `/semesters/${id}`,
    requestConfig: { data: modified },
  };
  return configObj;
};

const makeRequest = async (configObj) => {
  const ctrl = new AbortController();
  try {
    const res = await axios({
      ...configObj,
      signal: ctrl.signal,
    });
    return res;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    return error;
  } finally {
    console.log("aborting...");
    ctrl.abort();
  }
};
