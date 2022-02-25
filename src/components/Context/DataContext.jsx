import { createContext, useState } from "react";

const GlobalViewContext = createContext({});
const GlobalActionsContext = createContext({});

const DataProvider = ({ children }) => {
  const [loadedSemesterId, setLoadedSemesterId] = useState("");

  return (
    <GlobalViewContext.Provider
      value={{
        loadedSemesterId,
      }}
    >
      <GlobalActionsContext.Provider
        value={{
          setLoadedSemesterId,
        }}
      >
        {children}
      </GlobalActionsContext.Provider>
    </GlobalViewContext.Provider>
  );
};

export default DataProvider;
export { GlobalViewContext, GlobalActionsContext };
