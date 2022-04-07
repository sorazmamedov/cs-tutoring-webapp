import useAuth from "./useAuth";
import axios from "../apis/cs-tutoring";
import { getErrors } from "../components/common/errorHelper";

const useLogin = () => {
  const { errors, setErrors, signingIn, setSigningIn, setAuth } = useAuth();

  const handleResponse = async (response) => {
    setSigningIn(true);
    setErrors({});

    try {
      const token = response.credential;
      const res = await axios({
        method: "get",
        url: "/auth/login",
        headers: {
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
      setSigningIn(false);
    }
  };

  return { errors, signingIn, handleResponse };
};

export default useLogin;
