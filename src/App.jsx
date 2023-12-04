import "./App.scss";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import CompanyList from "./components/CompanyList/CompanyList";
import DealsList from "./components/DealsList/DealsList";
import AddEditCompany from "./components/AddEditCompany/AddEditCompany";
import Footer from "./components/Footer/Footer";
import AddEditDeal from "./components/AddEditDeal/AddEditDeal";
import Login from "./components/Login/Login";
import NotLoggedIn from "./components/NotLoggedIn/NotLoggedIn";
import Signup from "./components/Signup/Signup";
import Landing from "./components/Landing/Landing";
import DealDetails from "./components/DealDetails/DealDetails";
import axios from "axios";

function NavigationComponent({
  isLoggedIn,
  setIsLoggedIn,
  submitted,
  setSubmitted,
  errorMessage,
  setErrorMessage,
}) {
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
      setSubmitted(true);
      setIsLoggedIn(true);
      navigate("/home");
    } catch (error) {
      setIsLoggedIn(false);
      setErrorMessage("Username or password not recognized");
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
  }, [setIsLoggedIn]);

  return (
    <div className="app__content">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <Login
              submitted={submitted}
              isLoggedIn={isLoggedIn}
              handleLogin={handleLogin}
              errorMessage={errorMessage}
            />
          }
        />
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
          path="/deals/:dealId"
          element={isLoggedIn ? <DealDetails /> : <NotLoggedIn />}
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
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <div className="app__content-wrapper">
          {isLoggedIn && <Nav />}
          <NavigationComponent
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            submitted={submitted}
            setSubmitted={setSubmitted}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
