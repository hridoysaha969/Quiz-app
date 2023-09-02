import PropTypes from "prop-types";
import { useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import classes from "../assets/miniplayer.module.css";

MiniPlayer.propTypes = {
  id: PropTypes.any,
  title: PropTypes.any,
};

function MiniPlayer({ id, title }) {
  const [status, setStatus] = useState(false);
  const buttonRef = useRef();
  const videoUrl = `https://www.youtube.com/watch?v=${id}`;

  function toogleMiniplayer() {
    if (!status) {
      buttonRef.current.classList.remove(classes.floatingBtn);
      setStatus(true);
    } else {
      buttonRef.current.classList.add(classes.floatingBtn);
      setStatus(false);
    }
  }

  return (
    <div
      className={`${classes.miniPlayer} ${classes.floatingBtn}`}
      ref={buttonRef}
    >
      <span
        className={`material-icons-outlined ${classes.open}`}
        onClick={toogleMiniplayer}
      >
        play_circle_filled
      </span>
      <span
        className={`material-icons-outlined ${classes.close}`}
        onClick={toogleMiniplayer}
      >
        close
      </span>
      <ReactPlayer
        className={classes.player}
        url={videoUrl}
        width="300px"
        height="168px"
        playing={status}
        controls
      />
      <p>{title}</p>
    </div>
  );
}

export default MiniPlayer;
