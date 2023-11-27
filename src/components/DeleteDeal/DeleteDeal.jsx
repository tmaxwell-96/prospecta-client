import React, { useState } from "react";
import Modal from "react-modal";
import "./DeleteDeal.scss";

Modal.setAppElement("#root");

const DeleteDeal = ({ deal, deleteDeal }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button className="delete-deal__button" onClick={openModal}>
        Delete
      </button>
      <Modal
        className={`modal`}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <div className="modal__wrapper">
          <button onClick={closeModal} className="modal__close">
            Close
          </button>
          <h2 className="modal__title">{`Delete deal?`}</h2>
          <p>
            {`Please confirm that you'd like to delete ${deal.deal_name} from the list of deals`}
          </p>
          <p>This action cannot be undone.</p>

          <div className="modal__bottom">
            <button className="modal__cancel" onClick={closeModal}>
              Cancel
            </button>
            <button
              onClick={() => {
                deleteDeal(deal.id);
                closeModal();
              }}
              className="modal__delete"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteDeal;
