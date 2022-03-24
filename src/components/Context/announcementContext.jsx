import { createContext, useState, useEffect, useContext } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "../../apis/cs-tutoring";
import { GlobalViewContext } from "./dataContext";

const ViewContext = createContext({});
const ActionsContext = createContext({});

const AnnouncementDataProvider = ({ children }) => {
  const { loadedSemester, admin } = useContext(GlobalViewContext);
  const [data, error, loading, axiosFetch] = useAxios();
  const [announcements, setAnnouncements] = useState([]);
  const [show, setShow] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [title, setTitle] = useState("");
  const [current, setCurrent] = useState("");
  const reset = () => {
    setShow(false);
    setTitle("");
    setModalBody("");
  };

  const fetchAnnouncements = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/announcements",
      requestConfig: { params: { semesterId: loadedSemester.id } },
    });
  };

  useEffect(() => {
    if (loadedSemester.id && current !== loadedSemester.id) {
      setCurrent(loadedSemester.id);
      fetchAnnouncements();
      console.log("[Fetching announcements]");
    }

    // eslint-disable-next-line
  }, [loadedSemester]);

  useEffect(() => {
    setAnnouncements([...data]);
  }, [data]);

  return (
    <ViewContext.Provider
      value={{
        show,
        title,
        modalBody,
        announcements,
        loadedSemester,
        admin,
        error,
        loading,
        reset,
      }}
    >
      <ActionsContext.Provider
        value={{
          setShow,
          setTitle,
          setModalBody,
          setAnnouncements,
        }}
      >
        {children}
      </ActionsContext.Provider>
    </ViewContext.Provider>
  );
};

export default AnnouncementDataProvider;
export { ViewContext, ActionsContext };
