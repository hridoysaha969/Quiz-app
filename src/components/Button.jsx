import PropTypes from "prop-types";
import classes from "../assets/button.module.css";

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.any,
  onClickOut: PropTypes.func,
};

function Button({ className, children, ...rest }) {
  return (
    <button className={`${classes.button} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
