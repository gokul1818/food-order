import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import PayButton from "../../components/payButton";
import PaymentBtn from "../../components/payment";
import TableIcon from "../../assets/images/table.png";
import foodOnPlate from "../../assets/images/plateOnfood.png";
import foodOnPlate1 from "../../assets/images/plateOnfood1.png";
import emptyPlate from "../../assets/images/emptyPlate.png";
import pointer from "../../assets/icon/pointer.svg";
import Navbar from "../../components/navBar";
import animationData from "../../assets/foodprepare.json";
import { useNavigate } from "react-router-dom";
import { updateOrder } from "../../redux/reducers/ordersSlice";
import { clearCart } from "../../redux/reducers/cartSlice";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import generateOrderId from "../../components/orderIdGenerator/orderGenerator";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locationMatch = useSelector((state) => state.auth.locationMatch);

  const cart = useSelector((state) => state.cart.cart);
  const [tableSelect, setTableSelect] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState(
    locationMatch ? "Dine-In" : "Parcel"
  );
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nameError, setNameError] = useState("");
  const [chairError, setchairError] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [tables, setTables] = useState([
    {
      table: 1,
      chairs: [
        {
          id: 1,
          booked: false,
        },
        {
          id: 2,
          booked: false,
        },
        {
          id: 3,
          booked: false,
        },
        {
          id: 4,
          booked: false,
        },
      ],
    },
    {
      table: 2,
      chairs: [
        {
          id: 1,
          booked: false,
        },
        {
          id: 2,
          booked: false,
        },
        {
          id: 3,
          booked: false,
        },
        {
          id: 4,
          booked: false,
        },
      ],
    },
    {
      table: 3,
      chairs: [
        {
          id: 1,
          booked: false,
        },
        {
          id: 2,
          booked: false,
        },
        {
          id: 3,
          booked: false,
        },
        {
          id: 4,
          booked: false,
        },
      ],
    },
    {
      table: 4,
      chairs: [
        {
          id: 1,
          booked: false,
        },
        {
          id: 2,
          booked: false,
        },
        {
          id: 3,
          booked: false,
        },
        {
          id: 4,
          booked: false,
        },
      ],
    },
    {
      table: 5,
      chairs: [
        {
          id: 1,
          booked: false,
        },
        {
          id: 2,
          booked: false,
        },
        {
          id: 3,
          booked: false,
        },
        {
          id: 4,
          booked: false,
        },
      ],
    },
  ]);
  const [tablesBooked, setTablesBooked] = useState([
    {
      table: 1,
      chairs: [
        {
          id: 1,
          booked: true,
        },
        {
          id: 2,
          booked: false,
        },
        {
          id: 3,
          booked: false,
        },
        {
          id: 4,
          booked: true,
        },
      ],
    },
    {
      table: 2,
      chairs: [
        {
          id: 1,
          booked: true,
        },
        {
          id: 2,
          booked: true,
        },
        {
          id: 3,
          booked: false,
        },
        {
          id: 4,
          booked: false,
        },
      ],
    },
    {
      table: 3,
      chairs: [
        {
          id: 1,
          booked: false,
        },
        {
          id: 2,
          booked: false,
        },
        {
          id: 3,
          booked: false,
        },
        {
          id: 4,
          booked: false,
        },
      ],
    },
    {
      table: 4,
      chairs: [
        {
          id: 1,
          booked: false,
        },
        {
          id: 2,
          booked: false,
        },
        {
          id: 3,
          booked: false,
        },
        {
          id: 4,
          booked: false,
        },
      ],
    },
    {
      table: 5,
      chairs: [
        {
          id: 1,
          booked: false,
        },
        {
          id: 2,
          booked: false,
        },
        {
          id: 3,
          booked: false,
        },
        {
          id: 4,
          booked: false,
        },
      ],
    },
  ]);
  // Calculate total price
  const totalPrice = cart.reduce((total, item) => {
    const itemPrice = parseFloat(item.price.replace("₹", ""));
    const itemQuantity = parseInt(item.quantity);
    return total + itemPrice * itemQuantity;
  }, 0);

  const handleChairClick = (tableId, chairIndex) => {
    if (!tablesBooked[tableId - 1].chairs[chairIndex].booked) {
      setTables((prevTables) => {
        const updatedTables = [...prevTables];
        const tableIndex = updatedTables.findIndex((x) => x.table === tableId);
        const chair = updatedTables[tableIndex].chairs[chairIndex];
        chair.booked = !chair.booked;
        return updatedTables;
      });
      setTimeout(() => {
        handleChairError();
      }, 100);
    }
  };

  const handleChairError = () => {
    const isAnyChairSelected = tables.some((table) =>
      table.chairs.some((chair) => chair.booked)
    );
    if (!isAnyChairSelected) {
      setchairError(true);
    } else {
      setchairError(false);
    }
  };
  const addOrder = async (orderData) => {
    try {
      const orderId = await generateOrderId();
      const orderDocRef = doc(collection(db, "orders"), orderId);

      await setDoc(orderDocRef, {
        ...orderData,
        orderID: orderId,
      });
    } catch (e) {
      console.error("Error adding order: ", e);
    }
  };

  const handleCheckout = async () => {
    // Check if any chair is selected
    const isAnyChairSelected = tables.some((table) =>
      table.chairs.some((chair) => chair.booked)
    );
    // Check if name is provided
    if (!name.trim()) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }

    // Check if phone number is provided and valid
    if (!phoneNumber.trim()) {
      setPhoneNumberError("Phone number is required");
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      setPhoneNumberError("Phone number is invalid");
    } else {
      setPhoneNumberError("");
    }

    if (name && phoneNumber && !phoneNumberError) {
      if (locationMatch && !isAnyChairSelected) {
        return;
      }
      setTimeout(() => {
        setSubmited(true);
      }, 1500);
      let payload = {
        phoneNumber: phoneNumber,
        name: name,
        tablesSelected: tables,
        paymentMethod: paymentMethod,
        deliveryMethod: deliveryMethod,
        cartItems: cart,
        totalPrice: totalPrice,
        orderStatus: 1,
      };
      await addOrder(payload);
      localStorage.setItem("userPhoneNumber", phoneNumber);
      dispatch(updateOrder(payload));
      dispatch(clearCart());
    } else {
      if (!isAnyChairSelected) {
        setchairError(true);
      } else {
        setchairError(false);
      }
      // Notify user to select a chair if not selected
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
      {/* <div className=" d-flex justify-content-start mt-4 ms-4 align-items-center">
        <Link to="/cart">
          <ArrowBackIosIcon style={{ color: "black" }} />
        </Link>
        <p className="cart-label pe-5 ">Checkout</p>
      </div> */}
      <Navbar />
      <div className="ease-in">
        {!submited ? (
          <div className="mt-3 pt-3">
            {locationMatch && (
              <>
                <p className="select-label mb-0">Select your chairs</p>
                <div className="d-flex ms-5 justify-content-start">
                  <img src={pointer} />
                  <p className="small-dec">click on a chair to book</p>
                </div>
                <div className="d-flex tables-container   px-3">
                  {tables.map((table, index) => (
                    <div
                      key={index}
                      className="table-container mx-1 my-3 mb-4 d-flex flex-column"
                    >
                      <div className="table-chair-container w-100 px-4">
                        {table.chairs.slice(0, 2).map((chair, chairIndex) => (
                          <div
                            key={chairIndex}
                            className={
                              tablesBooked[index].chairs[chairIndex].booked
                                ? "chairBooked-already"
                                : chair.booked
                                ? "table-chair-booked"
                                : "table-chair"
                            }
                            onClick={() =>
                              handleChairClick(table.table, chairIndex)
                            }
                          ></div>
                        ))}
                      </div>
                      <div className="dine-table flex-column  justify-content-evenly">
                        <div className="d-flex justify-content-evenly w-100 flex-wrap">
                          {table.chairs.slice(0, 4).map((chair, chairIndex) => (
                            <div
                              key={index}
                              className="mx-1 my-1"
                              onClick={() =>
                                handleChairClick(table.table, chairIndex)
                              }
                            >
                              <img
                                src={
                                  tablesBooked[index].chairs[chairIndex].booked
                                    ? foodOnPlate1
                                    : chair.booked
                                    ? foodOnPlate1
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
                        {table.chairs.slice(2, 4).map((chair, chairIndex) => (
                          <div
                            key={chairIndex}
                            className={
                              tablesBooked[index].chairs[chairIndex + 2].booked
                                ? "chairBooked-bottom-already"
                                : chair.booked
                                ? "table-chair-bottom-booked"
                                : "table-chair-bottom"
                            }
                            onClick={() =>
                              handleChairClick(table.table, chairIndex + 2)
                            }
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {chairError && (
                  <p className="error ms-4 ps-2">
                    Please select at least one chair
                  </p>
                )}
              </>
            )}

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
                {phoneNumberError && (
                  <p className="error">{phoneNumberError}</p>
                )}
                <p className="details-label mt-3">Delivery method</p>
                <form className="radio-form mt-3 mb-3">
                  {locationMatch && (
                    <>
                      {" "}
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
                    </>
                  )}
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
            <div className="fixed-bottom  ">
              <PaymentBtn onClick={handleCheckout} />
            </div>
          </div>
        ) : (
          <div
            className="d-flex flex-column justify-content-center align-items-center   "
            style={{ height: "100vh" }}
          >
            <Lottie
              options={{
                animationData: animationData,
                loop: false,
                autoplay: true,
              }}
              height={300} // Optional
              width={300} // Optional
              eventListeners={[
                {
                  eventName: "complete",
                  callback: () => navigate("/order-status"),
                },
              ]}
            />
            <p className="select-label m-0" style={{ top: "60%" }}>
              Your food is begin prepared{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;

// // Initialize tables
// useState(() => {
//   const initialTables = [];
//   for (let i = 1; i <= 10; i++) {
//     const table = {
//       table: i,
//       chairs: [],
//     };
//     for (let j = 1; j <= 4; j++) {
//       table.chairs.push({ id: j, booked: false }); // Added booked property
//     }
//     initialTables.push(table);
//   }
//   setTables(initialTables);
// }, []); // Empty dependency array ensures this runs only once
