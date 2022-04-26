import React, { useEffect } from "react";
import { createContext, useState, useContext } from "react";
import useAxios from "../hooks/useAxios";
import {
  GlobalViewContext,
  GlobalActionsContext,
} from "../Context/dataContext";

const ViewContext = createContext({});
const ActionsContext = createContext({});

const SemesterDataProvider = ({ children }) => {
  const { loadedSemester, darkTheme } = useContext(GlobalViewContext);
  const { setLoadedSemester } = useContext(GlobalActionsContext);
  const { data, error, loading, axiosFetch } = useAxios();

  //Semesters
  const [semesters, setSemesters] = useState([]);
  const [currentSemester, setCurrentSemester] = useState({});

  const fetchSemesters = () => {
    axiosFetch({
      method: "GET",
      url: "/semesters",
      requestConfig: {},
    });
  };

  useEffect(() => {
    fetchSemesters();
    console.log("[Fetching semesters]");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setSemesters([...data]);
  }, [data]);

  return (
    <ViewContext.Provider
      value={{
        semesters,
        currentSemester,
        loadedSemester,
        error,
        loading,
        darkTheme,
      }}
    >
      <ActionsContext.Provider
        value={{
          setCurrentSemester,
          setLoadedSemester,
          setSemesters,
        }}
      >
        {children}
      </ActionsContext.Provider>
    </ViewContext.Provider>
  );
};

export default SemesterDataProvider;
export { ViewContext, ActionsContext };
