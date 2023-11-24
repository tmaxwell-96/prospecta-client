import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="header__logo-container">
        <img className="header__img" src={logo} alt="logo" />
        <h1 className="header__title">Prospecta</h1>
      </div>
    </div>
  );
};

export default Header;
