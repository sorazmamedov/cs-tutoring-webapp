import { useEffect, useState } from "react";

const useFetcher = () => {
  const [controller, setController] = useState();

  const axiosFetch = async (configObj) => {
    const { axiosInstance, requestConfig = {}, ...endpoint } = configObj;

    try {
      const ctrl = new AbortController();
      setController(ctrl);
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
    }
  };

  useEffect(() => {
    return () => {
      console.log("[Cancel useMakeRequest]");
      controller && controller.abort();
    };
  }, [controller]);

  return [axiosFetch, controller];
};

export default useFetcher;
