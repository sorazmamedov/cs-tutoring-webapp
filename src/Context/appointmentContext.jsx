import React, { createContext, useState, useEffect, useContext } from "react";
import useAxios from "../hooks/useAxios";
import { GlobalViewContext } from "./dataContext";
import useAuth from "../hooks/useAuth";

const ViewContext = createContext({});
const ActionsContext = createContext({});

const AppointmentDataProvider = ({ children }) => {
  const { auth, ROLES, signingIn } = useAuth();
  const { loadedSemester, darkTheme } = useContext(GlobalViewContext);
  const { data, error, loading, axiosFetch } = useAxios();
  const [appointments, setAppointments] = useState([]);
  const [current, setCurrent] = useState("");
  const [refetch, setRefetch] = useState(false);

  const fetchAppointments = () => {
    axiosFetch({
      method: "GET",
      url: `/users/${auth?.user?.id}/appointments`,
      requestConfig: {
        params: { semesterId: loadedSemester.id },
      },
    });
  };

  useEffect(() => {
    if (loadedSemester.id && current !== loadedSemester.id) {
      setCurrent(loadedSemester.id);
      fetchAppointments();
      console.log("[Fetching appointments]");
    } else if (refetch) {
      setRefetch(false);
      fetchAppointments();
      console.log("[*Refetching appointments*]");
    }
    // eslint-disable-next-line
  }, [loadedSemester, refetch]);

  useEffect(() => {
    if (data) {
      const arr = data.map((item) => {
        return {
          ...item,
          start: new Date(item.start),
          end: new Date(item.end),
        };
      });
      setAppointments(arr);
    }
  }, [data]);

  return (
    <ViewContext.Provider
      value={{
        appointments,
        loadedSemester,
        auth,
        ROLES,
        signingIn,
        error,
        loading,
        darkTheme,
      }}
    >
      <ActionsContext.Provider
        value={{
          setAppointments,
          setRefetch,
        }}
      >
        {children}
      </ActionsContext.Provider>
    </ViewContext.Provider>
  );
};

export default AppointmentDataProvider;
export { ViewContext, ActionsContext };
