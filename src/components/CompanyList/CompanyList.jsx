import "./CompanyList.scss";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import CompanyCard from "../CompanyCard/CompanyCard";
import { Link } from "react-router-dom";
import scrollUp from "../../assets/icons/up-chevron.svg";
import downChevron from "../../assets/icons/down-chevron.svg";

const CompanyList = () => {
  const token = sessionStorage.getItem("JWTtoken");
  // State
  const baseURL = process.env.REACT_APP_BASE_URL;
  const [companyList, setCompanyList] = useState([]);
  const [seachKeyword, setSearchKeyword] = useState("");

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //Scroll to top function
  useEffect(() => {
    const scrollButton = document.querySelector(".company-list__scroll-up");

    const handleScroll = () => {
      if (window.scrollY > 200) {
        scrollButton.classList.add("visible");
      } else {
        scrollButton.classList.remove("visible");
      }
    };

    window.addEventListener("scroll", handleScroll);
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
  }, [baseURL, token]);

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
  }, [baseURL, seachKeyword, getCompanyList, token]);

  useEffect(() => {
    getCompanyList();
  }, [getCompanyList]);

  //Delete company
  const deleteCompany = async (event) => {
    try {
      await axios.delete(`${baseURL}/companies/${event}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getCompanyList();
    } catch (error) {
      console.error(error);
    }
  };

  //Sort Function
  const sortColumn = (columnName) => {
    const sortedList = [...companyList].sort((a, b) => {
      if (a[columnName] > b[columnName]) {
        return 1;
      }
      if (a[columnName] < b[columnName]) {
        return -1;
      }
      return 0;
    });

    setCompanyList(sortedList);
  };

  const sortColumnDescending = (columnName) => {
    const sortedList = [...companyList].sort((a, b) => {
      if (a[columnName] < b[columnName]) {
        return 1;
      }
      if (a[columnName] > b[columnName]) {
        return -1;
      }
      return 0;
    });

    setCompanyList(sortedList);
  };

  return (
    <section className="company-list">
      <h2 className="company-list__header">Company List</h2>
      <input
        className="company-list__input"
        onChange={handleSearch}
        name="search"
        type="text"
        placeholder="Search Company"
      />
      <Link to="/add-company">
        <button className="company-list__button">Add New Company</button>
      </Link>
      <div className="company-list__columns">
        <div className="company-list__columns-left">
          <div className="company-list__name">
            <p>Company Name</p>
            <div className="company-list__sorting-container">
              <img
                className="company-list__sort-image"
                src={scrollUp}
                alt="up chevron"
                onClick={() => sortColumn("company_name")}
              />
              <img
                className="company-list__sort-image"
                src={downChevron}
                alt="down chevron"
                onClick={() => sortColumnDescending("company_name")}
              />
            </div>
          </div>
          <div className="company-list__contact">
            <p>Main Contact</p>
            <div className="company-list__sorting-container">
              <img
                className="company-list__sort-image"
                src={scrollUp}
                alt="up chevron"
                onClick={() => sortColumn("contact_name")}
              />
              <img
                className="company-list__sort-image"
                src={downChevron}
                alt="down chevron"
                onClick={() => sortColumnDescending("contact_name")}
              />
            </div>
          </div>
          <div className="company-list__details">
            {" "}
            <p>Contact Details</p>
            <div className="company-list__sorting-container">
              <img
                className="company-list__sort-image"
                src={scrollUp}
                alt="up chevron"
                onClick={() => sortColumn("contact_email")}
              />
              <img
                className="company-list__sort-image"
                src={downChevron}
                alt="down chevron"
                onClick={() => sortColumnDescending("contact_email")}
              />
            </div>
          </div>
          <div className="company-list__location">
            <p>Location</p>
            <div className="company-list__sorting-container">
              <img
                className="company-list__sort-image"
                src={scrollUp}
                alt="up chevron"
                onClick={() => sortColumn("city")}
              />
              <img
                className="company-list__sort-image"
                src={downChevron}
                alt="down chevron"
                onClick={() => sortColumnDescending("city")}
              />
            </div>
          </div>
        </div>

        <p className="company-list__actions">Actions</p>
      </div>
      <img
        onClick={handleScrollUp}
        className="company-list__scroll-up"
        src={scrollUp}
        alt="up chevron"
      />
      <div className="company-list__container">
        {companyList.map((company) => {
          return (
            <CompanyCard
              key={company.id}
              deleteCompany={deleteCompany}
              company={company}
            />
          );
        })}
      </div>
    </section>
  );
};

export default CompanyList;
