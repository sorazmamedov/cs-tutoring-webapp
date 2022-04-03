import useAuth from "./useAuth";
import axios from "axios";
import { getErrors } from "../components/common/errorHelper";

const useLogin = () => {
  const { errors, setErrors, loading, setLoading, setAuth } = useAuth();

  const handleResponse = async (response) => {
    setLoading(true);
    setErrors({});

    try {
      const token = response.credential;
      const res = await axios({
        method: "get",
        baseURL: "http://localhost:4000/api/auth/login",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setAuth((prev) => ({ ...prev, token, user: res.data }));
    } catch (error) {
      if (error?.response) {
        setErrors(getErrors(error.response));
      } else {
        setErrors(getErrors(error));
      }
    } finally {
      setLoading(false);
    }
  };

  return { errors, loading, handleResponse };
};

export default useLogin;
