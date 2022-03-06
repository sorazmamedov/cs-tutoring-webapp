import { createContext, useState } from "react";

const ViewContext = createContext({});
const ActionsContext = createContext({});

const CourseDataProvider = ({ children }) => {
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

  return (
    <ViewContext.Provider
      value={{
        show,
        title,
        modalBody,
        courses,
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
