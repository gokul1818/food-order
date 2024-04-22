import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, createBrowserRouter, useN } from "react-router-dom";
import CartIcon from "../../assets/icon/cartIcon.svg";
import DeleteOutline from "../../assets/icon/delete.svg";

import NormalBtn from "../../components/normalButton";
import { addCartItem, removeCartItem } from "../../redux/reducers/cartSlice";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navBar";
import Lottie from "react-lottie";
import animationData from "../../assets/emptyCart.json";
import animationData1 from "../../assets/orderConfirm.json";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [proceedDone, setProceed] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const addToCart = (item, index) => {
    dispatch(addCartItem({ item, quantity: 1 }));

    // const newLabels = [...addToCartBtnLabels];
    // newLabels[index] = "Plus";
    // setAddToCartBtnLabels(newLabels);

    // const newQuantities = [...itemQuantities];
    // newQuantities[index]++;
    // setItemQuantities(newQuantities);
  };

  const removeFromCart = (item, index) => {
    dispatch(removeCartItem({ item, quantity: 1 }));
    // const newQuantities = [...itemQuantities];
    // newQuantities[index]--;
    // setItemQuantities(newQuantities);

    // if (newQuantities[index] === 0) {
    //   const newLabels = [...addToCartBtnLabels];
    //   newLabels[index] = "Add to Cart";
    //   setAddToCartBtnLabels(newLabels);
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => {
    const itemPrice = parseFloat(item.price.replace("₹", ""));
    const itemQuantity = parseInt(item.quantity);
    return total + itemPrice * itemQuantity;
  }, 0);

  return (
    <div className="bg-color ">
      {/* <div className=" d-flex justify-content-start mt-4 ms-4 align-items-center">
        <Link to="/">
          <ArrowBackIosIcon style={{ color: "black" }} />
        </Link>

        <p className="cart-label pe-5 "> Cart</p>
      </div> */}
      <Navbar />
      <div className="ease-in">
        {cart.length > 0 && !proceedDone ? (
          <>
            <div className="mt-5 pt-5 d-flex justify-content-center  flex-wrap">
              {cart.map((item, index) => (
                <div key={index} className="cart-container-width mb-4 ">
                  <div className="cart-container">
                    <img
                      src={DeleteOutline}
                      className="delete-icon"
                      alt="deleteIcon"
                    />
                    <img src={item?.img} className="cart-img" />
                    <div className="d-block w-75">
                      <p className="cart-dishName"> {item?.dishName}</p>
                      <div className="d-flex justify-content-between">
                        <p className="cart-list-price"> {item?.price}</p>
                        <div className="d-flex  cart-inc-container px-2 py-3">
                          <div className="cart-add-container">
                            <p
                              className="cart-price"
                              onClick={() => removeFromCart(item, index)}
                            >
                              -
                            </p>
                          </div>
                          <p className="cart-qty mx-2"> {item?.quantity}</p>
                          <div className="cart-add-container">
                            <p
                              className="cart-price "
                              onClick={() => addToCart(item, index)}
                            >
                              +
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="total-price-container fixed-bottom">
              <p className="cart-list-price"> Total ₹{totalPrice.toFixed(2)}</p>
              <NormalBtn
                btnlabel="Proceed"
                className={"btn-proceed"}
                onClick={() => {
                  setProceed(true);
                }}
              />
            </div>
          </>
        ) : proceedDone ? (
          <div className="cart-nofound-container px-5  py-5">
            <Lottie
              options={{
                animationData: animationData1,
                loop: false, // Optional
                autoplay: true,
              }}
              eventListeners={[
                {
                  eventName: "complete",
                  callback: () => navigate("/cart/checkout"),
                },
              ]}
              height={200} // Optional
              width={200} // Optional
            />
          </div>
        ) : (
          <div className="cart-nofound-container ">
            <Lottie
              options={{
                animationData: animationData,
                loop: true, // Optional
                autoplay: true,
              }}
              eventListeners={[
                {
                  eventName: "complete",
                  callback: () => navigate("/"),
                },
              ]}
              height={300} // Optional
              width={300} // Optional
            />
            {/* <img src={CartIcon} className="pe-3" alt="cartIcon" /> */}
            <p className="no-cart-list mt-3"> No Cart Added Yet</p>
            <div>
              <NormalBtn
                btnlabel="Start To Order"
                className={"start-order-btn mt-3"}
                onClick={() => {
                  setTimeout(() => {
                    navigate("/");
                  }, 500);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
