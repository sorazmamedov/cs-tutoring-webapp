import React, { createContext, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useEffect } from "react";

const GlobalViewContext = createContext({});
const GlobalActionsContext = createContext({});

const DataProvider = ({ children }) => {
  const { data, error, loading, axiosFetch } = useAxios();
  const [loadedSemester, setLoadedSemester] = useState({});

  const fetchActiveSemester = () => {
    axiosFetch({
      method: "GET",
      url: "/semesters/public/active",
      requestConfig: {},
    });
  };

  useEffect(() => {
    fetchActiveSemester();
    console.log("[Fetching Active]");
    // eslint-disable-next-line
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
        error,
        loading,
      }}
    >
      <GlobalActionsContext.Provider
        value={{
          setLoadedSemester,
        }}
      >
        {children}
      </GlobalActionsContext.Provider>
    </GlobalViewContext.Provider>
  );
};

export default DataProvider;
export { GlobalViewContext, GlobalActionsContext };
