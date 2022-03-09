import { createContext, useState, useEffect, useContext } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "../../apis/cs-tutoring";
import { GlobalViewContext } from "./dataContext";

const ViewContext = createContext({});
const ActionsContext = createContext({});

const CourseDataProvider = ({ children }) => {
  const { loadedSemester } = useContext(GlobalViewContext);
  const [data, error, loading, axiosFetch] = useAxios();
  const [courses, setCourses] = useState([]);
  const [show, setShow] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [title, setTitle] = useState("");

  const handleReset = () => {
    setShow(false);
    setTitle("");
    setModalBody("");
  };

  const [reset] = useState(() => handleReset);

  const fetchData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/courses",
      requestConfig: {},
    });
  };

  useEffect(() => {
    fetchData();
    console.log("[Fetching courses]");
    // eslint-disable-next-line
  }, [loadedSemester]);

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      setCourses([...data]);
    }
  }, [data]);

  return (
    <ViewContext.Provider
      value={{
        show,
        title,
        modalBody,
        courses,
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
