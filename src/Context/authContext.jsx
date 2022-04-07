import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [errors, setErrors] = useState({});
  const [signingIn, setSigningIn] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
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
        signingIn,
        setSigningIn,
        signingOut,
        setSigningOut,
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
