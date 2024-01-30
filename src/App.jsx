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

  //Login Function
  //----------------------------

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setSubmitted(true);

      const response = await axios.post(`${baseURL}/login`, {
        username: event.target.username.value,
        password: event.target.password.value,
      });

      sessionStorage.setItem("JWTtoken", response.data.token);
      setIsLoggedIn(true);
      setErrorMessage(""); // Reset error message on successful login
      navigate("/home");
      setSubmitted(false);
    } catch (error) {
      setIsLoggedIn(false);
      setErrorMessage("Username or password not recognized");
    }
  };

  //Check Login on Page Refresh
  //----------------------------

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
  }, [setIsLoggedIn, setErrorMessage]);

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

        {!isLoggedIn && <Route path="/error" element={<NotLoggedIn />} />}
        {isLoggedIn && <Route path="/home" element={<Landing />} />}
        {isLoggedIn && <Route path="/companies" element={<CompanyList />} />}
        {isLoggedIn && <Route path="/deals" element={<DealsList />} />}
        {isLoggedIn && (
          <Route path="/deals/:dealId" element={<DealDetails />} />
        )}
        {isLoggedIn && (
          <Route path="/add-company" element={<AddEditCompany />} />
        )}
        {isLoggedIn && <Route path="/add-deal" element={<AddEditDeal />} />}
        {isLoggedIn && (
          <Route path="/edit-company/:companyId" element={<AddEditCompany />} />
        )}
        {isLoggedIn && (
          <Route path="/edit-deal/:dealId" element={<AddEditDeal />} />
        )}
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
        <Header setIsLoggedIn={setIsLoggedIn} />
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
