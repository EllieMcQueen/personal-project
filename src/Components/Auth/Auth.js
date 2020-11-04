import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser, loginUser } from "../../ducks/reducer";
import "../../scss/Auth.scss";
import { Link } from "react-router-dom";
import backLogo from "./logo.jpg";

//METHODS
//HANDLE CHANGE (2)
//LOGIN
//REGISTER

function Auth(props) {
  const [state, sState] = useState({
    email: "",
    password: "",
    verPassword: "",
    registerView: false,
  });

  const handleInput = (event) => {
    sState({ ...state, [event.target.name]: event.target.value });
  };

  const handleToggle = () => {
    sState({ ...state, registerView: !state.registerView });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = state;

    axios
      .post("/api/login", { email, password })
      .then((res) => {
        console.log(res);
        //props.getUser(res.data);
        console.log(props);
        const { email, cust_id, age, gender, height, weight}= res.data;
        props.loginUser(email, cust_id, age, gender, height, weight)
        props.history.push("/measure");
      })
      .catch((err) => console.log(err));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { email, password, verPassword } = state;
    if (password && password === verPassword) {
      axios
        .post("/api/register", { email, password })
        .then((res) => {
          //props.getUser(res.data);
          props.history.push("/new");
        })
        .catch((err) => console.log(err));
    } else {
      alert(`Passwords don't match`);
    }
  };

  return (
    <div>
      <header className="auth-header">
        {state.registerView ? (
          <span name="registerView" onClick={handleToggle}>
            Log In
          </span>
        ) : (
          <span name="registerView" onClick={handleToggle}>
            Create Account
          </span>
        )}
      </header>
      <form className="auth-box">
        <img className="auth_img" src={backLogo} alt="logo.jpg" />

        {state.registerView ? (
          <div>
            <h1>Create Your Account</h1>
            <input
              className="input"
              value={state.email}
              name="email"
              placeholder="Email Address"
              onChange={(e) => handleInput(e)}
            />

            <input
              className="input"
              type="password"
              value={state.password}
              name="password"
              placeholder="Password"
              onChange={(e) => handleInput(e)}
            />

            <input
              className="input"
              type="password"
              value={state.verPassword}
              name="verPassword"
              placeholder="Verify Password"
              onChange={(e) => handleInput(e)}
            />

            <button
              className={
                state.email && state.password && state.verPassword
                  ? "auth-button change"
                  : "auth-button"
              }
              onClick={handleRegister}
            >CREATE ACCOUNT</button>
          </div>
        ) : (
          <div>
            <h1>Log into your Tracker</h1>
            <input
              className="input"
              value={state.email}
              name="email"
              placeholder="Email Address"
              onChange={(e) => handleInput(e)}
            />

            <input
              className="input"
              type="password"
              value={state.password}
              name="password"
              placeholder="Password"
              onChange={(e) => handleInput(e)}
            />
            <button
              className={
                state.email && state.password
                  ? "auth-button change"
                  : "auth-button"
              }
              onClick={handleLogin}
            >Log In</button>
          </div>
        )}

        <Link className="forgot-pw-link" to="/forgotpassword">
          <span>CAN'T LOG IN?</span>
        </Link>
      </form>
    </div>
  );
}

export default connect(null, { getUser, loginUser })(Auth);
