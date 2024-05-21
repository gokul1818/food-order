import React, { useState } from "react";
import "./style.css";
import NormalBtn from "../normalButton";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

function Tracker({ stages, currentStage, handleCancelOrder, orderItem }) {
  const [viewMore, setViewMore] = useState(false);
  const [viewMoreDetails, setViewMoreDetails] = useState(false);

  return (
    <div className="tracker">
      <h5 className="order-dishName-label fs-5 mb-3">
        Order ID : {orderItem?.OrderId}
      </h5>
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
        <p
          className="order-dishName-label fw-bold px-2 py-1 mt-2"
          style={{
            color: orderItem?.paymentMethod == "cash" ? "red" : "green",
            background: "#acabab",
            borderRadius: "10px",
          }}
        >
          {orderItem?.paymentMethod == "cash" ? "UnPaid" : "Paid"}
        </p>
      </div>
      {stages.map((stage, index) => (
        <div key={index} className="tracker-item">
          <div className="dot-and-connector">
            <div
              className={`dot ${index <= currentStage ? "active" : ""}`}
            ></div>
            <span className="stage">{stage}</span>
          </div>
          {index < stages.length - 1 && (
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
          {stages[stages.length - 1] == "Reached Table" &&
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
