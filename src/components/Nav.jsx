// import React from "react";
import { NavLink } from "react-router-dom";
import classes from "../assets/nav.module.css";
import logo from "../images/logo.png";
import Account from "./Account";

const Nav = () => {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <NavLink to="/" className={classes.brand}>
            <img src={logo} alt="Learn with Sumit Logo" />
            <h3>Born to Code</h3>
          </NavLink>
        </li>
      </ul>
      <Account />
    </nav>
  );
};

export default Nav;
