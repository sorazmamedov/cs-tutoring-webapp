import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "../../apis/cs-tutoring";
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
  const [currentSemester, setCurrentSemester] = useState(null);
  const [edit, setEdit] = useState(false);

  const handleReset = () => {
    setShow(false);
    setModalBody("");
    setTitle("");
    setEdit(false);
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
    console.log("Setting up semesters");
    fetchSemesters();
  }, []);

  useEffect(() => {
    // setTimeout(() => {
    //   if (data.length !== 0) {
    //   }
    // }, 5000);

    console.log("==============Semesters Context=============");
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
        }}
      >
        {children}
      </ActionsContext.Provider>
    </ViewContext.Provider>
  );
};

export default SemesterDataProvider;
export { ViewContext, ActionsContext };
