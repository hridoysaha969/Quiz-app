import PropTypes from "prop-types";
import { Fragment } from "react";
import classes from "../assets/answers.module.css";
import CheckBox from "./CheckBox";

Answers.propTypes = {
  options: PropTypes.any,
  input: PropTypes.any,
  handleChange: PropTypes.func,
};

function Answers({ options = [], handleChange, input }) {
  return (
    <div className={classes.answers}>
      {options.map((option, ind) => (
        <Fragment key={ind}>
          {input ? (
            <CheckBox
              key={ind}
              className={classes.answer}
              text={option.title}
              value={ind}
              checked={option.checked}
              onChange={(e) => handleChange(e, ind)}
            />
          ) : (
            <CheckBox
              key={ind}
              className={`${classes.answer} ${
                option.correct
                  ? classes.correct
                  : option.checked
                  ? classes.wrong
                  : null
              }`}
              text={option.title}
              defaultChecked={option.checked}
              disabled
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default Answers;
