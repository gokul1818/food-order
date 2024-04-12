import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Link } from "react-router-dom";
import PayButton from "../../components/payButton";
import PaymentBtn from "../../components/payment";
import TableIcon from "../../assets/images/table.png";

function Checkout() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [tableSelect, setTableSelect] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState("Dine-In"); // State to track selected delivery method
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => {
    const itemPrice = parseFloat(item.price.replace("₹", ""));
    const itemQuantity = parseInt(item.quantity);
    return total + itemPrice * itemQuantity;
  }, 0);

  const table = [];

  for (let i = 1; i <= 10; i++) {
    table.push(i);
  }

  const handleCheckout = () => {
    if (!name.trim()) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
    if (!phoneNumber.trim()) {
      setPhoneNumberError("Phone number is required");
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      setPhoneNumberError("Phone number is invalid");
    } else {
      setPhoneNumberError("");
    }

    // Proceed with checkout if all fields are valid
    if (name && phoneNumber && !phoneNumberError) {
      // Your checkout logic here
    }
  };
  const validateName = (value) => {
    if (!value.trim()) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  };

  const validatePhoneNumber = (value) => {
    if (!value.trim()) {
      setPhoneNumberError("Phone number is required");
    } else if (!/^\d{10}$/.test(value)) {
      setPhoneNumberError("Phone number is invalid");
    } else {
      setPhoneNumberError("");
    }
  };

  return (
    <div className="bg-color ">
      <div className=" d-flex justify-content-start mt-4 ms-4 align-items-center">
        <Link to="/cart">
          <ArrowBackIosIcon style={{ color: "black" }} />
        </Link>
        <p className="cart-label pe-5 ">Checkout</p>
      </div>
      <p className="select-label">Select Your Table</p>
      <div className="d-flex tables-container px-3 ">
        {table.map((x, index) => (
          <div
            key={index}
            className={
              tableSelect.includes(index)
                ? "selected-table-container mx-3 my-3 mb-4 d-flex flex-column"
                : "table-container mx-3 my-3 mb-4 d-flex flex-column"
            }
            onClick={() =>
              setTableSelect((prev) => {
                if (prev.includes(index)) {
                  return prev.filter((i) => i !== index);
                } else {
                  return [...prev, index];
                }
              })
            }
          >
            <p className="mx-5 mb-0 fw-bold fs-2">{x}</p>
            <img src={TableIcon} className="table-container-img" />
          </div>
        ))}
      </div>
      <p className="select-label">Booking Details</p>
      <div className="d-flex justify-content-center">
        <div className="booking-container">
          <div className="inputbox mt-2 mb-1">
            <input
              required
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                validateName(e.target.value);
              }}
            ></input>
            <span>Name</span>
            <i></i>
          </div>
          {nameError && <p className="error">{nameError}</p>}
          <div className="inputbox mt-4 mb-1">
            <input
              required
              type="number"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                validatePhoneNumber(e.target.value);
              }}
            ></input>
            <span>Phone Number</span>
            <i></i>
          </div>
          {phoneNumberError && <p className="error">{phoneNumberError}</p>}
          <p className="details-label mt-3">Delivery method</p>
          <form className="radio-form mt-3 mb-3">
            <input
              value="Dine-In"
              name="deliveryMethod"
              type="radio"
              id="Dine-In"
              checked={deliveryMethod === "Dine-In"}
              onChange={() => setDeliveryMethod("Dine-In")}
            />
            <label htmlFor="Dine-In">
              <span></span> Dine-In
            </label>

            <input
              value="Parcel"
              name="deliveryMethod"
              type="radio"
              id="Parcel"
              checked={deliveryMethod === "Parcel"}
              onChange={() => setDeliveryMethod("Parcel")}
            />
            <label htmlFor="Parcel">
              <span></span> Parcel
            </label>

            <div className={deliveryMethod ? "worm" : "d-none"}>
              <div className="worm__segment"></div>
            </div>
          </form>
        </div>
      </div>

      <div className="fixed-bottom mx-auto mb-5 ">
        <PaymentBtn onClick={handleCheckout} />
      </div>
    </div>
  );
}

export default Checkout;
