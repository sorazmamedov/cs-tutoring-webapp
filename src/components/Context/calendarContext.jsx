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
  const handleReset = () => {
    setShow(false);
    setTitle("");
    setModalBody("");
  };

  const [reset] = useState(() => handleReset);

  const fetchCalendar = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/calendars",
      requestConfig: {
        params: { semesterId: loadedSemester.id },
      },
    });
  };

  useEffect(() => {
    if (loadedSemester.id && current !== loadedSemester.id) {
      setCurrent(loadedSemester.id);
      fetchCalendar();
      console.log("[Fetching slots]");
    }
    // eslint-disable-next-line
  }, [loadedSemester]);

  useEffect(() => {
    setEvents([...data]);
  }, [data]);

  return (
    <ViewContext.Provider
      value={{
        show,
        title,
        modalBody,
        slots: events,
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
          setSlots: setEvents,
        }}
      >
        {children}
      </ActionsContext.Provider>
    </ViewContext.Provider>
  );
};

export default CalendarDataProvider;
export { ViewContext, ActionsContext };
