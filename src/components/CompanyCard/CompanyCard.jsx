import "./CompanyCard.scss";
import edit from "../../assets/icons/edit-24px-white.svg";
import DeleteDeal from "../DeleteDeal/DeleteDeal";
import { Link } from "react-router-dom";
import DeleteCompany from "../DeleteCompany/DeleteCompany";

const CompanyCard = ({ company, deleteCompany }) => {
  return (
    <section className="company-card">
      <h2 className="company-card__name">{company.company_name}</h2>

      <div className="company-card__content">
        <div className="company-card__content-lower">
          <div className="company-card__content-left">
            <p className="company-card__label">Main Contact</p>
            <p className="company-card__text">{company.contact_name}</p>
            <p className="company-card__label">Position</p>
            <p className="company-card__text">{company.contact_position}</p>
            <p className="company-card__label">Contact Phone</p>
            <p className="company-card__text">{company.contact_phone}</p>
            <p className="company-card__label">Contact Email</p>
            <p className="company-card__text">{company.contact_email}</p>
          </div>
          <div className="company-card__content-right">
            <p className="company-card__label">Address</p>
            <p className="company-card__text">{company.address}</p>
            <p className="company-card__label">City</p>
            <p className="company-card__text">{company.city}</p>
            <p className="company-card__label">Country</p>
            <p className="company-card__text">{company.country}</p>
          </div>
        </div>
        <Link className="deal-card__edit-link" to={`/edit-deal/${company.id}`}>
          <img className="deal-card__edit" src={edit} alt="edit" />
        </Link>
        <div className="deal-card__delete">
          <DeleteCompany deleteCompany={deleteCompany} company={company} />
        </div>
      </div>
    </section>
  );
};

export default CompanyCard;
