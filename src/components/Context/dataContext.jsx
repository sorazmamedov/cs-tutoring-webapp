import { createContext, useState } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "../../apis/cs-tutoring";
import { useEffect } from "react";

const GlobalViewContext = createContext({});
const GlobalActionsContext = createContext({});

const DataProvider = ({ children }) => {
  const [data, error, loading, axiosFetch] = useAxios();
  const [loadedSemester, setLoadedSemester] = useState({});
  const [admin, setAdmin] = useState(true);

  const fetchActiveSemester = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/semesters/active",
      requestConfig: {},
    });
  };

  useEffect(() => {
    fetchActiveSemester();
  }, []);

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      setLoadedSemester({ ...data });
    }
  }, [data]);

  return (
    <GlobalViewContext.Provider
      value={{
        loadedSemester,
        admin,
      }}
    >
      <GlobalActionsContext.Provider
        value={{
          setLoadedSemester,
          setAdmin,
        }}
      >
        {children}
      </GlobalActionsContext.Provider>
    </GlobalViewContext.Provider>
  );
};

export default DataProvider;
export { GlobalViewContext, GlobalActionsContext };
