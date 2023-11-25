import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <Link className="header__logo-container" to="/home">
        <img className="header__img" src={logo} alt="logo" />
        <h1 className="header__title">Prospecta</h1>
      </Link>
    </div>
  );
};

export default Header;
