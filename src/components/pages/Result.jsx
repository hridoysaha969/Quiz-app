import _ from "lodash";
import { useLocation, useParams } from "react-router-dom";
import useAnswers from "../../hooks/useAnswers";
import Analysis from "../Analysis";
import Summary from "../Summary";

function Result() {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state;
  const { qna } = state;

  const { loading, error, answers } = useAnswers(id);

  function calculate() {
    let score = 0;

    answers.forEach((question, ind1) => {
      let correctIndexes = [],
        checkedIndexes = [];

      question.options.forEach((option, ind2) => {
        if (option.correct) correctIndexes.push(ind2);
        if (qna[ind1].options[ind2].checked) {
          checkedIndexes.push(ind2);
          option.checked = true;
        }
      });

      if (_.isEqual(correctIndexes, checkedIndexes)) {
        score = score + 5;
      }
    });

    return score;
  }
  const userScore = calculate();

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}

      {answers && answers.length > 0 && (
        <>
          <Summary score={userScore} noq={answers.length} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  );
}

export default Result;
