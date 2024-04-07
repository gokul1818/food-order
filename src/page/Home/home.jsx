import React, { useState } from "react";
import Navbar from "../../components/navBar";
import "./style.css";

function Home() {
  const [selectedList, setSelectedList] = useState(0);
  // Define an array of food items
  const foodItems = [
    "Foods",
    "Drinks",
    "Snacks",
    "Foods",
    "Drinks",
    "Snacks",
    "Foods",
    "Drinks",
    "Snacks",
    "Foods",
    "Drinks",
    "Snacks",
  ];

  return (
    <div>
      <Navbar />
      <div className="mt-5 pt-3">
        <p className="nav-label">Delicious food for you</p>
      </div>
      {/* Search Input with search icon */}
      <div className="d-flex justify-content-center align-items-center mt-3">
        <div className="search-container">
          <i className="search-icon fas fa-search"></i>
          <input
            type="text"
            placeholder="Search for delicious food..."
            className="search-input"
          />
        </div>
      </div>
      <div className="horizontal-scroll">
        <div className="food-list">
          {foodItems.map((item, index) => (
            <div key={index} className="food-item">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
