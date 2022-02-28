import { createContext, useState } from "react";

const GlobalViewContext = createContext({});
const GlobalActionsContext = createContext({});

const DataProvider = ({ children }) => {
  const [loadedSemester, setLoadedSemester] = useState({
    id: "jzGiHw3J3WMI",
    semesterName: "Spring",
    academicYear: 2022,
    startDate: 1642744800000,
    endDate: 1652158800000,
    active: true,
  });

  return (
    <GlobalViewContext.Provider
      value={{
        loadedSemester,
      }}
    >
      <GlobalActionsContext.Provider
        value={{
          setLoadedSemester,
        }}
      >
        {children}
      </GlobalActionsContext.Provider>
    </GlobalViewContext.Provider>
  );
};

export default DataProvider;
export { GlobalViewContext, GlobalActionsContext };
