import "./Signup.scss";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import DonutSpinner from "../DonutSpinner/DonutSpinner";

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
        alert("Error communicating with the server, please try again later");
      }
    }
  };

  return (
    <section className="signup">
      <h2 className="signup__heading">Sign Up</h2>
      <div className="signup-form__wrapper">
        <form className="signup-form" onSubmit={handleSignup}>
          <div className="signup-form-group">
            Username:{" "}
            <input
              onChange={handleChange}
              value={formData.username}
              className="signup-form__input"
              type="text"
              name="username"
            />
            {renderError(formData.username)}
          </div>
          <div className="signup-form-group">
            Name:{" "}
            <input
              onChange={handleChange}
              value={formData.name}
              className="signup-form__input"
              type="text"
              name="name"
            />
            {renderError(formData.name)}
          </div>
          <div className="signup-form-group">
            Password:{" "}
            <input
              onChange={handleChange}
              value={formData.password}
              className="signup-form__input"
              type="password"
              name="password"
            />
            {renderError(formData.password)}
          </div>
          <button className="signup-form__button" type="submit">
            Signup
          </button>
        </form>
      </div>

      <div className="signup__existing-user">
        <p>Already a User?</p>
        <Link to="/">
          <button className="signup__button"> Login</button>
        </Link>
      </div>
      <div className="signup__donut-container">
        {submitted ? <DonutSpinner /> : ""}
      </div>
    </section>
  );
};

export default Signup;
