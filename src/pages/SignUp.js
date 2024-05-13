import { useState } from "react";
import { userSignUp } from "../redux/reducers/authReducer";
import { useDispatch } from "react-redux";

export const SignUp = () => {
  let dispatch = useDispatch();

  let [inputState, setInputState] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const handleInput = (e, type) => {
    if (type === "name")
      setInputState((prevState) => ({ ...prevState, name: e.target.value }));
    else if (type === "email")
      setInputState((prevState) => ({ ...prevState, email: e.target.value }));
    else setInputState((prevState) => ({ ...prevState, pass: e.target.value }));
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch(userSignUp({ ...inputState }));
  };

  return (
    <div className="signUpPage" style={styles.container}>
      <form onSubmit={handleSignUp} style={styles.formStyle}>
        <label>Enter your name</label>
        <input
          value={inputState.name}
          type="text"
          required
          onChange={(e) => handleInput(e, "name")}
        />
        <label>Enter your Email</label>
        <input
          value={inputState.email}
          type="email"
          required
          onChange={(e) => handleInput(e, "email")}
        />
        <label>Set Your Password</label>
        <input
          value={inputState.pass}
          type="password"
          required
          onChange={(e) => handleInput(e, "pass")}
        />
        <button>Sign Up</button>
      </form>
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
