import React, { useState } from "react";
import Navbar from "../../components/navBar";
import "./style.css";

function Home() {
  const [selectedList, setSelectedList] = useState(0); // Initialize with -1 to indicate no selection
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
  const foodData = [
    {
      dishName: "Veg maggie with samosa",
      price: "₹400",
      img: "https://www.healthifyme.com/blog/wp-content/uploads/2021/10/All-About-The-Right-Food-Plate-Method.jpg",
    },
    {
      dishName: "Veg maggie with tomoto and onion",
      price: "₹400",
      img: "https://www.healthifyme.com/blog/wp-content/uploads/2021/10/All-About-The-Right-Food-Plate-Method.jpg",
    },
    {
      dishName: "Veg maggie",
      price: "₹400",
      img: "https://www.healthifyme.com/blog/wp-content/uploads/2021/10/All-About-The-Right-Food-Plate-Method.jpg",
    },
    {
      dishName: "Veg maggie",
      price: "₹400",
      img: "https://www.healthifyme.com/blog/wp-content/uploads/2021/10/All-About-The-Right-Food-Plate-Method.jpg",
    },
  ];

  // Function to handle food item click
  const handleFoodItemClick = (index) => {
    setSelectedList(index); // Set selected index
  };

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
            <div
              key={index}
              className="food-item"
              onClick={() => handleFoodItemClick(index)}
            >
              <p className={selectedList === index ? "selected" : "unselected"}>
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="horizontal-scroll">
        <div className="d-flex mb-5 ">
          {foodData.map((item, index) => (
            <div key={index} className="food-data-item">
              <div className="">
                <div className="food-list-img-container">
                  {/* Apply box shadow to the image */}
                  <img className="food-list-img" src={item?.img} alt="img" />
                </div>
                <div className="food-data-item-container">
                  <p className="food-list-dish-name">
                    {item?.dishName.length > 20
                      ? item?.dishName.slice(0,20) + "..."
                      : item?.dishName}
                  </p>
                  <p className="food-list-dish-price">{item?.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
