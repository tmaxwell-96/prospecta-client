import "./App.scss";
import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import CompanyList from "./components/CompanyList/CompanyList";
import DealsList from "./components/DealsList/DealsList";
import AddEditCompany from "./components/AddEditCompany/AddEditCompany";
import Footer from "./components/Footer/Footer";
import AddEditDeal from "./components/AddEditDeal/AddEditDeal";
import LoginPage from "./Pages/LoginPage/LoginPage";
import NotLoggedIn from "./components/NotLoggedIn/NotLoggedIn";
import Signup from "./components/Signup/Signup";
import Landing from "./components/Landing/Landing";
import axios from "axios";

function NavigationComponent({ isLoggedIn, setIsLoggedIn }) {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/login`, {
        username: event.target.username.value,
        password: event.target.password.value,
      });
      sessionStorage.setItem("JWTtoken", response.data.token);
      setIsLoggedIn(true);
      navigate("/home");
    } catch (error) {
      setIsLoggedIn(false);
      console.error("Username or password not recognized", error);
    }
  };

  useEffect(() => {
    const checkLogin = () => {
      const loginToken = sessionStorage.getItem("JWTtoken");
      if (loginToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <div className="app__content">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/error" element={<NotLoggedIn />} />
        <Route
          path="/home"
          element={isLoggedIn ? <Landing /> : <NotLoggedIn />}
        />
        <Route
          path="/companies"
          element={isLoggedIn ? <CompanyList /> : <NotLoggedIn />}
        />
        <Route
          path="/deals"
          element={isLoggedIn ? <DealsList /> : <NotLoggedIn />}
        />
        <Route
          path="/add-company"
          element={isLoggedIn ? <AddEditCompany /> : <NotLoggedIn />}
        />
        <Route
          path="/add-deal"
          element={isLoggedIn ? <AddEditDeal /> : <NotLoggedIn />}
        />
        <Route
          path="/edit-company/:companyId"
          element={isLoggedIn ? <AddEditCompany /> : <NotLoggedIn />}
        />
        <Route
          path="/edit-deal/:dealId"
          element={isLoggedIn ? <AddEditDeal /> : <NotLoggedIn />}
        />
      </Routes>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app">
      <BrowserRouter>
        <Header />

        {isLoggedIn && <Nav />}
        <NavigationComponent
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
