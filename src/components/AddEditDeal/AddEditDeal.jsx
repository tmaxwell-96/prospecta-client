import "./AddEditDeal.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const AddEditDeal = () => {
  const token = sessionStorage.getItem("JWTtoken");
  const baseURL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  //Check if editmode
  const { dealId } = useParams();
  const isEditMode = !!dealId;

  const [companyList, setCompanyList] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    deal_name: "",
    description: "",
    value: "",
    percent_certainty: "",
    expected_sale_date: "",
    company_id: "",
  });

  const isFormValid = () => {
    if (
      !formData.deal_name ||
      !formData.description ||
      !formData.value ||
      !formData.percent_certainty ||
      !formData.expected_sale_date ||
      !formData.company_id
    ) {
      return false;
    } else {
      return true;
    }
  };

  //Handle form data

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (isFormValid()) {
      if (isEditMode) {
        const changeDeal = async () => {
          await axios.put(
            `${baseURL}/deals/${dealId}`,

            {
              deal_name: formData.deal_name,
              description: formData.description,
              value: formData.value,
              percent_certainty: formData.percent_certainty,
              expected_sale_date: formData.expected_sale_date,
              company_id: formData.company_id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        };
        changeDeal();
        alert("Deal updated! Returning to deals page.");
        navigate("/deals");
      } else {
        const postDeal = async () => {
          await axios.post(
            `${baseURL}/deals`,

            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert("Deal created! Returning to companies page.");
          navigate("/deals");
        };
        postDeal();
      }
    }
  };

  useEffect(() => {
    const getformData = async () => {
      const response = await axios.get(`${baseURL}/deals/${dealId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (isEditMode) {
        setFormData({
          deal_name: response.data[0].deal_name,
          description: response.data[0].description,
          value: response.data[0].value,
          percent_certainty: response.data[0].percent_certainty,
          expected_sale_date: response.data[0].expected_sale_date,
          company_id: response.data[0].company_id,
          company_name: response.data[0].company_name,
        });
      }
    };
    getformData();
  }, [baseURL, dealId]);

  const renderError = (label) => (
    <div
      className={`add-edit-deal__error-field ${
        submitted && !label ? "add-edit-deal__error-field--displayed" : ""
      }`}
    >
      <p>{`Field is required`}</p>
    </div>
  );

  //Get list of companies

  const getCompanyList = async () => {
    const response = await axios.get(`${baseURL}/companies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const allCompanies = response.data.map((singleCompany) => {
      return singleCompany;
    });
    const uniqueCompanies = [];
    allCompanies.forEach((uniqueCompany) => {
      if (uniqueCompanies.indexOf(uniqueCompany) === -1) {
        uniqueCompanies.push(uniqueCompany);
      }
    });
    setCompanyList(uniqueCompanies);
  };

  useEffect(() => {
    getCompanyList();
  }, []);

  return (
    <section className="add-edit-deal">
      <div className="add-edit-deal__top">
        <h2 className="add-edit-deal__heading">
          {isEditMode ? `Edit ${formData.deal_name}` : "Create a New Deal"}
        </h2>
        <Link to="/deals">
          <button className="add-edit-deal__button-top">Go Back</button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="add-edit-deal__form">
        <p className="add-edit-deal__label">Deal Name</p>
        <input
          className={`add-edit-deal__input-text ${
            submitted && !formData.deal_name
              ? "add-edit-deal__input-text--error"
              : ""
          }`}
          onChange={handleChange}
          value={formData.deal_name}
          name="deal_name"
          type="text"
          placeholder={
            isEditMode ? `${formData.deal_name}` : "Please Enter Deal Name"
          }
        />
        {renderError(formData.deal_name)}
        <p className="add-edit-deal__label">Deal Description</p>
        <input
          className={`add-edit-deal__input-text ${
            submitted && !formData.description
              ? "add-edit-deal__input-text--error"
              : ""
          }`}
          type="text"
          name="description"
          onChange={handleChange}
          value={formData.description}
          placeholder={
            isEditMode
              ? `${formData.description}`
              : "Please Enter Deal Description"
          }
        />
        {renderError(formData.description)}
        <p className="add-edit-deal__label">Value</p>
        <input
          className={`add-edit-deal__input-text ${
            submitted && !formData.value
              ? "add-edit-deal__input-text--error"
              : ""
          }`}
          type="text"
          name="value"
          onChange={handleChange}
          value={formData.value}
          placeholder={
            isEditMode ? `${formData.value}` : "Please Enter Deal Value"
          }
        />
        {renderError(formData.value)}
        <p className="add-edit-deal__label">Percentage Certainty</p>
        <input
          className={`add-edit-deal__input-text ${
            submitted && !formData.percent_certainty
              ? "add-edit-deal__input-text--error"
              : ""
          }`}
          type="text"
          name="percent_certainty"
          onChange={handleChange}
          value={formData.percent_certainty}
          placeholder={
            isEditMode
              ? `${formData.percent_certainty}`
              : "Please Enter Deal Percentage Certainty"
          }
        />
        {renderError(formData.percent_certainty)}
        <p className="add-edit-deal__label">Expected Sale Date</p>
        <input
          className={`add-edit-deal__input-text ${
            submitted && !formData.expected_sale_date
              ? "add-edit-deal__input-text--error"
              : ""
          }`}
          type="text"
          name="expected_sale_date"
          onChange={handleChange}
          value={formData.expected_sale_date}
          placeholder={
            isEditMode
              ? `${formData.expected_sale_date}`
              : "Please Enter an Expected Sale Date"
          }
        />
        {renderError(formData.expected_sale_date)}
        <p className="add-edit-deal__label">Company Name</p>
        <select
          name="company_id"
          onChange={handleChange}
          value={formData.company_id}
          className={`add-edit-deal__input-text ${
            submitted && !formData.company_name
              ? "add-edit-deal__input-text--error"
              : ""
          }`}
        >
          <option value="">
            {isEditMode ? `${formData.company_name}` : `Please Select`}
          </option>
          {companyList.map((uniqueValue, index) => {
            return (
              <option key={index} value={uniqueValue.id}>
                {uniqueValue.company_name}
              </option>
            );
          })}
        </select>

        {renderError(formData.company_id)}

        <button className="add-edit-deal__button-bottom">{`${
          isEditMode ? "Update Deal" : "Create Deal"
        }`}</button>
      </form>
    </section>
  );
};

export default AddEditDeal;
