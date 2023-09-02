// import React from 'react'
import { NavLink } from "react-router-dom";
import classes from "../assets/account.module.css";
import { useAuth } from "../hooks/authContextHook";

const Account = () => {
  const { currentUser, logout } = useAuth();
  return (
    <div className={classes.account}>
      {currentUser ? (
        <>
          <NavLink to="/">
            <span className="material-icons-outlined" title="Account">
              home
            </span>
          </NavLink>
          <span>{currentUser.displayName}</span>
          <span
            className="material-icons-outlined"
            title="Logout"
            onClick={logout}
          >
            logout
          </span>
        </>
      ) : (
        <>
          <NavLink to="/signup">Signup</NavLink>
          <NavLink to="/login">Login</NavLink>
        </>
      )}
    </div>
  );
};

export default Account;
