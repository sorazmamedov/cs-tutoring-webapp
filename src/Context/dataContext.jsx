import React, { createContext, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const GlobalViewContext = createContext({});
const GlobalActionsContext = createContext({});

const DataProvider = ({ children }) => {
  const { signingOut } = useAuth();
  const { data, error, loading, axiosFetch } = useAxios();
  const [loadedSemester, setLoadedSemester] = useState("");
  const [darkTheme, setDarkTheme] = useState(false);

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

  useEffect(() => {
    if (signingOut) {
      setLoadedSemester("");
      fetchActiveSemester();
    }
    // eslint-disable-next-line
  }, [signingOut]);

  return (
    <GlobalViewContext.Provider
      value={{
        loadedSemester,
        error,
        loading,
        darkTheme,
      }}
    >
      <GlobalActionsContext.Provider
        value={{
          setLoadedSemester,
          setDarkTheme,
        }}
      >
        {children}
      </GlobalActionsContext.Provider>
    </GlobalViewContext.Provider>
  );
};

export default DataProvider;
export { GlobalViewContext, GlobalActionsContext };
