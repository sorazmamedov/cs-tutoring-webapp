import { createContext, useState } from "react";

const ViewContext = createContext({});
const ActionsContext = createContext({});

const SemesterDataProvider = ({ children }) => {
  //Semesters
  const [semesters, setSemesters] = useState([
    {
      id: "QGngtrqEGS2L",
      semesterName: "Spring",
      academicYear: 2021,
      startDate: 1629954000000,
      endDate: 1639461600000,
      active: true,
    },
    {
      id: "Pp9NItWifwKW",
      semesterName: "Fall",
      academicYear: 2021,
      startDate: 1629954000000,
      endDate: 1639461600000,
      active: false,
    },
    {
      id: "riO9WNrTkOOu",
      semesterName: "Summer",
      academicYear: 2022,
      startDate: 1653541200000,
      endDate: 1660453200000,
      active: false,
    },
    {
      id: "8OZm4MkQWQdU",
      semesterName: "Fall",
      academicYear: 2022,
      startDate: 1653541200000,
      endDate: 1664453200000,
      active: false,
    },
    {
      id: "jzGiHw3J3WMI",
      semesterName: "Spring",
      academicYear: 2022,
      startDate: 1642744800000,
      endDate: 1652158800000,
      active: true,
    },
    {
      id: "8OZm4MkQWQdp",
      semesterName: "Spring",
      academicYear: 2023,
      startDate: 1673762400000,
      endDate: 1676762400000,
      active: false,
    },
    {
      id: "8OZm4MkQWQdz",
      semesterName: "Summer",
      academicYear: 2023,
      startDate: 1673762400000,
      endDate: 1679762400000,
      active: false,
    },
    {
      id: "8OZm4MkQWQdw",
      semesterName: "Summer",
      academicYear: 2024,
      startDate: 1715749200000,
      endDate: 1719949200000,
      active: false,
    },
  ]);

  //Modal
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [editSemesterId, setEditSemesterId] = useState("");

  const handleReset = () => {
    console.log("Semester Resetting....");
    setShow(false);
    setModalBody("");
    setTitle("");
    setEditSemesterId("");
  };

  const [reset] = useState(() => handleReset);

  return (
    <ViewContext.Provider
      value={{
        show,
        title,
        modalBody,
        editSemesterId,
        semesters,
        reset,
      }}
    >
      <ActionsContext.Provider
        value={{
          setShow,
          setTitle,
          setModalBody,
          setEditSemesterId,
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
