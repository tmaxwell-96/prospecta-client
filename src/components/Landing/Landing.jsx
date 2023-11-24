import "./Landing.scss";
import DealCard from "../DealCard/DealCard";
import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

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
      // Handle error if needed
    }
  }, [baseURL, token]);

  useEffect(() => {
    // Initial call
    getSingleDeal();

    // Set up interval to call every 10 seconds
    const intervalId = setInterval(() => {
      getSingleDeal();
    }, 7000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [getSingleDeal]);

  return (
    <StyledLanding className="landing">
      <h2>Deal Spotlight</h2>

      {singleDeal[0] && (
        <DealCard key={singleDeal[0].id} deal={singleDeal[0]} />
      )}
    </StyledLanding>
  );
};

export default Landing;
