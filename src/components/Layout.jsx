import PropTypes from "prop-types";
import classes from "../assets/layout.module.css";
import Nav from "./Nav";

Layout.propTypes = {
  children: PropTypes.any,
  onClickOut: PropTypes.func,
};

function Layout({ children }) {
  return (
    <>
      <Nav />
      <main className={classes.main}>
        <div className={classes.container}>{children}</div>
      </main>
    </>
  );
}

export default Layout;
