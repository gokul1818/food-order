import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/navBar/index";
import Tracker from "../../components/tracker/index";
import { useNavigate } from "react-router-dom";
import NormalBtn from "../../components/normalButton";
import Lottie from "react-lottie";
import animationData from "../../assets/emptyOrder.json";
import "./style.css";
// initial stages
const initialStages = [
  "Order Placed",
  "Food Preparing",
  // "Preparation Done",
  // "Ready To Serve",
  // "Out Of Kitchen",
  "Reached Table",
];

const cancel = ["Cancel Initiated", "Order Cancelled"];

function OrderStatus() {
  const navigate = useNavigate();

  const orderedFood = useSelector((state) => state.order.order);
  // const orderedFood = useSelector((state) => state.cart.cart);

  const [currentOrderStatusIndex, setCurrentOrderStatusIndex] = useState(1);
  const [orderStatusStages, setOrderStatusStages] = useState(initialStages);

  const handleCancelOrder = () => {
    const updatedStages = [
      ...orderStatusStages.slice(0, currentOrderStatusIndex + 1),
      ...cancel,
    ];
    setCurrentOrderStatusIndex(currentOrderStatusIndex + 1);
    setOrderStatusStages(updatedStages);
  };

  return (
    <div className="bg-color p-5">
      <Navbar />
      <div className="ease-in">
        {orderedFood.length > 0 ? (
          <div>
            <div className="mt-5 pt-5 justify-content-center">
              <h2 className="pl-5">Your Order Status</h2>
              <Tracker
                stages={orderStatusStages}
                currentStage={currentOrderStatusIndex}
              />
            </div>
            <NormalBtn
              btnlabel="Cancel Order"
              className={"cancel-order-btn mt-3"}
              onClick={handleCancelOrder}
            />
          </div>
        ) : (
          <div className="cart-nofound-container ">
            <Lottie
              options={{
                animationData: animationData,
                loop: true,
                autoplay: true,
              }}
              height={300}
              width={300}
            />
            <p className="no-cart-list mt-3"> No Orders To Track</p>
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

export default OrderStatus;

{
  /*    <div className="mt-5 pt-5 justify-content-center">
          <h2>Your Orders</h2>
            <ul>
              {orderedFood.map((food, index) => (
                <DetailCard
                  key={index}
                  title={food.name}
                  description=""
                  category={food.category}
                  // image={food.img}
                  price={food.price}
                  quantity={food.quantity}
                />
              ))}
            </ul>
          </div> */
}
