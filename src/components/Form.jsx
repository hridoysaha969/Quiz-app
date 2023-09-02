import PropTypes from "prop-types";
import classes from "../assets/form.module.css";

Form.propTypes = {
  children: PropTypes.any,
  className: PropTypes.any,
  onClickOut: PropTypes.func,
};

function Form({ children, className, ...rest }) {
  return (
    <form className={`${className} ${classes.form}`} {...rest}>
      {children}
    </form>
  );
}

export default Form;
