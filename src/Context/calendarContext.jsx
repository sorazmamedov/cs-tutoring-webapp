import React, { createContext, useState, useEffect, useContext } from "react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { GlobalViewContext } from "./dataContext";

const ViewContext = createContext({});
const ActionsContext = createContext({});

const CalendarDataProvider = ({ children }) => {
  const { auth } = useAuth()
  const { loadedSemester, darkTheme } = useContext(GlobalViewContext);
  const { data, error, loading, axiosFetch } = useAxios();
  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState("");
  const [refetch, setRefetch] = useState(false);

  const fetchCalendar = () => {
    axiosFetch({
      method: "GET",
      url: `/users/${auth?.user?.id}/calendars`,
      requestConfig: {
        params: { semesterId: loadedSemester.id },
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
        darkTheme
      }}
    >
      <ActionsContext.Provider
        value={{
          setEvents,
          setRefetch,
        }}
      >
        {children}
      </ActionsContext.Provider>
    </ViewContext.Provider>
  );
};

export default CalendarDataProvider;
export { ViewContext, ActionsContext };
