import { createContext, useState } from "react";

const ViewContext = createContext({});
const ActionsContext = createContext({});

const CourseDataProvider = ({ children }) => {
  const [courses, setCourses] = useState([
    {
      id: "OmI7h-JiesTo",
      courseCode: "CS-324-1",
      courseName: "Algorithms",
      semesterId: "Pp9NItWifwKW",
      instructorName: "Peter Kimmel",
      instructorEmail: "pkimmel@neiu.edu",
    },
    {
      id: "OhKh3ClzPv-y",
      courseCode: "CS-400-2",
      courseName: "Discrete Structures",
      semesterId: "Pp9NItWifwKW",
      instructorName: "Rachel Trana",
      instructorEmail: "rtrana@neiu.edu",
    },
    {
      id: "QCYy5AGrKZrl",
      courseCode: "CS-442",
      courseName: "Network",
      semesterId: "Pp9NItWifwKW",
      instructorName: "TBA",
      instructorEmail: "TBA@neiu.edu",
    },
    {
      id: "U5NsuHEmMxds",
      courseCode: "CS-442",
      courseName: "Operating Systems",
      semesterId: "Pp9NItWifwKW",
      instructorName: "TBA",
      instructorEmail: "TBA@neiu.edu",
    },
    {
      id: "ZQAd_NT9e8Pk",
      courseCode: "CS-442",
      courseName: "Game Theory",
      semesterId: "Pp9NItWifwKW",
      instructorName: "TBA",
      instructorEmail: "TBA@neiu.edu",
    },
    {
      id: "US0g_IJcyYWj",
      courseCode: "CS-442",
      courseName: "Java Mastery",
      semesterId: "Pp9NItWifwKW",
      instructorName: "TBA",
      instructorEmail: "TBA@neiu.edu",
    },
    {
      id: "KY9V4BrBTiSV",
      courseCode: "CS-442",
      courseName: "Front-End Development",
      semesterId: "Pp9NItWifwKW",
      instructorName: "TBA",
      instructorEmail: "TBA@neiu.edu",
    },
    {
      id: "VrveAvVNT_7h",
      courseCode: "CS-442",
      courseName: "Data Mining",
      semesterId: "Pp9NItWifwKW",
      instructorName: "TBA",
      instructorEmail: "TBA@neiu.edu",
    },
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
