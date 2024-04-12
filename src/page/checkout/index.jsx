import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Link } from "react-router-dom";
import PayButton from "../../components/payButton";
import PaymentBtn from "../../components/payment";

function Checkout() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => {
    const itemPrice = parseFloat(item.price.replace("₹", ""));
    const itemQuantity = parseInt(item.quantity);
    return total + itemPrice * itemQuantity;
  }, 0);

  console.log(totalPrice, "daygsdkaghkdjhkj");

  return (
    <div className="bg-color">
      <div className=" d-flex justify-content-start mt-4 ms-4 align-items-center">
        <Link to="/cart">
          <ArrowBackIosIcon style={{ color: "black" }} />
        </Link>
        <p className="cart-label pe-5 ">Checkout</p>
      </div>
      <div className="fixed-bottom mx-auto mb-5 "> 
        <PaymentBtn />
      </div>
    </div>
  );
}

export default Checkout;
