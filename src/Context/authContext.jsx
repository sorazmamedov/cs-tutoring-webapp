import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const ROLES = {
    User: 2017,
    Tutor: 1988,
    Admin: 1960,
  };

  useEffect(() => {
    if (auth?.user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        errors,
        setErrors,
        loading,
        setLoading,
        isLogged,
        auth,
        setAuth,
        ROLES,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
