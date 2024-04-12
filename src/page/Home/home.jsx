import React, { useState } from "react";
import Navbar from "../../components/navBar";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, removeCartItem } from "../../redux/reducers/cartSlice";
import foodData from "../../foodData.json";
import NormalBtn from "../../components/normalButton";
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

  const itemQuantity = (item) => {
    const quantity = cart.filter((x) => x?.dishName == item?.dishName);
    return quantity[0]?.quantity;
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
                        {itemQuantity(item) === undefined ? (
                          <NormalBtn
                            btnlabel={"Add To Cart "}
                            className={"food-list-cart-btn"}
                            onClick={() => {
                              setTimeout(() => {
                                addToCart(item, index);
                              }, 500);
                            }}
                          />
                        ) : (
                          <div className="d-flex align-items-center justify-content-evenly w-100 animation-ease-in">
                            <NormalBtn
                              btnlabel={"-"}
                              className={"food-list-cart-btn"}
                              onClick={() => {
                                setTimeout(() => {
                                  removeFromCart(item, index);
                                }, 500);
                              }}
                            />
                            <span className="food-list-quantity mx-3">
                              {/* {cart[index].quantity} */}
                              {itemQuantity(item)}
                            </span>
                            <NormalBtn
                              btnlabel={"+"}
                              className={"food-list-cart-btn"}
                              onClick={() => {
                                setTimeout(() => {
                                  addToCart(item, index);
                                }, 500);
                              }}
                            />
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
