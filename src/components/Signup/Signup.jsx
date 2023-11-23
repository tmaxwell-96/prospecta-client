import "./Signup.scss";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${baseURL}/signup`, {
        username: event.target.username.value,
        name: event.target.name.value,
        password: event.target.password.value,
      });
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          Username: <input type="text" name="username" />
        </div>
        <div className="form-group">
          Name: <input type="text" name="name" />
        </div>
        <div className="form-group">
          Password: <input type="password" name="password" />
        </div>
        <button className="btn btn-primary" type="submit">
          Signup
        </button>
        <p>Already a User?</p>
        <Link to="/login">
          <button> Login</button>
        </Link>
      </form>
    </section>
  );
};

export default Signup;
