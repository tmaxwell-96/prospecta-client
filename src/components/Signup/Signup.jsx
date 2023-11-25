import "./Signup.scss";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Signup = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
  });

  const isFormValid = () => {
    if (!formData.username || !formData.name || !formData.password) {
      return false;
    } else {
      return true;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderError = (label) => (
    <div
      className={`signup__error-field ${
        submitted && !label ? "signup__error-field--displayed" : ""
      }`}
    >
      <p>{`Field is required`}</p>
    </div>
  );

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (isFormValid()) {
      try {
        await axios.post(`${baseURL}/signup`, {
          username: formData.username,
          name: formData.name,
          password: formData.password,
        });
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <section className="signup">
      <h2 className="signup__heading">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <div className="login-form-group">
          Username:{" "}
          <input
            onChange={handleChange}
            value={formData.username}
            className="login-form__input"
            type="text"
            name="username"
          />
          {renderError(formData.username)}
        </div>
        <div className="login-form-group">
          Name:{" "}
          <input
            onChange={handleChange}
            value={formData.name}
            className="login-form__input"
            type="text"
            name="name"
          />
          {renderError(formData.name)}
        </div>
        <div className="login-form-group">
          Password:{" "}
          <input
            onChange={handleChange}
            value={formData.password}
            className="login-form__input"
            type="password"
            name="password"
          />
          {renderError(formData.password)}
        </div>
        <button className="login-form__button" type="submit">
          Signup
        </button>
      </form>

      <div className="signup__existing-user">
        <p>Already a User?</p>
        <Link to="/">
          <button className="signup__button"> Login</button>
        </Link>
      </div>
    </section>
  );
};

export default Signup;
