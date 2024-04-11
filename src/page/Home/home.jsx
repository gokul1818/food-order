import React, { useState } from "react";
import Navbar from "../../components/navBar";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, removeCartItem } from "../../redux/reducers/cartSlice";
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

function Home() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const [selectedList, setSelectedList] = useState(foodItems[0]);

  const [selectedFoodList, setSelectedFoodList] = useState(null);
  const [addToCartBtnLabels, setAddToCartBtnLabels] = useState(
    Array(foodItems.length).fill("Add to Cart")
  );

  const [itemQuantities, setItemQuantities] = useState(
    Array(foodItems.length).fill(0)
  );

  // Define an array of food items

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

  const handleFoodItemClick = (index) => {
    setSelectedList(index);
  };

  const addToCart = (item, index) => {
    dispatch(addCartItem({ item, quantity: 1 }));

    const newLabels = [...addToCartBtnLabels];
    newLabels[index] = "Plus";
    setAddToCartBtnLabels(newLabels);

    const newQuantities = [...itemQuantities];
    newQuantities[index]++;
    setItemQuantities(newQuantities);
  };

  const removeFromCart = (item, index) => {
    dispatch(removeCartItem({ item, quantity: 1 }));
    const newQuantities = [...itemQuantities];
    newQuantities[index]--;
    setItemQuantities(newQuantities);

    if (newQuantities[index] === 0) {
      const newLabels = [...addToCartBtnLabels];
      newLabels[index] = "Add to Cart";
      setAddToCartBtnLabels(newLabels);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mt-5 pt-3">
        <p className="nav-label">Delicious food for you </p>
      </div>
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
          {foodData
            .filter((item) => item?.category === selectedList)
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
                    {selectedFoodList == index && (
                      <div className="d-flex justify-content-evenly my-3 w-100 ">
                        {addToCartBtnLabels[index] === "Add to Cart" ? (
                          <button
                            className="food-list-cart-btn"
                            onClick={() => addToCart(item, index)}
                          >
                            {addToCartBtnLabels[index]}
                          </button>
                        ) : (
                          <div className="d-flex align-items-center justify-content-evenly w-100">
                            <button
                              className="food-list-cart-btn"
                              onClick={() => removeFromCart(item, index)}
                            >
                              -
                            </button>
                            <span className="food-list-quantity mx-3 ">
                              {itemQuantities[index]}
                            </span>
                            <button
                              className="food-list-cart-btn"
                              onClick={() => addToCart(item, index)}
                            >
                              +
                            </button>
                          </div>
                        )}
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
