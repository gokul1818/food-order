import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Link } from "react-router-dom";
import PayButton from "../../components/payButton";

function Payment() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => {
    const itemPrice = parseFloat(item.price.replace("₹", ""));
    const itemQuantity = parseInt(item.quantity);
    return total + itemPrice * itemQuantity;
  }, 0);

  return (
    <div className="bg-color">
      <div className=" d-flex justify-content-start mt-4 ms-4 align-items-center">
        <Link to="/">
          <ArrowBackIosIcon style={{ color: "black" }} />
        </Link>

        <p className="cart-label pe-5 ">Payment</p>

        <div className="mt-5 d-flex justify-content-center  flex-wrap">
          <div className="payment-content">
            <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
            <PayButton totalPrice={totalPrice} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
