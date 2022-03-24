import { createContext, useState, useEffect, useContext } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "../../apis/cs-tutoring";
import { GlobalViewContext } from "./dataContext";

const ViewContext = createContext({});
const ActionsContext = createContext({});

const CourseDataProvider = ({ children }) => {
  const { loadedSemester, admin } = useContext(GlobalViewContext);
  const [data, error, loading, axiosFetch] = useAxios();
  const [courses, setCourses] = useState([]);
  const [show, setShow] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [title, setTitle] = useState("");
  const [current, setCurrent] = useState("");
  const reset = () => {
    setShow(false);
    setTitle("");
    setModalBody("");
  };

  const fetchCourses = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/courses",
      requestConfig: {
        params: { semesterId: loadedSemester.id },
      },
    });
  };

  useEffect(() => {
    if (loadedSemester.id && current !== loadedSemester.id) {
      setCurrent(loadedSemester.id);
      fetchCourses();
      console.log("[Fetching courses]");
    }
    // eslint-disable-next-line
  }, [loadedSemester]);

  useEffect(() => {
    setCourses([...data]);
  }, [data]);

  return (
    <ViewContext.Provider
      value={{
        show,
        title,
        modalBody,
        courses,
        admin,
        loadedSemester,
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
          setCourses,
        }}
      >
        {children}
      </ActionsContext.Provider>
    </ViewContext.Provider>
  );
};

export default CourseDataProvider;
export { ViewContext, ActionsContext };
