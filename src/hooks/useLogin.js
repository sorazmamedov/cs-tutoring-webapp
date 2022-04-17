import useAuth from "./useAuth";
import axios from "../apis/cs-tutoring";
import { getErrors } from "../components/common/errorHelper";

const useLogin = () => {
  const { errors, setErrors, signingIn, setSigningIn, setAuth } = useAuth();

  const handleResponse = async (response, email) => {
    setSigningIn(true);
    setErrors({});

    try {
      let token;
      if (email) {
        const res = await axios({
          method: "get",
          url: "/auth/login",
          headers: {
            Authorization: `Bearer ${email}`,
          },
          withCredentials: true,
        });

        setAuth((prev) => ({ ...prev, token: email, user: res.data }));
      } else if (!sessionStorage.getItem("token")) {
        token = response.credential;
        const res = await axios({
          method: "get",
          url: "/auth/login",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setAuth((prev) => ({ ...prev, token, user: res.data }));
        sessionStorage.setItem("token", token);
      } else {
        const res = await axios({
          method: "get",
          url: "/auth/login",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          withCredentials: true,
        });

        setAuth((prev) => ({
          ...prev,
          token: sessionStorage.getItem("token"),
          user: res.data,
        }));
      }
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
