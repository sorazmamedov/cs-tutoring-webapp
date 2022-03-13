import axios from "../";

const axiosInstance = { axiosInstance: axios };
export const postSchedule = (newSchedule) => {
  const configObj = {
    method: "post",
    url: "/schedules",
    data: newSchedule,
  };
  return makeRequest(configObj);
};

export const putSchedule = (modifiedSchedule) => {
  const { id, ...modified } = modifiedSchedule;
  const configObj = {
    ...axiosInstance,
    method: "put",
    url: `/schedules/${id}`,
    data: modified,
  };
  return makeRequest(configObj);
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
    ctrl.abort();
  }
};
