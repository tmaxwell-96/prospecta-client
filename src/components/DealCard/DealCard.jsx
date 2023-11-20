import "./DealCard.scss";
import edit from "../../assets/icons/edit-24px-white.svg";

const DealCard = ({ deal }) => {
  const percentage = deal.percent_certainty;
  const certaintyNumber = percentage.replace(/%/g, "");

  const formatNumberWithCommas = (number) => {
    let numberString = number.toString();
    numberString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return numberString;
  };

  return (
    <section className="deal-card">
      <h3 className="deal-card__name">{deal.deal_name}</h3>

      <div className="deal-card__content">
        <div className="deal-card__content-lower">
          <div className="deal-card__content-left">
            <p className="deal-card__label">Company Name</p>
            <p className="deal-card__text">{deal.company_name}</p>
            <p className="deal-card__label">Expected Value</p>
            <p className="deal-card__text">{`$${formatNumberWithCommas(
              deal.value
            )}`}</p>
            <p className="deal-card__label">Expected Certainty</p>
            <p className="deal-card__text">{deal.percent_certainty}</p>
            <p className="deal-card__label">Weighted Value</p>
            <p className="deal-card__text">{`$${formatNumberWithCommas(
              (Number(certaintyNumber) / 100) * deal.value
            )}`}</p>
            <p className="deal-card__label">Expected Sale Date</p>
            <p className="deal-card__text">{deal.expected_sale_date}</p>
          </div>
        </div>
        <img className="deal-card__edit" src={edit} alt="edit" />
      </div>
    </section>
  );
};

export default DealCard;
