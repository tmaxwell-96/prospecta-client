import "./AddEditCompany.scss";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const AddEditCompany = () => {
  const baseURL = "http://localhost:8080";
  //Check if editmode
  const { companyId } = useParams();
  const isEditMode = !!companyId;

  //Get specific company details
  const [companyDetails, setCompanyDetails] = useState({});

  useEffect(() => {
    const getCompanyDetails = async () => {
      const response = await axios.get(`${baseURL}/companies/${companyId}`);
      setCompanyDetails(response.data[0]);
    };
    getCompanyDetails();
  }, [companyId]);

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

      <form>
        <p className="add-edit-company__label">Company Name</p>
        <input
          className="add-edit-company__input-text"
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
          placeholder={
            isEditMode ? `${companyDetails.city}` : "Please Enter City"
          }
        />
        <p className="add-edit-company__label">Country</p>
        <input
          className="add-edit-company__input-text"
          type="text"
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
          placeholder={
            isEditMode
              ? `${companyDetails.contact_email}`
              : "Please Enter Contact Email"
          }
        />
      </form>
    </section>
  );
};

export default AddEditCompany;
