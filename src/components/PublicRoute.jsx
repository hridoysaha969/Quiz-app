import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/authContextHook";

PublicRoute.propTypes = {
  children: PropTypes.any,
  redirectTo: PropTypes.any,
  onClickOut: PropTypes.func,
};

function PublicRoute({ children, redirectTo }) {
  const { currentUser } = useAuth();

  return !currentUser ? children : <Navigate to={redirectTo} />;
}

export default PublicRoute;
