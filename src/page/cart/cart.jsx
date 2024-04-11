import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Link } from "react-router-dom";
import { addCartItem, removeCartItem } from "../../redux/reducers/cartSlice";
import CartIcon from "../../assets/icon/cartIcon.svg";

function Cart() {
  const dispatch = useDispatch();
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

  return (
    <div className="bg-color">
      <div className=" d-flex justify-content-start mt-4 ms-4 align-items-center">
        <Link to="/">
          <ArrowBackIosIcon style={{ color: "black" }} />
        </Link>

        <p className="cart-label pe-5 "> Cart</p>
      </div>

      {cart.length > 0 ? (
        <div className="mt-5 d-flex justify-content-center  flex-wrap">
          {cart.map((item, index) => (
            <div key={index} className="cart-container-width mb-4 ">
              <div className="cart-container">
                <img src={item?.img} className="cart-img" />
                <div className="d-block w-75">
                  <p className="cart-dishName"> {item?.dishName}</p>
                  <div className="d-flex justify-content-between">
                    <p className="cart-list-price"> {item?.price}</p>
                    <div className="d-flex cart-add-container px-2 py-3">
                      <p
                        className="cart-price"
                        onClick={() => removeFromCart(item, index)}
                      >
                        -
                      </p>
                      <p className="cart-price"> {item?.quantity}</p>
                      <p
                        className="cart-price"
                        onClick={() => addToCart(item, index)}
                      >
                        +
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="cart-nofound-container ">
          <img src={CartIcon} className="pe-3" alt="cartIcon" />
          <p className="no-cart-list mt-3"> No cart yet</p>
          <div>
          <Link to={"/"} style={{ textDecoration: 'none' }}>
              <p className="start-order-btn mt-3">Start to Order</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
