import "./NotLoggedIn.scss";
import { Link } from "react-router-dom";

const NotLoggedIn = () => {
  return (
    <section>
      <h2>Please log in to view information</h2>
      <Link to="/">
        <button> Login</button>
      </Link>
    </section>
  );
};

export default NotLoggedIn;
