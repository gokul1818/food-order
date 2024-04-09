import React, { useState } from "react";
import Navbar from "../../components/navBar";
import "./style.css";

function Home() {
  const [selectedList, setSelectedList] = useState(0);

  const [selectedFoodList, setSelectedFoodList] = useState(null);

  // Define an array of food items
  const foodItems = [
    "South Indian",
    "Main Courses",
    "Foods",
    "Drinks",
    "Snacks",
    "Desserts",
    "Appetizers",
    "Side Dishes",
    "Salads",
    "Soups",
    "Beverages",
  ];

  const foodData = [
    {
      dishName: "Idli with Sambar and Chutney",
      price: "₹120",
      img: "https://m.economictimes.com/thumb/msid-99118050,width-1200,height-900,resizemode-4,imgsize-64776/idli_istock.jpg",
      category: "South Indian",
    },
    {
      dishName: "Dosa with Tomato and Onion Chutney",
      price: "₹150",
      img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/06/brown-rice-dosa-recipe.jpg",
      category: "South Indian",
    },
    {
      dishName: "Masala Dosa",
      price: "₹180",
      img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/06/brown-rice-dosa-recipe.jpg",
      category: "South Indian",
    },
    {
      dishName: "Uttapam",
      price: "₹130",
      img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/06/brown-rice-dosa-recipe.jpg",
      category: "South Indian",
    },
    {
      dishName: "Pongal",
      price: "₹140",
      img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/01/pongal-ven-pongal-500x500.jpg",
      category: "South Indian",
    },
    {
      dishName: "Vada with Sambar",
      price: "₹110",
      img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/06/brown-rice-dosa-recipe.jpg",
      category: "South Indian",
    },
    {
      dishName: "Rava Dosa",
      price: "₹160",
      img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/06/brown-rice-dosa-recipe.jpg",
      category: "South Indian",
    },
    {
      dishName: "Bisi Bele Bath",
      price: "₹170",
      img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/06/brown-rice-dosa-recipe.jpg",
      category: "South Indian",
    },
    {
      dishName: "Puliyogare",
      price: "₹150",
      img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/06/brown-rice-dosa-recipe.jpg",
      category: "South Indian",
    },
    {
      dishName: "Mysore Masala Dosa",
      price: "₹200",
      img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/06/brown-rice-dosa-recipe.jpg",
      category: "South Indian",
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
      <div className="horizontal-scroll mt-4">
        <div className="food-list">
          {foodItems.map((item, index) => (
            <div
              key={index}
              className="food-item"
              onClick={() => handleFoodItemClick(item)}
            >
              <p className={selectedList === item ? "selected" : "unselected"}>
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="horizontal-scroll">
        <div className="food-Data-list  mb-5">
        {console.log(selectedList)}
          {foodData
            .filter((item) => item?.category === selectedList) // Filter based on selectedList
            .map((item, index) => (
              <div
                key={index}
                className="food-data-item"
                onClick={() => setSelectedFoodList(index)}
              >
                <div className="position-relative">
                  <img
                    className={
                      selectedFoodList === index
                        ? "selected-food-list-img"
                        : "food-list-img"
                    }
                    src={item?.img}
                    alt="img"
                  />
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
