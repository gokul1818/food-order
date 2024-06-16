import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navBar/index";
import { OfferCard } from "../../components/offerCard";
import { db } from "../../firebaseConfig";
import "./style.css";

function Offers() {
  const filterData = ["All", "Special", "Combo"];
  const [foodItems, setFoodItems] = useState([]);
  const [topRecArr, setTopRecArr] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleFilterClick = (filter) => {
    if (selectedFilter === filter) {
      setSelectedFilter("");
    } else {
      setSelectedFilter(filter);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "offers"),
      (querySnapshot) => {
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFoodItems(items);
        // Filter top recommended items
        const topRecItems = items.filter((offer) => offer.topRec === true);
        setTopRecArr(topRecItems);
      }
    );

    return () => unsubscribe();
  }, []);

  console.log(foodItems, "foodItems");

  const filteredOffers =
    selectedFilter === "All"
      ? foodItems
      : foodItems.filter(
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
        <h3 className="d-flex mt-5 pl-5">Top Recommended</h3>
        <div className="horizontal-view">
          {topRecArr.map((offer, index) => (
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
