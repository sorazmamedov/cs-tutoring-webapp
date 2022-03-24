import { createContext, useState, useEffect, useContext } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "../../apis/cs-tutoring";
import { GlobalViewContext } from "./dataContext";

const ViewContext = createContext({});
const ActionsContext = createContext({});

const CalendarDataProvider = ({ children }) => {
  const { loadedSemester, admin } = useContext(GlobalViewContext);
  const [data, error, loading, axiosFetch] = useAxios();
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [title, setTitle] = useState("");
  const [current, setCurrent] = useState("");
  const [refetch, setRefetch] = useState(false);
  const reset = () => {
    setShow(false);
    setTitle("");
    setModalBody("");
  };

  const fetchCalendar = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/calendars",
      requestConfig: {
        params: { semesterId: loadedSemester.id, tutorId: "123456789123" },
      },
    });
  };

  useEffect(() => {
    if (loadedSemester.id && current !== loadedSemester.id) {
      setCurrent(loadedSemester.id);
      fetchCalendar();
      console.log("[Fetching calendar events]");
    } else if (refetch) {
      setRefetch(false);
      fetchCalendar();
      console.log("[*Refetching calendar events*]");
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
        show,
        title,
        modalBody,
        events,
        error,
        loading,
        loadedSemester,
        admin,
        reset,
      }}
    >
      <ActionsContext.Provider
        value={{
          setShow,
          setTitle,
          setModalBody,
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
