import "./LoginPage.scss";
import { Link } from "react-router-dom";

const LoginPage = ({ handleLogin }) => {
  return (
    <section>
      <h2>Login</h2>
      {/* {isLoginError && <label style={{ color: "red" }}>{errorMessage}</label>} */}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          Username: <input type="text" name="username" />
        </div>
        <div className="form-group">
          Password: <input type="password" name="password" />
        </div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
        <p>New User?</p>
        <Link to="/signup">
          <button> Sign Up</button>
        </Link>
      </form>
    </section>
  );
};

export default LoginPage;
