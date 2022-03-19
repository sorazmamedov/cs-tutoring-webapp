import React, { createContext, useState, useEffect, useContext } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "../../apis/cs-tutoring";
import { GlobalViewContext } from "./dataContext";

const ViewContext = createContext({});
const ActionsContext = createContext({});

const TutorDataProvider = ({ children }) => {
  const { loadedSemester, admin } = useContext(GlobalViewContext);
  const [data, error, loading, axiosFetch] = useAxios();
  const [tutors, setTutors] = useState([]);

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

  const fetchTutors = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/tutors",
      requestConfig: {
        params: { semesterId: loadedSemester.id },
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
        show,
        title,
        modalBody,
        admin,
        tutors,
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
