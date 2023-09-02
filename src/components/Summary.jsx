import PropTypes from "prop-types";
import classes from "../assets/summary.module.css";
import useFetch from "../hooks/useFetch";
import successImage from "../images/success.png";

Summary.propTypes = {
  score: PropTypes.any,
  noq: PropTypes.any,
};

function Summary({ score, noq }) {
  const getKeyword = () => {
    if ((score / (noq * 5)) * 100 < 50) {
      return "failed";
    } else if ((score / (noq * 5)) * 100 < 75) {
      return "good";
    } else if ((score / (noq * 5)) * 100 < 100) {
      return "thumbs-up";
    } else {
      return "excellent";
    }
  };
  const url = `https://api.pexels.com/v1/search?query=${getKeyword()}&per_page=1`;
  const { loading, error, result } = useFetch(url, "GET", {
    Authorization: import.meta.env.VITE_PIXEL_API_KEY,
  });

  const image = result ? result?.photos[0].src.medium : successImage;

  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        {/* progress bar will be placed here */}
        <p className={classes.score}>
          Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>

      {loading && <div className={classes.badge}>Badge Loading...</div>}
      {error && <div className={classes.badge}>Something went wrong!</div>}

      {!loading && !error && (
        <div className={classes.badge}>
          <img src={image} alt="Success" />
        </div>
      )}
    </div>
  );
}

export default Summary;
