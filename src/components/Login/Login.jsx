import { Link } from "react-router-dom";
import DonutSpinner from "../DonutSpinner/DonutSpinner";
import "./Login.scss";

const Login = ({ handleLogin, isLoggedIn, submitted }) => {
  console.log(isLoggedIn);
  console.log(`submitted:`, submitted);
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
            Login
          </button>
        </form>
      </div>

      <div className="login__new-user">
        <p>New User?</p>
        <Link to="/signup">
          <button className="login-form__button"> Sign Up</button>
        </Link>
      </div>
      <div className="login__donut-container">
        {!isLoggedIn && submitted ? <DonutSpinner /> : ""}
      </div>
    </section>
  );
};

export default Login;
