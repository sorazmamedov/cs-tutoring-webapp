import { useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";
import { getErrors } from "../components/common/errorHelper";

const useLogout = () => {
  const { errors, setErrors, loading, setLoading, auth, setAuth } =
    useAuth();

  const handleLogout = async () => {
    setLoading(true);

    if (Object.keys(errors).length > 0) {
      setErrors({});
    }

    try {
      const res = await axios({
        method: "get",
        baseURL: "http://localhost:4000/api/auth/logout",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setAuth({});
    } catch (error) {
      console.log(error);
      if (error?.response) {
        setErrors(getErrors(error.response));
      } else {
        setErrors(getErrors(error));
      }
    } finally {
      setLoading(false);
    }
  };

  return { errors, loading, handleLogout, auth };
};

export default useLogout;
