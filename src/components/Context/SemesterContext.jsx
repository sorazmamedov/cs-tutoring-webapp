import { createContext, useState } from "react";

const ViewContext = createContext({});
const ActionsContext = createContext({});

const SemesterDataProvider = ({ children }) => {
  //Semesters
  const [semesters, setSemesters] = useState([
    {
      id: 0,
      semesterName: "Spring",
      academicYear: "2021",
      startDate: "8/26/2021",
      endDate: "12/14/2021",
      active: true,
    },
    {
      id: 1,
      semesterName: "Fall",
      academicYear: "2021",
      startDate: "8/26/2021",
      endDate: "12/14/2021",
      active: false,
    },
    {
      id: 2,
      semesterName: "Spring",
      academicYear: "2022",
      startDate: "1/21/2022",
      endDate: "5/10/2022",
      active: true,
    },
    {
      id: 3,
      semesterName: "Summer",
      academicYear: "2022",
      startDate: "5/26/2022",
      endDate: "8/14/2022",
      active: false,
    },
    {
      id: 4,
      semesterName: "Fall",
      academicYear: "2022",
      startDate: "8/26/2022",
      endDate: "12/14/2022",
      active: false,
    },
    {
      id: 5,
      semesterName: "Spring",
      academicYear: "2023",
      startDate: "1/15/2023",
      endDate: "5/7/2023",
      active: false,
    },
    {
      id: 6,
      semesterName: "Summer",
      academicYear: "2023",
      startDate: "5/15/2023",
      endDate: "8/7/2023",
      active: false,
    },
    {
      id: 7,
      semesterName: "Summer",
      academicYear: "2034",
      startDate: "5/15/2034",
      endDate: "8/7/2034",
      active: false,
    },
  ]);

  //Modal
  const [show, setShow] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [title, setTitle] = useState("");

  //Semester ModalBody
  const handleReset = () => {
    console.log("Semester Resetting....");
    setShow(false);
    setModalBody("");
    setTitle("");
  };

  const [reset] = useState(() => handleReset);

  return (
    <ViewContext.Provider
      value={{
        show,
        modalBody,
        semesters,
        reset,
        title,
      }}
    >
      <ActionsContext.Provider
        value={{
          setShow,
          setModalBody,
          setSemesters,
          setTitle,
        }}
      >
        {children}
      </ActionsContext.Provider>
    </ViewContext.Provider>
  );
};

export default SemesterDataProvider;
export { ViewContext, ActionsContext };
