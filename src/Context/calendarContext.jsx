import React, { createContext, useState, useEffect, useContext } from "react";
import { startOfWeek, endOfWeek } from "date-fns";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { GlobalViewContext } from "./dataContext";

const ViewContext = createContext({});
const ActionsContext = createContext({});

const CalendarDataProvider = ({ children }) => {
  const { auth } = useAuth();
  const { loadedSemester, darkTheme } = useContext(GlobalViewContext);
  const { data, error, loading, axiosFetch } = useAxios();
  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [start, setStart] = useState(startOfWeek(new Date()));
  const [end, setEnd] = useState(endOfWeek(new Date()));

  const fetchCalendar = () => {
    axiosFetch({
      method: "GET",
      url: `/users/${auth?.user?.id}/calendars`,
      requestConfig: {
        params: { semesterId: loadedSemester.id, start, end },
      },
    });
  };

  useEffect(() => {
    if (loadedSemester.id && current !== loadedSemester.id) {
      setCurrent(loadedSemester.id);
      fetchCalendar();
      console.log("[Fetching my calendar]");
    } else if (refetch) {
      setRefetch(false);
      fetchCalendar();
      console.log("[*Refetching my calendar*]");
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
        start,
        end,
      }}
    >
      <ActionsContext.Provider
        value={{
          setEvents,
          setRefetch,
          setStart,
          setEnd,
        }}
      >
        {children}
      </ActionsContext.Provider>
    </ViewContext.Provider>
  );
};

export default CalendarDataProvider;
export { ViewContext, ActionsContext };
