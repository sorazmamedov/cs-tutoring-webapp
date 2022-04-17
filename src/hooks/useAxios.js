import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useAxios = () => {
  const axiosPrivate = useAxiosPrivate();
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();

  const axiosFetch = async (configObj) => {
    const {
      axiosInstance = axiosPrivate,
      method,
      url,
      requestConfig = {},
    } = configObj;

    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const response = await axiosInstance({
        method: method.toLowerCase(),
        url,
        ...requestConfig,
        signal: ctrl.signal,
      });
      setResponse(response.data);
      if (Object.keys(error).length) {
        setError("");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response);
      } else {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      controller && controller.abort();
    };
  }, [controller]);

  return { data: response, error, setError, loading, setLoading, axiosFetch };
};

export default useAxios;
