import axios from "axios";

const BASE_URL = "http://localhost:4000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosInstance;

export const makeRequest = async (configObj) => {
  const { requestConfig = {}, ...endpoint } = configObj;
  const ctrl = new AbortController();
  try {
    const res = await axiosInstance({
      ...endpoint,
      ...requestConfig,
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
