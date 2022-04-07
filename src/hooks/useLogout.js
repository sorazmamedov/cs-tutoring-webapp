import useAuth from "./useAuth";
import { getErrors } from "../components/common/errorHelper";
import useAxiosPrivate from "./useAxiosPrivate";

const useLogout = () => {
  const axiosPrivate = useAxiosPrivate();
  const { errors, setErrors, loading, setSigningOut, signingOut, auth, setAuth } =
    useAuth();

  const handleLogout = async () => {
    setSigningOut(true);

    if (Object.keys(errors).length > 0) {
      setErrors({});
    }

    try {
      await axiosPrivate({
        method: "get",
        url: "/auth/logout",
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
      setSigningOut(false);
    }
  };

  return { errors, loading, handleLogout, auth, signingOut };
};

export default useLogout;
