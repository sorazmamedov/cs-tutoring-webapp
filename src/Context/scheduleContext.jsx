import React, { createContext, useState, useEffect, useContext } from "react";
import useAxios from "../hooks/useAxios";
import { GlobalViewContext } from "./dataContext";
import {
  ViewContext as TutorsContext,
  ActionsContext as TutorsActionsContext,
} from "./tutorsContext";
import useAuth from "../hooks/useAuth";

const ViewContext = createContext({});
const ActionsContext = createContext({});

const ScheduleDataProvider = ({ children }) => {
  const { auth, ROLES, signingIn } = useAuth();
  const { setRefetchTutors } = useContext(TutorsActionsContext);
  const {
    tutors,
    error: tutorsError,
    loading: tutorsLoading,
  } = useContext(TutorsContext);
  const { loadedSemester, darkTheme } = useContext(GlobalViewContext);
  const { data, error, loading, axiosFetch } = useAxios();
  const [schedules, setSchedules] = useState([]);
  const [current, setCurrent] = useState("");
  const [refetch, setRefetch] = useState(false);

  const fetchSchedules = () => {
    axiosFetch({
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
    } else if (refetch) {
      setRefetchTutors(true);
      setRefetch(false);
      fetchSchedules();
      console.log("[*Refetching schedules*]");
    }
    // eslint-disable-next-line
  }, [loadedSemester, refetch]);

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
        signingIn,
        error,
        loading,
        darkTheme,
        tutors,
        tutorsError,
        tutorsLoading,
      }}
    >
      <ActionsContext.Provider
        value={{
          setSchedules,
          setRefetch,
        }}
      >
        {children}
      </ActionsContext.Provider>
    </ViewContext.Provider>
  );
};

export default ScheduleDataProvider;
export { ViewContext, ActionsContext };
