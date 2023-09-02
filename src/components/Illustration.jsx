import classes from "../assets/illustration.module.css";
import signupImage from "../images/login.svg";

function Illustration() {
  return (
    <div className={classes.illustration}>
      <img src={signupImage} alt="Signup" />
    </div>
  );
}

export default Illustration;
