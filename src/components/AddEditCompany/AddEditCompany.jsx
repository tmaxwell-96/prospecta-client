import "./AddEditCompany.scss";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const AddEditCompany = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  //Check if editmode
  const { companyId } = useParams();
  const isEditMode = !!companyId;

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  //Get specific company details
  const [companyDetails, setCompanyDetails] = useState({});

  useEffect(() => {
    const getCompanyDetails = async () => {
      const response = await axios.get(`${baseURL}/companies/${companyId}`);
      setFormData(response.data[0]);
    };
    getCompanyDetails();
  }, [baseURL, companyId]);

  //Handle form data

  return (
    <section className="add-edit-company">
      <h2 className="add-edit-company__heading">
        {isEditMode
          ? `Edit ${companyDetails.company_name}`
          : "Create a New Company"}
      </h2>
      <Link to="/companies">
        <button>Go Back</button>
      </Link>

      <form onSubmit={handleSubmit} className="add-edit-company__form">
        <p className="add-edit-company__label">Company Name</p>
        <input
          className="add-edit-company__input-text"
          onChange={handleChange}
          value={formData.company_name}
          name="company_name"
          type="text"
          placeholder={
            isEditMode
              ? `${companyDetails.company_name}`
              : "Please Enter Company Name"
          }
        />
        <p className="add-edit-company__label">Company Address</p>
        <input
          className="add-edit-company__input-text"
          type="text"
          name="address"
          onChange={handleChange}
          value={formData.address}
          placeholder={
            isEditMode
              ? `${companyDetails.address}`
              : "Please Enter Company Address"
          }
        />
        <p className="add-edit-company__label">City</p>
        <input
          className="add-edit-company__input-text"
          type="text"
          name="city"
          onChange={handleChange}
          value={formData.city}
          placeholder={
            isEditMode ? `${companyDetails.city}` : "Please Enter City"
          }
        />
        <p className="add-edit-company__label">Country</p>
        <input
          className="add-edit-company__input-text"
          type="text"
          name="country"
          onChange={handleChange}
          value={formData.country}
          placeholder={
            isEditMode
              ? `${companyDetails.country}`
              : "Please Enter Company Name"
          }
        />
        <p className="add-edit-company__label">Main Contact</p>
        <input
          className="add-edit-company__input-text"
          type="text"
          name="contact_name"
          onChange={handleChange}
          value={formData.contact_name}
          placeholder={
            isEditMode
              ? `${companyDetails.contact_name}`
              : "Please Enter Main Company Contact"
          }
        />
        <p className="add-edit-company__label">Contact Position</p>
        <input
          className="add-edit-company__input-text"
          type="text"
          name="contact_position"
          onChange={handleChange}
          value={formData.contact_position}
          placeholder={
            isEditMode
              ? `${companyDetails.contact_position}`
              : "Please Enter Contact Position"
          }
        />
        <p className="add-edit-company__label">Contact Phone</p>
        <input
          className="add-edit-company__input-text"
          type="text"
          name="contact_phone"
          onChange={handleChange}
          value={formData.contact_phone}
          placeholder={
            isEditMode
              ? `${companyDetails.contact_phone}`
              : "Please Enter Contact Main Phone"
          }
        />
        <p className="add-edit-company__label">Contact Email</p>
        <input
          className="add-edit-company__input-text"
          type="text"
          name="contact_email"
          onChange={handleChange}
          value={formData.contact_email}
          placeholder={
            isEditMode
              ? `${companyDetails.contact_email}`
              : "Please Enter Contact Email"
          }
        />
        <button className="add-edit-company__button">Create Company</button>
      </form>
    </section>
  );
};

export default AddEditCompany;
