import PropTypes from "prop-types";
import classes from "../assets/video.module.css";

Video.propTypes = {
  title: PropTypes.any,
  id: PropTypes.any,
  noq: PropTypes.any,
  onClickOut: PropTypes.func,
};

function Video({ title, id, noq }) {
  return (
    <div className={classes.video}>
      <img
        src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
        alt={title}
      />
      <p>{title}</p>
      <div className={classes.qmeta}>
        <p>{noq} Questions</p>
        <p>Total points : {noq * 5}</p>
      </div>
    </div>
  );
}

export default Video;
