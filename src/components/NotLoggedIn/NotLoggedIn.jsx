import "./NotLoggedIn.scss";
import { Link } from "react-router-dom";

const NotLoggedIn = () => {
  return (
    <section className="not-logged-in">
      <h2 className="not-logged-in__heading">
        Please log in to view information
      </h2>
      <Link to="/">
        <button className="not-logged-in__button"> Login</button>
      </Link>
    </section>
  );
};

export default NotLoggedIn;
