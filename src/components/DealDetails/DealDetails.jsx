import "./DealDetails.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatNumberWithCommas } from "../../functions/functions";

const DealDetails = () => {
  const [dealInfo, setDealInfo] = useState({});
  const baseURL = process.env.REACT_APP_BASE_URL;

  const token = sessionStorage.getItem("JWTtoken");
  const { dealId } = useParams();

  // Get deal info by Id
  useEffect(() => {
    const getDealById = async () => {
      const response = await axios.get(`${baseURL}/deals/${dealId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDealInfo(response.data[0]);
    };
    getDealById();
  }, [baseURL, dealId, token]);

  if (!dealInfo.deal_name) {
    return null;
  }

  const percentage = dealInfo.percent_certainty;
  const certaintyNumber = percentage.replace(/%/g, "");

  return (
    <section className="deal-details">
      <h2>{dealInfo.deal_name}</h2>
      <div className="deal-details__info">
        <p className="deal-details-card__label">Company Name</p>
        <p className="deal-details-card__text">{dealInfo.company_name}</p>
        <p className="deal-details-card__label">Expected Value</p>
        <p className="deal-details-card__text">{`$${formatNumberWithCommas(
          dealInfo.value
        )}`}</p>
        <p className="deal-details-card__label">Expected Certainty</p>
        <p className="deal-details-card__text">{dealInfo.percent_certainty}</p>
        <p className="deal-details-card__label">Weighted Value</p>
        <p className="deal-details-card__text">{`$${formatNumberWithCommas(
          Math.floor((Number(certaintyNumber) / 100) * dealInfo.value)
        )}`}</p>
        <p className="deal-details-card__label">Expected Sale Date</p>
        <p className="deal-details-card__text">
          {new Date(dealInfo.expected_sale_date).toLocaleDateString()}
        </p>
      </div>
      <div className="deal-details__description-container">
        <h2>Description:</h2>
        <p className="deal-details__description-text">{dealInfo.description}</p>
      </div>
    </section>
  );
};

export default DealDetails;
