import "./CompanyCard.scss";

const CompanyCard = ({ company }) => {
  return (
    <section className="company-card">
      <h3>{company.company_name}</h3>
    </section>
  );
};

export default CompanyCard;
