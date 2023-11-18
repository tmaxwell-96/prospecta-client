import "./DealsList.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import DealCard from "../DealCard/DealCard";

const DealsList = () => {
  // State
  const baseURL = "http://localhost:8080";
  const [dealList, setDealList] = useState([]);

  useEffect(() => {
    const getDealList = async () => {
      const response = await axios.get(`${baseURL}/deals`);
      setDealList(response.data);
    };
    getDealList();
  }, []);

  return (
    <section className="company-list">
      <h2 className="company-list__header">Deals</h2>
      <div className="company-list__container">
        {dealList.map((deal) => {
          return <DealCard key={deal.id} deal={deal} />;
        })}
      </div>
    </section>
  );
};

export default DealsList;
