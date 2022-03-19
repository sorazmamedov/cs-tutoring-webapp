import { useEffect } from "react";
import { createContext, useState, useContext } from "react";
import axios from "../../apis/cs-tutoring";
import useAxios from "../../hooks/useAxios";
import {
  GlobalViewContext,
  GlobalActionsContext,
} from "../Context/dataContext";

const ViewContext = createContext({});
const ActionsContext = createContext({});

const SemesterDataProvider = ({ children }) => {
  const { loadedSemester } = useContext(GlobalViewContext);
  const { setLoadedSemester } = useContext(GlobalActionsContext);
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
        loadedSemester,
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
          setLoadedSemester,
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
