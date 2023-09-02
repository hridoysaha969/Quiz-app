import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/authContextHook";
import useQuestions from "../../hooks/useQuestions";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer": {
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;

      return questions;
    }
    default:
      return state;
  }
};

function Quiz() {
  const { id } = useParams();
  const { loading, error, questions } = useQuestions(id);
  const [currQuestion, setCurrQuestion] = useState(0);
  const [qna, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  // const location = useLocation();
  // const state = location.state;

  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  function handleAnswerChange(e, index) {
    dispatch({
      type: "answer",
      questionID: currQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }

  // handle when user clicks the next button to get the next question
  function nextQuestion() {
    if (currQuestion + 1 < questions.length) {
      setCurrQuestion((prevCurrent) => prevCurrent + 1);
    }
  }

  // handle when user clicks the prev button to get back to the previous question
  function prevQuestion() {
    if (currQuestion >= 1 && currQuestion <= questions.length) {
      setCurrQuestion((prevCurrent) => prevCurrent - 1);
    }
  }

  // calculate percentage of progress
  const percentage =
    questions.length > 0 ? ((currQuestion + 1) / questions.length) * 100 : 0;

  // submit function
  async function submit() {
    const { uid } = currentUser;

    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    await set(resultRef, {
      [id]: qna,
    });
    navigate(`/result/${id}`, {
      state: {
        qna: qna,
      },
    });
  }

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error</div>}

      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>

          <Answers
            input
            options={qna[currQuestion].options}
            handleChange={handleAnswerChange}
          />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            submit={submit}
            progress={percentage}
          />
          <MiniPlayer id={id} title={qna[currQuestion].title} />
        </>
      )}
    </>
  );
}

export default Quiz;
