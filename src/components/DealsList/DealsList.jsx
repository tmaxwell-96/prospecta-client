// DealsList.js
import "./DealsList.scss";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import DealCard from "../DealCard/DealCard";
import GraphicalInfo from "../GraphicalInfo/GraphicalInfo";
import scrollUp from "../../assets/icons/up-chevron.svg";
import downChevron from "../../assets/icons/down-chevron.svg";
import DonutSpinner from "../DonutSpinner/DonutSpinner";

const DealsList = () => {
  const token = sessionStorage.getItem("JWTtoken");
  const baseURL = process.env.REACT_APP_BASE_URL;
  const [dealList, setDealList] = useState([]);
  const [seachKeyword, setSearchKeyword] = useState("");
  const [starDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  //Scroll to Top Function
  //----------------------------

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const scrollButton = document.querySelector(".deal-list__scroll-up");

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

  //Get List of Deal
  //----------------------------

  const getDealList = useCallback(async () => {
    const response = await axios.get(`${baseURL}/deals`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDealList(response.data);
  }, [baseURL, token]);

  useEffect(() => {
    getDealList();
    window.scrollTo(0, 0);

    //Search by Date Function
    //----------------------------
  }, [getDealList]);

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleStartDate = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDate = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!starDate && !endDate) {
      getDealList();
      return;
    }

    const dateRange = {
      startDate: starDate,
      endDate: endDate,
    };

    try {
      const response = await axios.post(`${baseURL}/search`, dateRange, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDealList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //Delete Deal
  //----------------------------

  const deleteDeal = async (event) => {
    try {
      await axios.delete(`${baseURL}/deals/${event}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getDealList();
    } catch (error) {
      console.error(error);
    }
  };

  //Search by Keyword Function
  //----------------------------

  useEffect(() => {
    try {
      const searchInfo = async () => {
        const response = await axios.get(
          `${baseURL}/search/deals?searchTerm=${seachKeyword}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDealList(response.data);
      };

      if (seachKeyword.length > 3) {
        searchInfo();
      } else {
        getDealList();
      }
    } catch (error) {
      alert(`Error communicating with server. `);
    }
  }, [baseURL, seachKeyword, getDealList, token]);

  //Sort Function
  //----------------------------

  const sortColumn = (columnName) => {
    const sortedList = [...dealList].sort((a, b) => {
      if (a[columnName] > b[columnName]) {
        return 1;
      }
      if (a[columnName] < b[columnName]) {
        return -1;
      }
      return 0;
    });

    setDealList(sortedList);
  };

  const sortColumnDescending = (columnName) => {
    const sortedList = [...dealList].sort((a, b) => {
      if (a[columnName] < b[columnName]) {
        return 1;
      }
      if (a[columnName] > b[columnName]) {
        return -1;
      }
      return 0;
    });

    setDealList(sortedList);
  };

  return (
    <div className="deal-list">
      <h2 className="deal-list__header">Deals</h2>
      <div className="deal-list__top">
        <div className="deal-list__left">
          <input
            className="deal-list__input"
            onChange={handleSearch}
            name="search"
            type="text"
            placeholder="Search Deal"
          />
          <Link to="/add-deal">
            <button className="deal-list__add-button">Add new Deal</button>
          </Link>
        </div>

        <form className="deal-list__right">
          <h3 className="deal-list__header">Date Range</h3>
          <label htmlFor="startDate">
            <p>From:</p>
            <input
              className="deal-list__date-input"
              onBlur={handleStartDate}
              type="date"
              name="startDate"
              id="startDate"
            />
          </label>
          <label htmlFor="endDate">
            <p>To:</p>
            <input
              className="deal-list__date-input"
              onBlur={handleEndDate}
              type="date"
              name="endDate"
              id="endDate"
            />
          </label>
          <button className="deal-list__date-button" onClick={handleSubmit}>
            Set Date Range
          </button>
        </form>
      </div>

      <img
        onClick={handleScrollUp}
        className="deal-list__scroll-up"
        src={scrollUp}
        alt="up chevron"
      />
      {!dealList.length ? (
        <div className="deal-list__donut-container">
          <DonutSpinner />
        </div>
      ) : (
        <GraphicalInfo dealList={dealList} />
      )}

      <div className="deal-list__columns">
        <div className="deal-list__columns-left">
          <div className="deal-list__deal-name">
            <p>Deal Name</p>
            <div className="deal-list__sorting-container">
              <img
                className="deal-list__sort-image"
                src={scrollUp}
                alt="up chevron"
                onClick={() => sortColumn("deal_name")}
              />
              <img
                className="deal-list__sort-image"
                src={downChevron}
                alt="down chevron"
                onClick={() => sortColumnDescending("deal_name")}
              />
            </div>
          </div>

          <div className="deal-list__company-name">
            <p>Company Name</p>
            <div className="deal-list__sorting-container">
              <img
                className="deal-list__sort-image"
                src={scrollUp}
                alt="up chevron"
                onClick={() => sortColumn("company_name")}
              />
              <img
                className="deal-list__sort-image"
                src={downChevron}
                alt="down chevron"
                onClick={() => sortColumnDescending("company_name")}
              />
            </div>
          </div>
          <div className="deal-list__expected">
            <p>Expected Value, Certainty</p>
            <div className="deal-list__sorting-container">
              <img
                className="deal-list__sort-image"
                src={scrollUp}
                alt="up chevron"
                onClick={() => sortColumn("value")}
              />
              <img
                className="deal-list__sort-image"
                src={downChevron}
                alt="down chevron"
                onClick={() => sortColumnDescending("value")}
              />
            </div>
          </div>
          <div className="deal-list__weighted">
            <p>Weighted Value, Expected Sale Date</p>
            <div className="deal-list__sorting-container">
              <img
                className="deal-list__sort-image"
                src={scrollUp}
                alt="up chevron"
                onClick={() => sortColumn("expected_sale_date")}
              />
              <img
                className="deal-list__sort-image"
                src={downChevron}
                alt="down chevron"
                onClick={() => sortColumnDescending("expected_sale_date")}
              />
            </div>
          </div>
        </div>

        <p className="deal-list__actions">Actions</p>
      </div>

      <div className="deal-list__container">
        {dealList.map((deal, index) => {
          return (
            <DealCard
              key={deal.id}
              index={index}
              deleteDeal={deleteDeal}
              deal={deal}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DealsList;
