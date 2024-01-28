import "./AddEditCompany.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const AddEditCompany = () => {
  const token = sessionStorage.getItem("JWTtoken");
  const baseURL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  //Check if editmode
  const { companyId } = useParams();
  const isEditMode = !!companyId;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    company_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  });

  //Form Validation
  //----------------------------

  const isFormValid = () => {
    if (
      !formData.company_name ||
      !formData.address ||
      !formData.city ||
      !formData.country ||
      !formData.contact_name ||
      !formData.contact_position ||
      !formData.contact_phone ||
      !formData.contact_email
    ) {
      return false;
    } else {
      return true;
    }
  };

  //Handle Form Data
  //----------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (isFormValid()) {
      if (isEditMode) {
        const changeCompany = async () => {
          await axios.put(
            `${baseURL}/companies/${companyId}`,

            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        };
        changeCompany();
        alert("Company updated! Returning to companies page.");
        navigate("/companies");
      } else {
        const postCompany = async () => {
          await axios.post(
            `${baseURL}/companies`,

            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert("Company created! Returning to companies page.");
          navigate("/companies");
        };
        postCompany();
      }
    }
  };

  //Get specific company details
  //----------------------------

  useEffect(() => {
    const getformData = async () => {
      const response = await axios.get(`${baseURL}/companies/${companyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (isEditMode) {
        setFormData({
          company_name: response.data[0].company_name,
          address: response.data[0].address,
          city: response.data[0].city,
          country: response.data[0].country,
          contact_name: response.data[0].contact_name,
          contact_position: response.data[0].contact_position,
          contact_phone: response.data[0].contact_phone,
          contact_email: response.data[0].contact_email,
        });
      }
    };
    getformData();
  }, [baseURL, companyId, isEditMode, token]);

  const renderError = (label) => (
    <div
      className={`add-edit-company__error-field ${
        submitted && !label ? "add-edit-company__error-field--displayed" : ""
      }`}
    >
      <p>{`Field is required`}</p>
    </div>
  );

  return (
    <section className="add-edit-company">
      <div className="add-edit-company__top">
        <h2 className="add-edit-company__heading">
          {isEditMode
            ? `Edit ${formData.company_name}`
            : "Create a New Company"}
        </h2>
        <Link to="/companies">
          <button className="add-edit-company__button-top">Go Back</button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="add-edit-company__form">
        <p className="add-edit-company__label">Company Name</p>
        <input
          className={`add-edit-company__input-text ${
            submitted && !formData.company_name
              ? "add-edit-company__input-text--error"
              : ""
          }`}
          onChange={handleChange}
          value={formData.company_name}
          name="company_name"
          type="text"
          placeholder={
            isEditMode
              ? `${formData.company_name}`
              : "Please Enter Company Name"
          }
        />
        {renderError(formData.company_name)}
        <p className="add-edit-company__label">Company Address</p>
        <input
          className={`add-edit-company__input-text ${
            submitted && !formData.address
              ? "add-edit-company__input-text--error"
              : ""
          }`}
          type="text"
          name="address"
          onChange={handleChange}
          value={formData.address}
          placeholder={
            isEditMode ? `${formData.address}` : "Please Enter Company Address"
          }
        />
        {renderError(formData.address)}
        <p className="add-edit-company__label">City</p>
        <input
          className={`add-edit-company__input-text ${
            submitted && !formData.city
              ? "add-edit-company__input-text--error"
              : ""
          }`}
          type="text"
          name="city"
          onChange={handleChange}
          value={formData.city}
          placeholder={isEditMode ? `${formData.city}` : "Please Enter City"}
        />
        {renderError(formData.city)}
        <p className="add-edit-company__label">Country</p>
        <input
          className={`add-edit-company__input-text ${
            submitted && !formData.country
              ? "add-edit-company__input-text--error"
              : ""
          }`}
          type="text"
          name="country"
          onChange={handleChange}
          value={formData.country}
          placeholder={
            isEditMode ? `${formData.country}` : "Please Enter Company Name"
          }
        />
        {renderError(formData.country)}
        <p className="add-edit-company__label">Main Contact</p>
        <input
          className={`add-edit-company__input-text ${
            submitted && !formData.contact_name
              ? "add-edit-company__input-text--error"
              : ""
          }`}
          type="text"
          name="contact_name"
          onChange={handleChange}
          value={formData.contact_name}
          placeholder={
            isEditMode
              ? `${formData.contact_name}`
              : "Please Enter Main Company Contact"
          }
        />
        {renderError(formData.contact_name)}
        <p className="add-edit-company__label">Contact Position</p>
        <input
          className={`add-edit-company__input-text ${
            submitted && !formData.contact_position
              ? "add-edit-company__input-text--error"
              : ""
          }`}
          type="text"
          name="contact_position"
          onChange={handleChange}
          value={formData.contact_position}
          placeholder={
            isEditMode
              ? `${formData.contact_position}`
              : "Please Enter Contact Position"
          }
        />
        {renderError(formData.contact_position)}
        <p className="add-edit-company__label">Contact Phone</p>
        <input
          className={`add-edit-company__input-text ${
            submitted && !formData.contact_phone
              ? "add-edit-company__input-text--error"
              : ""
          }`}
          type="text"
          name="contact_phone"
          onChange={handleChange}
          value={formData.contact_phone}
          placeholder={
            isEditMode
              ? `${formData.contact_phone}`
              : "Please Enter Contact Main Phone"
          }
        />
        {renderError(formData.contact_phone)}
        <p className="add-edit-company__label">Contact Email</p>
        <input
          className={`add-edit-company__input-text ${
            submitted && !formData.contact_email
              ? "add-edit-company__input-text--error"
              : ""
          }`}
          type="text"
          name="contact_email"
          onChange={handleChange}
          value={formData.contact_email}
          placeholder={
            isEditMode
              ? `${formData.contact_email}`
              : "Please Enter Contact Email"
          }
        />
        {renderError(formData.contact_email)}
        <button className="add-edit-company__button-bottom">{`${
          isEditMode ? "Update Company" : "Create Company"
        }`}</button>
      </form>
    </section>
  );
};

export default AddEditCompany;
