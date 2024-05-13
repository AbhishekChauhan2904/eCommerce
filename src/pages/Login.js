import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authSelector, userLogin } from "../redux/reducers/authReducer";
import { Tooltip } from "react-tooltip";
export const Login = () => {
  const dispatch = useDispatch();
  const { displayName, isLoggedIn } = useSelector(authSelector);
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const userEmailInput = emailRef.current.value;
    const userPasswordInput = passwordRef.current.value;
    console.log(userEmailInput, userPasswordInput);
    dispatch(userLogin({ userEmailInput, userPasswordInput }));
    navigate(`/`);
  };
  return (
    <div className="loignPage" style={styles.container}>
      <form onSubmit={handleLoginSubmit} style={styles.formStyle}>
        <label>Enter Your Email</label>
        <input ref={emailRef} type="email" required />
        <label>Enter Your Password</label>
        <input ref={passwordRef} type="password" required />
        <Tooltip id="login-tooltip" />
        {!isLoggedIn ? (
          <button disabled={isLoggedIn}>LogIn</button>
        ) : (
          <button
            data-tooltip-id="login-tooltip"
            data-tooltip-content="you are already loggedIn"
            disabled={isLoggedIn}
          >
            LogIn
          </button>
        )}
      </form>
      {displayName}
    </div>
  );
};

const styles = {
  container: {
    width: "60%",
    margin: "0 auto",
  },
  formStyle: {
    display: "flex",
    flexDirection: "column",
    width: "60%",
    textAlign: "left",
    margin: "10px",
    padding: "10px",
  },
};
