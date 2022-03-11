import React, { createContext, useState, useEffect, useContext } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "../../apis/cs-tutoring";
import { GlobalViewContext } from "./dataContext";

const ViewContext = createContext({});
const ActionsContext = createContext({});

const TutorDataProvider = ({ children }) => {
  const { loadedSemester } = useContext(GlobalViewContext);
  const [data, error, loading, axiosFetch] = useAxios();
  const [tutors, setTutors] = useState([
    // {
    //   id: "wx-nWZPAX1TC",
    //   neiuId: 123563,
    //   firstName: "John",
    //   lastName: "Monroe",
    //   email: "jmonroe@neiu.edu",
    //   about:
    //     "Some lorem ipsum and some more Some lorem ipsum and Some lorem ipsum",
    // },
    // {
    //   id: "2ZXHi4q7J_9m",
    //   neiuId: 777777,
    //   firstName: "Martin",
    //   lastName: "King",
    //   email: "mking@neiu.edu",
    //   about: "From California",
    // },
    // {
    //   id: "Zt5_isRtMR10",
    //   neiuId: 789456,
    //   firstName: "Brook",
    //   lastName: "Beckham",
    //   email: "bbeckhamasdad@neiu.edu",
    //   about: "From London",
    // },
    // {
    //   id: "0gtY1ZHfxsyb",
    //   neiuId: 676877,
    //   firstName: "Jennifer",
    //   lastName: "Monroe",
    //   email: "jmonroe@neiu.edu",
    //   about: "From NYC",
    // },
    // {
    //   id: "fWkdyv20bLQw",
    //   neiuId: 784878,
    //   firstName: "Madelyn",
    //   lastName: "Katowski",
    //   email: "mkatowski@neiu.edu",
    //   about: "From Idaho",
    // },
    // {
    //   id: "aKpdLEo4EG6y",
    //   neiuId: 789456,
    //   firstName: "Brook",
    //   lastName: "Beckham",
    //   email: "bbeckham@neiu.edu",
    //   about: "From London",
    // },
    // {
    //   id: "CiBK_33uD81s",
    //   neiuId: 789456,
    //   firstName: "Scarlett",
    //   lastName: "Moe",
    //   email: "smoe@neiu.edu",
    //   about: "From Pensylvania",
    // },
  ]);

  const [show, setShow] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [title, setTitle] = useState("");

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
      requestConfig: {},
    });
  };

  useEffect(() => {
    if (loadedSemester?.id) {
      fetchTutors();
      console.log("[Fetching tutors]");
    }
    // eslint-disable-next-line
  }, [loadedSemester]);

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      setTutors([...data]);
    }
  }, [data]);

  return (
    <ViewContext.Provider
      value={{
        show,
        title,
        modalBody,
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
