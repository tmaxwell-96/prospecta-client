import React from "react";
import "./Footer.scss";
import github from "../../assets/icons/github-mark.svg";
import linkedIn from "../../assets/icons/iconmonstr-linkedin-3.svg";
import email from "../../assets/icons/email-1-svgrepo-com.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="footer__heading">Contact | Help</h2>
      <p className="footer__text">
        {" "}
        Have feature requests? Suggestions? Looking to see other projects?
      </p>
      <p className="footer__text">Reach out anytime!</p>
      <div className="footer__contacts-container">
        <a
          href="mailto:taylor.w.mawell@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="footer__socials" src={email} alt="email" />
        </a>
        <a
          href="https://github.com/tmaxwell-96"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="footer__socials" src={github} alt="github" />
        </a>
        <a
          href="https://www.linkedin.com/in/taylor-w-maxwell/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="footer__socials" src={linkedIn} alt="linkedin" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
