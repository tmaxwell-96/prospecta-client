import "./CompanyList.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import CompanyCard from "../CompanyCard/CompanyCard";

const CompanyList = () => {
  // State
  const baseURL = "http://localhost:8080";
  const [companyList, setCompanyList] = useState([]);

  useEffect(() => {
    const getCompanyList = async () => {
      const response = await axios.get(`${baseURL}/companies`);
      setCompanyList(response.data);
    };
    getCompanyList();
  }, []);

  return (
    <section className="company-list">
      <h2 className="company-list__header">Company List</h2>
      <div className="company-list__container">
        {companyList.map((company) => {
          return <CompanyCard key={company.id} company={company} />;
        })}
      </div>
    </section>
  );
};

export default CompanyList;
