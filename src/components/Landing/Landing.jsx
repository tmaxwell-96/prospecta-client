import "./Landing.scss";

import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { formatNumberWithCommas } from "../../functions/functions";

const StyledLanding = styled.section`
  .fadeIn {
    animation: fadeInAnimation 1.5s ease-in-out;
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

const Landing = () => {
  const [singleDeal, setSingleDeal] = useState([]);
  const baseURL = process.env.REACT_APP_BASE_URL;
  const token = sessionStorage.getItem("JWTtoken");

  const getSingleDeal = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURL}/deals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.length > 0) {
        const randomIndex = Math.floor(Math.random() * response.data.length);
        setSingleDeal([response.data[randomIndex]]);
      }
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  }, [baseURL, token]);

  useEffect(() => {
    getSingleDeal();

    const intervalId = setInterval(() => {
      getSingleDeal();
    }, 7000);

    return () => clearInterval(intervalId);
  }, [getSingleDeal]);

  const percentage =
    singleDeal.length > 0 ? singleDeal[0].percent_certainty : null;
  const certaintyNumber = percentage ? percentage.replace(/%/g, "") : null;

  return (
    <StyledLanding className="landing">
      <h2>Deal Spotlight</h2>

      <div className="landing__progress-bar-container">
        <div className="landing__progress-bar"></div>
      </div>

      {singleDeal[0] && (
        <section className="landing__deal-details">
          <h2>{singleDeal[0].deal_name}</h2>
          <div className="deal-details__info">
            <p className="deal-details-card__label">Company Name</p>
            <p className="deal-details-card__text">
              {singleDeal[0].company_name}
            </p>
            <p className="deal-details-card__label">Expected Value</p>
            <p className="deal-details-card__text">{`$${formatNumberWithCommas(
              singleDeal[0].value
            )}`}</p>
            <p className="deal-details-card__label">Expected Certainty</p>
            <p className="deal-details-card__text">
              {singleDeal[0].percent_certainty}
            </p>
            <p className="deal-details-card__label">Weighted Value</p>
            <p className="deal-details-card__text">{`$${formatNumberWithCommas(
              Math.floor((Number(certaintyNumber) / 100) * singleDeal[0].value)
            )}`}</p>
            <p className="deal-details-card__label">Expected Sale Date</p>
            <p className="deal-details-card__text">
              {new Date(singleDeal[0].expected_sale_date).toLocaleDateString()}
            </p>
          </div>
          <div className="deal-details__description-container">
            <h2>Description:</h2>
            <p className="deal-details__description-text">
              {singleDeal[0].description}
            </p>
          </div>
        </section>
      )}
    </StyledLanding>
  );
};

export default Landing;
