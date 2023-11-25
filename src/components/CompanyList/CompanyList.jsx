import "./CompanyList.scss";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import CompanyCard from "../CompanyCard/CompanyCard";
import { Link } from "react-router-dom";
import scrollUp from "../../assets/icons/up-chevron.svg";

const CompanyList = () => {
  const token = sessionStorage.getItem("JWTtoken");
  // State
  const baseURL = process.env.REACT_APP_BASE_URL;
  const [companyList, setCompanyList] = useState([]);
  const [seachKeyword, setSearchKeyword] = useState("");

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const scrollButton = document.querySelector(".company-list__scroll-up");

    const handleScroll = () => {
      if (window.scrollY > 200) {
        // Show the scroll-up button when the user scrolls down
        scrollButton.classList.add("visible");
      } else {
        // Hide the scroll-up button when the user is at the top
        scrollButton.classList.remove("visible");
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //Get list of companies
  const getCompanyList = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURL}/companies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCompanyList(response.data);
    } catch (error) {
      alert(
        `There was an issue communicating with the server, please try again later. Error: ${error}`
      );
    }
  }, [baseURL]);

  //Search function

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  useEffect(() => {
    const searchInfo = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/search/companies?searchTerm=${seachKeyword}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCompanyList(response.data);
      } catch (error) {
        alert(
          `There was an issue communicating with the server, please try again later. Error : ${error}`
        );
      }
    };
    if (seachKeyword.length > 3) {
      searchInfo();
    } else {
      getCompanyList();
    }
  }, [baseURL, seachKeyword, getCompanyList]);

  useEffect(() => {
    getCompanyList();
  }, [getCompanyList]);

  return (
    <section className="company-list">
      <h2 className="company-list__header">Company List</h2>
      <input
        onChange={handleSearch}
        name="search"
        type="text"
        placeholder="Search Company"
      />
      <Link to="/add-company">
        <button>Add New Company</button>
      </Link>
      <img
        onClick={handleScrollUp}
        className="company-list__scroll-up"
        src={scrollUp}
        alt="up chevron"
      />
      <div className="company-list__container">
        {companyList.map((company) => {
          return <CompanyCard key={company.id} company={company} />;
        })}
      </div>
    </section>
  );
};

export default CompanyList;
