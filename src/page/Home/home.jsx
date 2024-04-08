import React, { useState } from "react";
import Navbar from "../../components/navBar";
import "./style.css";
import { FaShoppingCart } from "react-icons/fa";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Home() {
  const [selectedList, setSelectedList] = useState(0);

  const [selectedFoodList, setSelectedFoodList] = useState(null);

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
      dishName: "Idli with Sambar and Chutney",
      price: "₹120",
      img: "https://www.healthifyme.com/blog/wp-content/uploads/2021/10/All-About-The-Right-Food-Plate-Method.jpg",
    },
    {
      dishName: "Dosa with Tomato and Onion Chutney",
      price: "₹150",
      img: "https://www.healthifyme.com/blog/wp-content/uploads/2021/10/All-About-The-Right-Food-Plate-Method.jpg",
    },
    {
      dishName: "Masala Dosa",
      price: "₹180",
      img: "https://www.healthifyme.com/blog/wp-content/uploads/2021/10/All-About-The-Right-Food-Plate-Method.jpg",
    },
    {
      dishName: "Uttapam",
      price: "₹130",
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
        <div className="d-flex mb-5">
          {foodData.map((item, index) => (
            <div
              key={index}
              className="food-data-item"
              onClick={() => setSelectedFoodList(index)}
            >
              <div className="">
                <div className="food-list-img-container">
                  <img
                    className={
                      selectedFoodList === index
                        ? "selected-food-list-img"
                        : "food-list-img"
                    }
                    src={item?.img}
                    alt="img"
                  />
                </div>
                <div
                  className={
                    selectedFoodList === index
                      ? "selected-food-data-item-container"
                      : "food-data-item-container"
                  }
                >
                  <p
                    className={
                      selectedFoodList === index
                        ? "selected-food-list-dish-name"
                        : "food-list-dish-name"
                    }
                  >
                    {item?.dishName.length > 20 && selectedFoodList !== index
                      ? item?.dishName.slice(0, 20) + "..."
                      : item?.dishName}
                  </p>
                  <p className="food-list-dish-price">{item?.price}</p>
                  {selectedFoodList === index && (
                    <div className="d-flex my-3">
                      <button className="food-list-cart-btn">
                        Add to Cart
                      </button>
                      {/* <ShoppingCartIcon className="cart-icon" /> */}
                    </div>
                  )}
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
