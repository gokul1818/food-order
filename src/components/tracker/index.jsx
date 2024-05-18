import React, { useState } from "react";
import "./style.css";
import NormalBtn from "../normalButton";

function Tracker({ stages, currentStage, handleCancelOrder, orderItem }) {
  console.log(orderItem.cartItems);
  const [viewMore, setViewMore] = useState(false);
  return (
    <div className="tracker">
      {orderItem.cartItems
        .slice(0, viewMore ? orderItem.cartItems.length : 1)
        .map((item, index) => (
          <div className="d-flex align-items-center  mb-3" key={index}>
            <img src={item.img} className="order-list-img" />
            <p className="order-dishName-label mb-0 ms-2">{item.dishName}</p>
          </div>
        ))}
      {orderItem.cartItems.length > 1 && (
        <NormalBtn
          btnlabel={viewMore ? "View Less" : "View More"}
          className={"view-more-btn me-0 ms-auto"}
          onClick={() => setViewMore(!viewMore)}
        />
      )}
      <p className="Arrives-label mt-2">Arrives with in (20 mins) </p>
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
                backgroundColor: index < currentStage ? "black" : "#e5e5e5",
              }}
            ></div>
          )}
        </div>
      ))}
      {stages[stages.length - 1] == "Reached Table" && currentStage !== 2 && (
        <NormalBtn
          btnlabel="Cancel Order"
          className={"cancel-order-btn mt-3"}
          onClick={handleCancelOrder}
        />
      )}
    </div>
  );
}

export default Tracker;
