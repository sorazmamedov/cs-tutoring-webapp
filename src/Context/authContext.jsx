import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const ROLES = {
    User: 2017,
    Tutor: 1988,
    Admin: 1960,
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, ROLES }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
