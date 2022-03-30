import React, { createContext, useState, useEffect, useContext } from "react";
import useAxios from "../hooks/useAxios";
import axios from "../apis/cs-tutoring";
import { GlobalViewContext } from "./dataContext";
import useAuth from "../hooks/useAuth";

const ViewContext = createContext({});
const ActionsContext = createContext({});

const ScheduleDataProvider = ({ children }) => {
  const { auth, ROLES } = useAuth();
  const { loadedSemester } = useContext(GlobalViewContext);
  const [data, error, loading, axiosFetch] = useAxios();
  const [schedules, setSchedules] = useState([]);
  const [current, setCurrent] = useState("");

  const fetchSchedules = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/schedules",
      requestConfig: {
        params: { semesterId: loadedSemester.id },
      },
    });
  };

  useEffect(() => {
    if (loadedSemester.id && current !== loadedSemester.id) {
      setCurrent(loadedSemester.id);
      fetchSchedules();
      console.log("[Fetching schedules]");
    }
    // eslint-disable-next-line
  }, [loadedSemester]);

  useEffect(() => {
    setSchedules([...data]);
  }, [data]);

  return (
    <ViewContext.Provider
      value={{
        schedules,
        loadedSemester,
        auth,
        ROLES,
        error,
        loading,
      }}
    >
      <ActionsContext.Provider
        value={{
          setSchedules,
        }}
      >
        {children}
      </ActionsContext.Provider>
    </ViewContext.Provider>
  );
};

export default ScheduleDataProvider;
export { ViewContext, ActionsContext };
