import PropTypes from "prop-types";
import classes from "../assets/analysis.module.css";
import Questions from "./Questions";

Analysis.propTypes = {
  answers: PropTypes.any,
};

function Analysis({ answers }) {
  return (
    <div className={classes.analysis}>
      <h1>Question Analysis</h1>

      <Questions answers={answers} />
    </div>
  );
}

export default Analysis;
