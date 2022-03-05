import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "../../apis/cs-tutoring/cs-tutoring";
import useAxios from "../../hooks/useAxios";

const ViewContext = createContext({});
const ActionsContext = createContext({});

const SemesterDataProvider = ({ children }) => {
  const [data, error, loading, axiosFetch] = useAxios();

  //Semesters
  const [semesters, setSemesters] = useState([]);

  //Modal
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [currentSemester, setCurrentSemester] = useState({});
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState("");

  const handleReset = () => {
    setShow(false);
    setModalBody("");
    setTitle("");
    setEdit(false);
    setMessage("");
  };

  const [reset] = useState(() => handleReset);

  const fetchSemesters = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/semesters",
      requestConfig: {},
    });
  };

  useEffect(() => {
    fetchSemesters();
    console.log("[Fetching semesters]");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setSemesters([...data]);
  }, [data]);

  return (
    <ViewContext.Provider
      value={{
        show,
        title,
        modalBody,
        semesters,
        currentSemester,
        edit,
        reset,
        error,
        loading,
        message,
      }}
    >
      <ActionsContext.Provider
        value={{
          setShow,
          setTitle,
          setModalBody,
          setCurrentSemester,
          setEdit,
          setSemesters,
          setMessage,
        }}
      >
        {children}
      </ActionsContext.Provider>
    </ViewContext.Provider>
  );
};

export default SemesterDataProvider;
export { ViewContext, ActionsContext };
