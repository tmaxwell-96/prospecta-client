import "./NotLoggedIn.scss";
import { Link } from "react-router-dom";

const NotLoggedIn = () => {
  return (
    <section>
      <h2>Please log in to view information</h2>
      <Link to="/login">
        <button> Login</button>
      </Link>
    </section>
  );
};

export default NotLoggedIn;
