import "./DealCard.scss";
import edit from "../../assets/icons/edit-24px-white.svg";
import { formatNumberWithCommas } from "../../functions/functions";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import DeleteDeal from "../DeleteDeal/DeleteDeal";
import moment from "moment";

Modal.setAppElement("#root");

const DealCard = ({ deal, deleteDeal, index }) => {
  const percentage = deal.percent_certainty;
  const certaintyNumber = percentage.replace(/%/g, "");

  return (
    <section
      className={`deal-card ${
        index % 2 === 1 ? "deal-card__alternate-background" : ""
      }`}
    >
      <h2 className="deal-card__name">{deal.deal_name}</h2>

      <div className="deal-card__content">
        <div className="deal-card__content-container">
          <div className="deal-card__deal-name">
            <p className="deal-card__label">Deal Name</p>
            <p className="deal-card__text">{deal.deal_name}</p>
          </div>
          <div className="deal-card__company-name">
            <p className="deal-card__label">Company Name</p>
            <p className="deal-card__text">{deal.company_name}</p>
          </div>
          <div className="deal-card__expected">
            <p className="deal-card__label">Expected Value</p>
            <p className="deal-card__text">{`$${formatNumberWithCommas(
              deal.value
            )}`}</p>
            <p className="deal-card__label">Expected Certainty</p>
            <p className="deal-card__text">{deal.percent_certainty}</p>
          </div>
          <div className="deal-card__weighted">
            <p className="deal-card__label">Weighted Value</p>
            <p className="deal-card__text">{`$${formatNumberWithCommas(
              Math.floor((Number(certaintyNumber) / 100) * deal.value)
            )}`}</p>
            <p className="deal-card__label">Expected Sale Date</p>
            <p className="deal-card__text">
              {moment(deal.expected_sale_date).format("MM/DD/YYYY")}{" "}
            </p>
          </div>

          <Link className="deal-card__mobile-link" to={`/deals/${deal.id}`}>
            <button className="deal-card__button deal-card__button--mobile">
              Full Details
            </button>
          </Link>
        </div>
        <div className="deal-card__actions">
          <Link className="deal-card__edit-link" to={`/edit-deal/${deal.id}`}>
            <img className="deal-card__edit" src={edit} alt="edit" />
          </Link>
          <div className="deal-card__delete">
            <DeleteDeal deleteDeal={deleteDeal} deal={deal} />
          </div>
        </div>
      </div>
      <Link className="deal-card__wide-link" to={`/deals/${deal.id}`}>
        <button className="deal-card__button deal-card__button--wide">
          Full Details
        </button>
      </Link>
    </section>
  );
};

export default DealCard;
