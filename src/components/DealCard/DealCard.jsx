import "./DealCard.scss";
import edit from "../../assets/icons/edit-24px-white.svg";
import { formatNumberWithCommas } from "../../functions/functions";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import DeleteDeal from "../DeleteDeal/DeleteDeal";

Modal.setAppElement("#root");

const DealCard = ({ deal, deleteDeal }) => {
  const percentage = deal.percent_certainty;
  const certaintyNumber = percentage.replace(/%/g, "");

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
              Math.floor((Number(certaintyNumber) / 100) * deal.value)
            )}`}</p>
            <p className="deal-card__label">Expected Sale Date</p>
            <p className="deal-card__text">{deal.expected_sale_date}</p>
          </div>
        </div>
        <Link className="deal-card__edit" to={`/edit-deal/${deal.id}`}>
          <img src={edit} alt="edit" />
        </Link>
        <div className="deal-card__delete">
          <DeleteDeal deleteDeal={deleteDeal} deal={deal} />
        </div>
      </div>
    </section>
  );
};

export default DealCard;
