import React, { createContext, useState, useEffect, useContext } from "react";
import useAxios from "../hooks/useAxios";
import axios from "../apis/cs-tutoring";
import { GlobalViewContext } from "./dataContext";

const ViewContext = createContext({});
const ActionsContext = createContext({});

const TutorDataProvider = ({ children }) => {
  const { loadedSemester, admin } = useContext(GlobalViewContext);
  const [data, error, loading, axiosFetch] = useAxios();
  const [tutors, setTutors] = useState([]);
  const [current, setCurrent] = useState("");

  const fetchTutors = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/tutors",
      requestConfig: {
        params: { semesterId: loadedSemester.id },
      },
    });
  };

  useEffect(() => {
    if (loadedSemester.id && current !== loadedSemester.id) {
      setCurrent(loadedSemester.id);
      fetchTutors();
      console.log("[Fetching tutors]");
    }
    // eslint-disable-next-line
  }, [loadedSemester]);

  useEffect(() => {
    setTutors([...data]);
  }, [data]);

  return (
    <ViewContext.Provider
      value={{
        admin,
        tutors,
        error,
        loading,
      }}
    >
      <ActionsContext.Provider
        value={{
          setTutors,
        }}
      >
        {children}
      </ActionsContext.Provider>
    </ViewContext.Provider>
  );
};

export default TutorDataProvider;
export { ViewContext, ActionsContext };
