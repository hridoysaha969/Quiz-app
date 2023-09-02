import PropTypes from "prop-types";
import classes from "../assets/textInput.module.css";

TextInput.propTypes = {
  children: PropTypes.any,
  icon: PropTypes.any,
  onClickOut: PropTypes.func,
};

function TextInput({ icon, ...rest }) {
  return (
    <div className={classes.textInput}>
      <input {...rest} />
      <span className="material-icons-outlined"> {icon} </span>
    </div>
  );
}

export default TextInput;
