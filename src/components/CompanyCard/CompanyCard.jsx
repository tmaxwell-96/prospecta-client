import "./CompanyCard.scss";
import edit from "../../assets/icons/edit-24px-white.svg";
import { Link } from "react-router-dom";

const CompanyCard = ({ company }) => {
  return (
    <section className="company-card">
      <h3 className="company-card__name">{company.company_name}</h3>

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
        <Link className="company-card__edit" to={`/edit-company/${company.id}`}>
          <img src={edit} alt="edit" />
        </Link>
      </div>
    </section>
  );
};

export default CompanyCard;
