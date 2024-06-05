import React, { useState } from "react";
import Modal from "../../components/modal/modal";
import Navbar from "../../components/navBar/index";
import { OfferCard } from "../../components/offerCard";
import OfferList from "../../offers.json";
import "./style.css";

function Offers() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const openModal = (offer) => {
    setSelectedOffer(offer);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedOffer(null);
  };

  return (
    <div className="bg-color ">
      <Navbar />
      <div className="ease-in  ">
        <h2 className="mt-5 pt-5 d-flex flex-column justify-content-center align-items-center">
          Today's Offers
        </h2>

        {OfferList.map((offer) => (
          <OfferCard
            key={offer.id}
            item={offer}
            // onClick={() => openModal(offer)}
          />
        ))}
        <Modal show={modalIsOpen} handleClose={() => setModalIsOpen(false)}>
          {selectedOffer && (
            <div>
              <h2 className="food-name">{selectedOffer.name}</h2>
              <p className="food-discount">
                Discount: {selectedOffer.discount}%
              </p>
              <p className="food-type">Type: {selectedOffer.type}</p>
              <div className="image-container">
                <img
                  src={selectedOffer.image}
                  alt={selectedOffer.name}
                  className="food-image"
                />
                {selectedOffer.type === "Combo" && (
                  <img
                    src={selectedOffer.image1}
                    alt={`${selectedOffer.name} combo`}
                    className="food-image1"
                  />
                )}
              </div>

              <button onClick={closeModal}>Close</button>
              <button onClick={closeModal}>Continue Order</button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default Offers;
