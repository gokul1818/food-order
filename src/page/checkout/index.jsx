import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Link } from "react-router-dom";
import PayButton from "../../components/payButton";
import PaymentBtn from "../../components/payment";
import TableIcon from "../../assets/images/table.png";
import foodOnPlate from "../../assets/images/plateOnfood.png";
import foodOnPlate1 from "../../assets/images/plateOnfood1.png";
import emptyPlate from "../../assets/images/emptyPlate.png";

function Checkout() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [tableSelect, setTableSelect] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState("Dine-In");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [tables, setTables] = useState([]);

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => {
    const itemPrice = parseFloat(item.price.replace("₹", ""));
    const itemQuantity = parseInt(item.quantity);
    return total + itemPrice * itemQuantity;
  }, 0);

  // Initialize tables
  useState(() => {
    const initialTables = [];
    for (let i = 1; i <= 10; i++) {
      const table = {
        table: i,
        chairs: [],
      };
      for (let j = 1; j <= 4; j++) {
        table.chairs.push({ id: j, booked: false }); // Added booked property
      }
      initialTables.push(table);
    }
    setTables(initialTables);
  }, []); // Empty dependency array ensures this runs only once

  const handleChairClick = (tableId, chairIndex) => {
    setTables((prevTables) => {
      const updatedTables = [...prevTables];
      const tableIndex = updatedTables.findIndex((x) => x.table === tableId);
      const chair = updatedTables[tableIndex].chairs[chairIndex];
      chair.booked = !chair.booked;
      return updatedTables;
    });
  };

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

  console.log(tables, "tables");

  return (
    <div className="bg-color ">
      <div className=" d-flex justify-content-start mt-4 ms-4 align-items-center">
        <Link to="/cart">
          <ArrowBackIosIcon style={{ color: "black" }} />
        </Link>
        <p className="cart-label pe-5 ">Checkout</p>
      </div>
      <p className="select-label mb-0">Select your chairs / plates</p>
      <div className="d-flex tables-container px-3">
        {tables.map((table, index) => (
          <div
            key={index}
            className="table-container mx-3 my-3 mb-4 d-flex flex-column"
          >
            <div className="table-chair-container w-100 px-4">
              {table.chairs.slice(0, 2).map((chair, index) => (
                <div
                  key={index}
                  className={
                    chair.booked ? "table-chair-booked" : "table-chair"
                  }
                  onClick={() => handleChairClick(table.table, index)}
                ></div>
              ))}
            </div>
            <div className="dine-table flex-column  justify-content-evenly">
              <div className="d-flex justify-content-evenly w-100 flex-wrap">
                {table.chairs.slice(0, 4).map((chair, index) => (
                  <div
                    key={index}
                    className="mx-1 my-1"
                    onClick={() => handleChairClick(table.table, index)}
                  >
                    <img
                      src={
                        chair.booked
                          ? index % 2 == 0
                            ? foodOnPlate1
                            : foodOnPlate
                          : emptyPlate
                      }
                      className="table-plate"
                    />
                  </div>
                ))}
              </div>
              <p className="table-number">{table.table}</p>
            </div>
            <div className="table-chair-container w-100 px-4">
              {table.chairs.slice(2, 4).map((chair, index) => (
                <div
                  key={index}
                  className={
                    chair.booked
                      ? "table-chair-bottom-booked"
                      : "table-chair-bottom"
                  }
                  onClick={() => handleChairClick(table.table, index + 2)}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="select-label mt-0">Booking Details</p>
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
          <p className="details-label mt-3">Payment method</p>
          <form className="radio-form mt-3 mb-3">
            <input
              value="cash"
              name="Payment method"
              type="radio"
              id="cash"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
            />
            <label htmlFor="cash">
              <span></span> Cash
            </label>

            <input
              value="online"
              name="Payment method"
              type="radio"
              id="online"
              checked={paymentMethod === "online"}
              onChange={() => setPaymentMethod("online")}
            />
            <label htmlFor="online">
              <span></span> UPI/Card
            </label>

            <div className={deliveryMethod ? "worm" : "d-none"}>
              <div className="worm__segment"></div>
            </div>
          </form>
        </div>
      </div>

      <div className="fixed-bottom mx-auto  bg-white ">
        <PaymentBtn onClick={handleCheckout} />
      </div>
    </div>
  );
}

export default Checkout;
