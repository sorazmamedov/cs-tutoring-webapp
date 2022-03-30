import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        !auth?.user
        ? <Navigate to="/" state={{ from: location }} replace />
        : auth?.user.roles.find(role => allowedRoles?.includes(role))
          ? <Outlet />
          : <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
}

export default RequireAuth;