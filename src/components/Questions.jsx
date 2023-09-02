import PropTypes from "prop-types";
import classes from "../assets/question.module.css";
import Answers from "./Answers";

Question.propTypes = {
  answers: PropTypes.any,
};

function Question({ answers = [] }) {
  return answers.map((answer, ind) => (
    <div className={classes.question} key={ind}>
      <div className={classes.qtitle}>
        <span className="material-icons-outlined"> help_outline </span>
        {answer.title}
      </div>

      <Answers input={false} options={answer.options} />
    </div>
  ));
}

export default Question;
