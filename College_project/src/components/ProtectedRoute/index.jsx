import { Outlet } from "react-router-dom";
import { isAuthenticated, checkpermission } from "../../utils";
import { Navigate } from "react-router-dom";

//is token valid aarkum /home or something adich aa page acces chyan patila&& is the route have permission(route=doctor or user)
const ProtectedRoute = ({ roles }) => {
  return isAuthenticated() && checkpermission(roles) ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
