import "./CompanyList.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import CompanyCard from "../CompanyCard/CompanyCard";

const CompanyList = () => {
  // State
  const baseURL = "http://localhost:8080";
  const [companyList, setCompanyList] = useState([]);
  const [seachKeyword, setSearchKeyword] = useState("");

  //Search function

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  useEffect(() => {
    const searchInfo = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/search/companies?searchTerm=${seachKeyword}`
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
  }, [seachKeyword]);

  //Get list of companies
  const getCompanyList = async () => {
    const response = await axios.get(`${baseURL}/companies`);
    setCompanyList(response.data);
  };

  useEffect(() => {
    getCompanyList();
  }, []);

  return (
    <section className="company-list">
      <h2 className="company-list__header">Company List</h2>
      <input
        onChange={handleSearch}
        name="search"
        type="text"
        placeholder="Search Company"
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
