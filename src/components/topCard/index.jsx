import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebaseConfig";
import { addCartItem, removeCartItem } from "../../redux/reducers/cartSlice";
import NormalBtn from "../normalButton";
import "./styles.css";

export const TopCard = ({ item, type = 1, index }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const [foodItems, setFoodItems] = useState([]);

  const [addToCartBtnLabels, setAddToCartBtnLabels] = useState(
    Array(foodItems.length).fill("Add to Cart")
  );

  const [itemQuantities, setItemQuantities] = useState(
    Array(foodItems.length).fill(0)
  );

  const addToCart = (item, id) => {
    console.log(item, id, "add to cart item details");
    dispatch(addCartItem({ item, quantity: 1 }));

    const newLabels = [...addToCartBtnLabels];
    newLabels[index] = "Plus";
    setAddToCartBtnLabels(newLabels);

    const newQuantities = [...itemQuantities];
    newQuantities[index]++;
    setItemQuantities(newQuantities);
  };

  const removeFromCart = (item, id) => {
    console.log(item, id, "remove from cart item details");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFoodItems(items);
      } catch (e) {
        console.error("Error fetching documents: ", e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card">
      <div
        className="d-flex flex-column"
        style={{ width: "800px" }}
      >
        <p className="trend">
          Get Upto {item?.offer}% in {item.type}
          <br />
        </p>
        <p className="name-view">
          {Array.isArray(item?.dishName)
            ? item.dishName.join(" + ")
            : item.dishName}
        </p>
        <div className="d-flex align-items-center">
          <p className="strict-text">{`₹${item.price}`}</p>
          <p className="green-price">
            ₹{item.priceAfterOffer}
          </p>
        </div>

          {itemQuantity(item) > 0 ? (
            <div className="d-flex align-items-center justify-content-evenly w-75 animation-ease-in">
              <NormalBtn
                btnlabel={"-"}
                className={"food-btn-hz"}
                onClick={() => removeFromCart(item, item.id)}
              />
              <span className="food-list-quantity mx-3">
                {itemQuantity(item)}
              </span>
              <NormalBtn
                btnlabel={"+"}
                className={"food-btn-hz"}
                onClick={() => addToCart(item, item.id)}
              />
            </div>
          ) : (
            <NormalBtn
              btnlabel={"Add to cart"}
              className={"food-list-button"}
              onClick={() => addToCart(item, item.id)}
            />
          )}

      </div>
      <div className="image-view">
        <img src={item.img} alt="img" className="image" />
        {item.type === "combo" && (
          <img src={item.img[1]} alt="img" className="image1" />
        )}
      </div>
    </div>
  );
};