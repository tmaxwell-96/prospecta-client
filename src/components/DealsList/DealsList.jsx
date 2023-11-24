// DealsList.js
import "./DealsList.scss";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import DealCard from "../DealCard/DealCard";
import GraphicalInfo from "../GraphicalInfo/GraphicalInfo";
import styled from "styled-components";

const StyledDealsList = styled.section`
  .fadeIn {
    animation: fadeInAnimation 1s ease-in-out;
  }

  @keyframes fadeInAnimation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const StyledDealCard = styled.div`
  opacity: 0;
  transition: opacity 1s ease-in-out;

  &.fadeIn {
    opacity: 1;
  }
`;

const DealsList = () => {
  const token = sessionStorage.getItem("JWTtoken");
  const baseURL = process.env.REACT_APP_BASE_URL;
  const [dealList, setDealList] = useState([]);
  const [seachKeyword, setSearchKeyword] = useState("");
  const [starDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
    const dateRange = {
      startDate: starDate,
      endDate: endDate,
    };
    const response = await axios.post(`${baseURL}/search`, dateRange, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDealList(response.data);
  };

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
      alert(`Error communicating with server. Error: ${error}`);
    }
  }, [baseURL, seachKeyword, getDealList, token]);

  return (
    <StyledDealsList className="deal-list">
      <h2 className="deal-list__header">Deals</h2>
      <Link to="/add-deal">
        <button className="deal-list__add-button">Add new Deal</button>
      </Link>
      <input
        onChange={handleSearch}
        name="search"
        type="text"
        placeholder="Search Company"
      />
      <form action="">
        <h3 className="deal-list__header">Date Range</h3>
        <p>From</p>
        <input onBlur={handleStartDate} type="date" name="date" id="date" />
        <p>To</p>
        <input onBlur={handleEndDate} type="date" name="date" id="date" />
        <button onClick={handleSubmit}>Set Date Range</button>
      </form>

      <GraphicalInfo dealList={dealList} />

      <div className="deal-list__container">
        {dealList.map((deal) => {
          return (
            <StyledDealCard key={deal.id} className="fadeIn">
              <DealCard deleteDeal={deleteDeal} deal={deal} />
            </StyledDealCard>
          );
        })}
      </div>
    </StyledDealsList>
  );
};

export default DealsList;
