import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.endsWith(path);
  };

  return (
    <div className="header">
      <h1 className="header__title">Prospecta</h1>
      <nav className="nav">
        <Link
          className={`nav__link ${
            isActive("/companies") ? "nav__link--active" : ""
          }`}
          to="/companies"
        >
          Companies
        </Link>
        <Link
          className={`nav__link ${
            isActive("/deals") ? "nav__link--active" : ""
          }`}
          to="/deals"
        >
          Deals
        </Link>
      </nav>
    </div>
  );
};

export default Header;
