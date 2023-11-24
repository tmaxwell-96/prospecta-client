import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.scss";

const Nav = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.endsWith(path);
  };

  return (
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
        className={`nav__link ${isActive("/deals") ? "nav__link--active" : ""}`}
        to="/deals"
      >
        Deals
      </Link>
    </nav>
  );
};

export default Nav;
