import { Link } from "react-router-dom";
import DonutSpinner from "../DonutSpinner/DonutSpinner";
import { useState, useEffect } from "react";
import "./Login.scss";

const Login = ({ handleLogin, submitted, errorMessage }) => {
  const [isSubmitted, setIsSubmitted] = useState(submitted); // Use a local state for 'submitted'

  useEffect(() => {
    setIsSubmitted(submitted);
  }, [submitted]);

  return (
    <section className="login">
      <h2 className="login__heading">Login</h2>
      <div className="login-form__wrapper">
        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-form-group">
            Username:{" "}
            <input className="login-form__input" type="text" name="username" />
          </div>
          <div className="login-form-group">
            Password:{" "}
            <input
              className="login-form__input"
              type="password"
              name="password"
            />
          </div>
          <button className="login-form__button" type="submit">
            {submitted ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      <div className="login__new-user">
        <p>New User?</p>
        <Link to="/signup">
          <button className="login-form__button"> Sign Up</button>
        </Link>
      </div>
      <div className="login__demo-user">
        <h2 className="login__heading-text">To demo project, login with:</h2>
        <p className="login__text">
          <span className="login__highlight">Username:</span> demoUser
        </p>
        <p className="login__text">
          <span className="login__highlight">Password:</span> demo
        </p>
      </div>
      {errorMessage && isSubmitted && (
        <p className="error-message">{errorMessage}</p>
      )}
      <div className="login__donut-container">
        {isSubmitted ? <DonutSpinner /> : ""}
      </div>
    </section>
  );
};

export default Login;
