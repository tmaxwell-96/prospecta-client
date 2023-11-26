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
          <div className="company-card__company-name">
            <p>{company.company_name}</p>
          </div>
          <div className="company-card__contact">
            <p className="company-card__label">Main Contact</p>
            <p className="company-card__text">{company.contact_name}</p>
            <p className="company-card__label">Position</p>
            <p className="company-card__text">{company.contact_position}</p>
          </div>
          <div className="company-card__details">
            <p className="company-card__label">Contact Phone</p>
            <p className="company-card__text">{company.contact_phone}</p>
            <p className="company-card__label">Contact Email</p>
            <p className="company-card__text">{company.contact_email}</p>
          </div>

          <div className="company-card__location">
            <p className="company-card__label">Address</p>
            <p className="company-card__text">{company.address}</p>
            <p className="company-card__label">City</p>
            <p className="company-card__text">{company.city}</p>
            <p className="company-card__label">Country</p>
            <p className="company-card__text">{company.country}</p>
          </div>
        </div>
        <div className="company-card__actions">
          <Link
            className="company-card__edit-link"
            to={`/edit-deal/${company.id}`}
          >
            <img className="company-card__edit" src={edit} alt="edit" />
          </Link>
          <div className="company-card__delete">
            <DeleteCompany deleteCompany={deleteCompany} company={company} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyCard;
