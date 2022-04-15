import React, { createContext, useState, useEffect, useContext } from "react";
import { startOfWeek, endOfWeek } from "date-fns";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { GlobalViewContext } from "./dataContext";
import { ViewContext as TutorContext } from "./tutorsContext";

const ViewContext = createContext({});
const ActionsContext = createContext({});

const TimeslotDataProvider = ({ children }) => {
  const { auth, ROLES } = useAuth();
  const {
    tutors,
    error: tutorsError,
    loading: tutorsLoading,
  } = useContext(TutorContext);
  const { loadedSemester, darkTheme } = useContext(GlobalViewContext);
  const { data, error, loading, axiosFetch } = useAxios();
  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [start, setStart] = useState(startOfWeek(new Date()))
  const [end, setEnd] = useState(endOfWeek(new Date()))

  const fetchSlots = () => {
    axiosFetch({
      method: "GET",
      url: "/timeslots",
      requestConfig: {
        params: { semesterId: loadedSemester.id, start, end },
      },
    });
  };

  useEffect(() => {
    if (loadedSemester.id && current !== loadedSemester.id) {
      setCurrent(loadedSemester.id);
      fetchSlots();
      console.log("[Fetching timeslots]");
    } else if (refetch) {
      setRefetch(false);
      fetchSlots();
      console.log("[*Refetching timeslots*]");
    }
    // eslint-disable-next-line
  }, [loadedSemester, refetch]);

  useEffect(() => {
    const temp = data.map((item) => {
      return { ...item, start: new Date(item.start), end: new Date(item.end) };
    });
    setEvents([...temp]);
  }, [data]);

  return (
    <ViewContext.Provider
      value={{
        events,
        error,
        loading,
        loadedSemester,
        darkTheme,
        tutors,
        tutorsError,
        tutorsLoading,
        auth,
        ROLES,
      }}
    >
      <ActionsContext.Provider
        value={{
          setEvents,
          setRefetch,
          setStart,
          setEnd
        }}
      >
        {children}
      </ActionsContext.Provider>
    </ViewContext.Provider>
  );
};

export default TimeslotDataProvider;
export { ViewContext, ActionsContext };
