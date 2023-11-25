import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.scss";
import company from "../../assets/icons/company.svg";
import deal from "../../assets/icons/money-bag.svg";

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
        <img className="nav__icon" src={company} alt="" />
        Companies
      </Link>
      <Link
        className={`nav__link ${isActive("/deals") ? "nav__link--active" : ""}`}
        to="/deals"
      >
        <img className="nav__icon" src={deal} alt="" />
        Deals
      </Link>
    </nav>
  );
};

export default Nav;
