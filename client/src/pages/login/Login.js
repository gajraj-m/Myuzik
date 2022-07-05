import React, { useContext } from 'react';
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@mui/material'

export const Login = () => {

  const email = React.useRef();
  const password = React.useRef();
  const {isFetching, dispatch} = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault(); // prevents reloading of screen when submitted
    loginCall({email: email.current.value, password: password.current.value}, dispatch);
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Myuzik</h3>
          <span className="loginDesc">
            Connect with other Musicians and the world around you on Myuzik.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              placeholder="Password"
              type="password"
              minLength="8"
              className="loginInput"
              ref={password}
              required
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? <CircularProgress color="inherit" /> : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
