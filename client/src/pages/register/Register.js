import "./register.css";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if(password.current.value !== passwordAgain.current.value){
      passwordAgain.current.setCustomValidity("Passwords don't match !");
    }
    else{
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      }
      try{
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch(err){
        console.log(err);
      }
    }
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
            <input placeholder="Username" required ref={username} className="loginInput" />
            <input placeholder="Email" type="email" required ref={email} className="loginInput" />
            <input
              required
              placeholder="Password"
              type="password"
              className="loginInput"
              ref={password}
              minLength="8"
            />
            <input
              required
              placeholder="Password Again"
              type="password"
              className="loginInput"
              ref={passwordAgain}
              minLength="8"
            />
            <button className="loginButton" type="submit">Sign Up</button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
