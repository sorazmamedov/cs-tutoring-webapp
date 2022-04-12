import React, { createContext, useState, useEffect, useContext } from "react";
import useAxios from "../hooks/useAxios";
import { GlobalViewContext } from "./dataContext";
import useAuth from "../hooks/useAuth";

const ViewContext = createContext({});
const ActionsContext = createContext({});

const TutorDataProvider = ({ children }) => {
  const { auth, ROLES, signingIn } = useAuth();
  const { loadedSemester } = useContext(GlobalViewContext);
  const { data, error, loading, axiosFetch } = useAxios();
  const [tutors, setTutors] = useState([]);
  const [current, setCurrent] = useState("");

  const fetchTutors = () => {
    axiosFetch({
      method: "GET",
      url: "/users",
      requestConfig: {
        params: { semesterId: loadedSemester.id, role: ROLES.Tutor },
      },
    });
  };

  useEffect(() => {
    if (loadedSemester.id && current !== loadedSemester.id) {
      setCurrent(loadedSemester.id);
      fetchTutors();
      console.log("[Fetching tutors]");
    }
    // eslint-disable-next-line
  }, [loadedSemester]);

  useEffect(() => {
    setTutors([...data]);
  }, [data]);

  return (
    <ViewContext.Provider
      value={{
        tutors,
        error,
        loading,
        loadedSemester,
        auth,
        ROLES,
        signingIn,
      }}
    >
      <ActionsContext.Provider
        value={{
          setTutors,
        }}
      >
        {children}
      </ActionsContext.Provider>
    </ViewContext.Provider>
  );
};

export default TutorDataProvider;
export { ViewContext, ActionsContext };
