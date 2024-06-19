import { collection, getDocs } from "firebase/firestore";
import { Howl } from "howler";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clickSound from "../../assets/effect/clickSound.mp3";
import trashSound from "../../assets/effect/trash.mp3";
import ribbonIcon from "../../assets/images/ribbon.png";
import { db } from "../../firebaseConfig";
import { addCartItem, removeCartItem } from "../../redux/reducers/cartSlice";
import NormalBtn from "../normalButton";
import "./styles.css";
import { Box } from "@mui/material";

export const OfferCard = ({ item, type = 1, index }) => {
  // console.log(item, "item");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const isColumn = type === 1;

  const [foodItems, setFoodItems] = useState([]);

  const [addToCartBtnLabels, setAddToCartBtnLabels] = useState(
    Array(foodItems.length).fill("Add to Cart")
  );

  const [itemQuantities, setItemQuantities] = useState(
    Array(foodItems.length).fill(0)
  );

  const cartSound = new Howl({
    src: [clickSound],
    volume: 1,
  });
  const trash = new Howl({
    src: [trashSound],
    volume: 0.5,
  });

  const addToCart = (item, id) => {
    console.log(item, id, "add to cart item details")
    // cartSound.play();
    dispatch(addCartItem({ item, quantity: 1 }));

    const newLabels = [...addToCartBtnLabels];
    newLabels[index] = "Plus";
    setAddToCartBtnLabels(newLabels);

    const newQuantities = [...itemQuantities];
    newQuantities[index]++;
    setItemQuantities(newQuantities);
  };

  const removeFromCart = (item, id) => {
    console.log(item, id, "remove from cart item details")

    // trash.play();

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

  // console.log(item, "item");

  return (
    <div>
      {Boolean(isColumn) ? (
        <div className="body">
          <div className="card-view">
            <div className="image-view">
              <img src={item.img} alt="img" className="card-image" />
              {item.type === "combo" && (
                <img src={item.img[1]} alt="img" className="card-image1" />
              )}
            </div>
            <div className="trend-tag">
              <p className="trend-type">
                {" "}
                {item.type} {item?.offer}%
                <br />
                <div className="d-flex">
                  <p className="text-strict mb-0">₹{item.price}</p>

                  <p className=" ms-2 mb-0 " style={{ color: "green" }}>
                    ₹{item.priceAfterOffer}
                  </p>
                </div>
              </p>
            </div>
            <div className="view-details ">
              <div className="name-view">
                <p className="name">
                  {Array.isArray(item?.dishName)
                    ? item.dishName.join(" + ")
                    : item.dishName}
                </p>
                <p className="name">₹ {item?.priceAfterOffer}</p>
              </div>
              <div className="btn-container">
                {itemQuantity(item) > 0 ? (
                  <div className="d-flex align-items-center justify-content-evenly w-100 animation-ease-in">
                    <NormalBtn
                      btnlabel={"-"}
                      className={"food-increase-btn-hz"}
                      onClick={() => removeFromCart(item, item.id)}
                    />
                    <span className="food-list-quantity mx-3">
                      {itemQuantity(item)}
                    </span>
                    <NormalBtn
                      btnlabel={"+"}
                      className={"food-increase-btn-hz"}
                      onClick={() => addToCart(item, item.id)}
                    />
                  </div>
                ) : (
                  <NormalBtn
                    btnlabel={"Add to cart"}
                    className={"food-list-btn"}
                    onClick={() => addToCart(item, item.id)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="body-hz">
          <div className="card-view-hz">
            <div className="image-view-hz">
              <img src={item.img} alt="img" className="card-image-hz" />
              {item.type === "combo" && (
                <img src={item.img[1]} alt="img" className="card-image1-hz" />
              )}
              <p className="name-hz">
                {Array.isArray(item?.dishName)
                  ? item.dishName.join(" + ")
                  : item.dishName}
              </p>
              <p className="name-hz">₹ {item?.priceAfterOffer}</p>
            </div>
            <div className="trend-tag-hz">
              <p className="trend-type-hz">
                {" "}
                {item.type} {item?.offer}%
              </p>
            </div>
            {/* <div className="ribbon-container-hz">
              <p className="type">{item?.type}</p>
              <img src={ribbonIcon} alt="img" className="ribbon-hz" />
            </div> */}

            {/* <p className="name-hz">{item?.price}</p> */}
            {itemQuantity(item) > 0 ? (
              <div className="d-flex align-items-center justify-content-evenly w-100 animation-ease-in">
                <NormalBtn
                  btnlabel={"-"}
                  className={"food-increase-btn-hz"}
                  onClick={() => removeFromCart(item)}
                />
                <span className="food-list-quantity mx-3">
                  {itemQuantity(item)}
                </span>
                <NormalBtn
                  btnlabel={"+"}
                  className={"food-increase-btn-hz"}
                  onClick={() => addToCart(item)}
                />
              </div>
            ) : (
              <NormalBtn
                btnlabel={"Add to cart "}
                className={"food-list-btn-hz "}
                onClick={() => addToCart(item)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
