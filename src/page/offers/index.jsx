import React, { useState } from "react";
import Navbar from "../../components/navBar/index";
import { OfferCard } from "../../components/offerCard";
import OfferList from "../../offers.json";
import "./style.css";

function Offers() {
  const filterData = ["All", "Special", "Combo"];

  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleFilterClick = (filter) => {
    if (selectedFilter === filter) {
      setSelectedFilter("");
    } else {
      setSelectedFilter(filter);
    }
  };

  const filteredOffers = selectedFilter === "All"
    ? OfferList
    : OfferList.filter(
        (offer) => offer.type.toLowerCase() === selectedFilter.toLowerCase()
      );
      
  return (
    <div className="bg-color">
      <Navbar />
      <div className="ease-in">
        <h2 className="mt-5 pt-5 d-flex flex-column justify-content-center align-items-center">
          Today's Offers
        </h2>
        <div className="horizontal-filter">
          {filterData.map((filter, index) => (
            <div
              key={index}
              className={`filter-view ${
                selectedFilter === filter ? "selected" : ""
              }`}
              onClick={() => handleFilterClick(filter)}
            >
              <div className="filter-box">
                <p
                  className={`filter-style ${
                    selectedFilter === filter ? "selected" : ""
                  }`}
                >
                  {filter}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="horizontal-view">
          {filteredOffers.map((offer, index) => (
            <OfferCard key={offer.id} item={offer} index={index} type={2} />
          ))}
        </div>
        {filteredOffers.map((offer, index) => (
          <OfferCard key={offer.id} item={offer} index={index} type={1} />
        ))}
      </div>
    </div>
  );
}

export default Offers;
