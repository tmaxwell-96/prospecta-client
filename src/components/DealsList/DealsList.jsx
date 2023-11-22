import "./DealsList.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import DealCard from "../DealCard/DealCard";
import GraphicalInfo from "../GraphicalInfo/GraphicalInfo";

const DealsList = () => {
  // State
  const baseURL = "http://localhost:8080";
  const [dealList, setDealList] = useState([]);
  const [seachKeyword, setSearchKeyword] = useState("");
  const [starDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  //Search function

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
    const response = await axios.post(`${baseURL}/search`, dateRange);
    setDealList(response.data);
  };

  useEffect(() => {
    try {
      const searchInfo = async () => {
        const response = await axios.get(
          `${baseURL}/search/deals?searchTerm=${seachKeyword}`
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
  }, [seachKeyword]);

  //Get list of deals
  const getDealList = async () => {
    const response = await axios.get(`${baseURL}/deals`);
    setDealList(response.data);
  };

  useEffect(() => {
    getDealList();
  }, []);

  return (
    <section className="company-list">
      <h2 className="company-list__header">Deals</h2>
      <input
        onChange={handleSearch}
        name="search"
        type="text"
        placeholder="Search Company"
      />
      <form action="">
        <h3 className="company-list__header">Date Range</h3>
        <p>From</p>

        <input onBlur={handleStartDate} type="date" name="date" id="date" />
        <p>To</p>
        <input onBlur={handleEndDate} type="date" name="date" id="date" />
        <button onClick={handleSubmit}>Set Date Range</button>
      </form>

      <GraphicalInfo dealList={dealList} />

      <div className="company-list__container">
        {dealList.map((deal) => {
          return <DealCard key={deal.id} deal={deal} />;
        })}
      </div>
    </section>
  );
};

export default DealsList;
