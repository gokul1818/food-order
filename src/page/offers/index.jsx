import React, { useState } from "react";
import Navbar from "../../components/navBar/index";
import { OfferCard } from "../../components/offerCard";
import OfferList from "../../offers.json";
import "./style.css";

function Offers() {
  const filterData = ["special", "combo", "kh", "lkj", "bnm"];

  const [selectedFilter, setSelectedFilter] = useState("");

  const handleFilterClick = (filter) => {
    if (selectedFilter === filter) {
      setSelectedFilter("");
    } else {
      setSelectedFilter(filter);
    }
  };

  const filteredOffers = selectedFilter
    ? OfferList.filter((offer) => offer.type.toLowerCase() === selectedFilter)
    : OfferList;

  return (
    <div className="bg-color">
      <Navbar />
      <div className="ease-in">
        <h2 className="mt-5 pt-5 d-flex flex-column justify-content-center align-items-center">
          Today's Offers
        </h2>
        <div className="horizontal-view">
          {filterData.map((filter, index) => (
            <div
              key={index}
              className={`filter-view ${
                selectedFilter === filter ? "selected" : ""
              }`}
              onClick={() => handleFilterClick(filter)}
            >
              <div className="filter-box">
                <p className="filter-style">
                  {filter}
                  {selectedFilter === filter && (
                    <span className="filter-style">×</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="horizontal-view">
          {filteredOffers.map((offer) => (
            <OfferCard key={offer.id} item={offer} type={2} />
          ))}
        </div>
        {filteredOffers.map((offer) => (
          <OfferCard key={offer.id} item={offer} type={1} />
        ))}
      </div>
    </div>
  );
}

export default Offers;
