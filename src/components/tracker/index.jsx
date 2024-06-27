import React, { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import NormalBtn from "../normalButton";
import "./style.css";
import checkIcon from "../../assets/images/check.png";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useSelector } from "react-redux";
function Tracker({
  // stages,
  // currentStage,
  // handleCancelOrder,
  orderItem,
  orderDelivered,
}) {
  const initialStages = ["Order Placed", "Food Preparing", "Reached Table"];
  const cancel = ["Cancel Initiated", "Order Cancelled"];
  const delivered = ["Reached Table"];
  const [currentOrderStatusIndex, setCurrentOrderStatusIndex] = useState(2);
  const [orderStatusStages, setOrderStatusStages] = useState(initialStages);
  const [currentStage, setCurrentStage] = useState(orderItem.orderStatus);
  const hotelId = useSelector((state) => state.auth.hotelId);

  const handleOrderDelivered = (status) => {
    // console.log("Sdfsdf", status);

    if (status === 2) {
      const updatedStages = [...orderStatusStages.slice(0, 1), ...delivered];
      setCurrentOrderStatusIndex(currentOrderStatusIndex + 1);
      setOrderStatusStages(updatedStages);
    } else if (status === 3) {
      const updatedStages = [...orderStatusStages.slice(0, 1), ...cancel];
      setCurrentOrderStatusIndex(currentOrderStatusIndex + 1);
      
      setOrderStatusStages(updatedStages);
    }
  };
  const [viewMore, setViewMore] = useState(false);
  const [viewMoreDetails, setViewMoreDetails] = useState(false);
  console.log(orderItem);
  const [remainingTime, setRemainingTime] = useState({
    minutes: 0,
    seconds: 1,
  });

  useEffect(() => {
    const countdownDate =
      orderItem?.orderTime?.toDate().getTime() + 15 * 60 * 1000; // Add 15 minutes to orderTime
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setRemainingTime({ minutes, seconds });
      if (distance < 0) {
        clearInterval(interval);
        setRemainingTime({ minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [orderItem?.orderTime]);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const orderDocRef = doc(collection(db, `orders-${hotelId}`), orderId);

      await updateDoc(orderDocRef, {
        orderStatus: status,
      });
    } catch (e) {
      console.error("Error updating order status: ", e);
    }
  };

  const handleCancelOrder = () => {
    updateOrderStatus(orderItem.orderID, 3);
  };

  useEffect(() => {
    if (orderItem.orderStatus !== 4) {
      if (
        remainingTime.minutes === 0 &&
        remainingTime.seconds === 0 &&
        orderItem.orderStatus === 1
      ) {
        handleOrderDelivered(orderItem.orderStatus);
        setCurrentStage(2);
        // updateOrderStatus(orderItem.orderID, 2);
      } else {
        handleOrderDelivered(orderItem.orderStatus);
        // updateOrderStatus(orderItem.orderID, 1);
      }
    }
  }, [remainingTime.minutes, remainingTime.seconds]);
  return (
    <div className="tracker">
      <div className="d-flex justify-content-between ">
        <h5 className="order-dishName-label fs-5 mb-3">
          Order ID : {orderItem?.orderID}
        </h5>
      </div>
      <h6 className="order-arrived-label mb-3">
        {remainingTime.minutes === 0 && remainingTime.seconds === 0
          ? ""
          : orderItem.orderStatus == 1 && (
              <>
                Arrives within: {remainingTime.minutes} min :{" "}
                {remainingTime.seconds} sec
              </>
            )}
      </h6>

      {orderItem.cartItems
        .slice(0, viewMore ? orderItem.cartItems.length : 1)
        .map((item, index) => (
          <div
            className="d-flex align-items-center  mb-3 order-history-cart-container"
            key={index}
          >
            <img src={item.img} className="order-list-img" />
            <div className="ms-2">
              <p className="order-dishName-label mb-0 ms-2">{item.dishName}</p>
              <p className="order-dishName-label  mb-0 ms-2">
                <i>Quantity :</i>
                {item.quantity}
              </p>
            </div>
          </div>
        ))}
      {orderItem.cartItems.length > 1 && (
        <NormalBtn
          btnlabel={viewMore ? "View Less" : "View More"}
          className={"view-more-btn me-0 ms-auto"}
          onClick={() => setViewMore(!viewMore)}
        />
      )}
      <div className="d-flex justify-content-between">
        <p className="Arrives-label mt-2">Track Order </p>
        <div className="d-flex align-items-center">
          {orderItem?.paymentMethod !== "cash" && (
            <img src={checkIcon} style={{ width: "18px", height: "18px" }} />
          )}
          <p
            className="order-dishName-label fw-bold px-2 py-1 mb-0"
            style={{
              color: orderItem?.paymentMethod == "cash" ? "#fff" : "#00BA00",
              // background: "#000",
              borderRadius: "10px",
            }}
          >
            {orderItem?.paymentMethod == "cash" ? "cash" : "UPI"}
          </p>
        </div>
      </div>
      {orderStatusStages.map((stage, index) => (
        <div key={index} className="tracker-item">
          <div className="dot-and-connector">
            <div
              className={`dot ${index <= currentStage ? "active" : ""}`}
            ></div>
            <span className="stage">{stage}</span>
          </div>
          {index < orderStatusStages.length - 1 && (
            <div
              className="connector"
              style={{
                backgroundColor: index < currentStage ? "#ffffff" : "grey",
              }}
            ></div>
          )}
        </div>
      ))}
      {viewMoreDetails && (
        <>
          <div className="d-flex justify-content-between  mt-4">
            <p className=" order-dishName-label fs-6  ">
              {"Total Price *(inc all GST)"}
            </p>
            <p className="order-dishName-label fs-6 fw-bold ">
              {" "}
              ₹{orderItem?.totalPrice}
            </p>
          </div>
          {orderStatusStages[orderStatusStages.length - 1] == "Reached Table" &&
            currentStage !== 2 && (
              <NormalBtn
                btnlabel="Cancel Order"
                className={"cancel-order-btn mt-3"}
                onClick={handleCancelOrder}
              />
            )}
        </>
      )}
      <div className="d-flex justify-content-center mt-4">
        <div
          className="viewMore-btn "
          onClick={() => setViewMoreDetails(!viewMoreDetails)}
        >
          {!viewMoreDetails ? (
            <FaAngleDown color="white" />
          ) : (
            <FaAngleUp color="white" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Tracker;
