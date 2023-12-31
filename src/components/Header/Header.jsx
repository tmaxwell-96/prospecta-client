import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import { useNavigate } from "react-router-dom";
import "./Header.scss";

const Header = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="header">
      <Link className="header__logo-container" to="/home">
        <img className="header__img" src={logo} alt="logo" />
        <h1 className="header__title">Prospecta</h1>
      </Link>
      <button onClick={handleLogout} className="header__logout">
        Logout
      </button>
    </div>
  );
};

export default Header;
