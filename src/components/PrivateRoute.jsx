import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/authContextHook";

PrivateRoute.propTypes = {
  children: PropTypes.any,
  redirectTo: PropTypes.any,
  onClickOut: PropTypes.func,
};

function PrivateRoute({ children, redirectTo }) {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to={redirectTo} />;
}

export default PrivateRoute;
