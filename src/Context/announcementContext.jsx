import React, { createContext, useState, useEffect, useContext } from "react";
import { compareDesc } from "date-fns";
import useAxios from "../hooks/useAxios";
import { GlobalViewContext } from "./dataContext";
import useAuth from "../hooks/useAuth";

const ViewContext = createContext({});
const ActionsContext = createContext({});

const AnnouncementDataProvider = ({ children }) => {
  const { auth, ROLES } = useAuth();
  const { loadedSemester, darkTheme } = useContext(GlobalViewContext);
  const { data, error, loading, axiosFetch } = useAxios();
  const [announcements, setAnnouncements] = useState([]);
  const [current, setCurrent] = useState("");

  const fetchAnnouncements = () => {
    axiosFetch({
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
    const temp = data
      .map((item) => ({ ...item, createdOn: new Date(item.createdOn) }))
      .sort((a, b) => compareDesc(a.createdOn, b.createdOn));
    setAnnouncements(temp);
  }, [data]);

  return (
    <ViewContext.Provider
      value={{
        announcements,
        loadedSemester,
        auth,
        ROLES,
        error,
        loading,
        darkTheme
      }}
    >
      <ActionsContext.Provider
        value={{
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
