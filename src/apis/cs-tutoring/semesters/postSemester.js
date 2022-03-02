import axios from "../cs-tutoring";

const postSemester = (newSemester) => {
  const configObj = { method: "post", url: "/semesters", data: newSemester };
  return makeRequest(configObj);
};

export default postSemester;

const makeRequest = async (configObj) => {
  // const { method, url, requestConfig = {} } = configObj;
  const ctrl = new AbortController();

  try {
    const res = await axios({
      ...configObj,
      signal: ctrl.signal,
    });
    return res;
  } catch (err) {
    console.log(err.message);
    return err.message;
  } finally {
    ctrl.abort();
  }
};
