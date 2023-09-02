import PropTypes from "prop-types";

CheckBox.propTypes = {
  className: PropTypes.any,
  text: PropTypes.any,
  onClickOut: PropTypes.func,
};

function CheckBox({ className, text, ...rest }) {
  return (
    <label className={className}>
      <input type="checkbox" {...rest} />
      <span> {text}</span>
    </label>
  );
}

export default CheckBox;
