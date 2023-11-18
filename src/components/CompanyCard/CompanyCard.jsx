import "./CompanyCard.scss";
import edit from "../../assets/icons/edit-24px-white.svg";

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
        <img className="company-card__edit" src={edit} alt="edit" />
      </div>
    </section>
  );
};

export default CompanyCard;
