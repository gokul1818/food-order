import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navBar/index";
import Tracker from "../../components/tracker/index";
import { useNavigate } from "react-router-dom";
import NormalBtn from "../../components/normalButton";
import Lottie from "react-lottie";
import animationData from "../../assets/emptyOrder.json";
import "./style.css";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useEffect } from "react";
import {
  updateOrder,
  updateOrderLength,
} from "../../redux/reducers/ordersSlice";
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
  const dispatch = useDispatch();

  // const orderedFood = useSelector((state) => state.order.order);
  const [currentOrderStatusIndex, setCurrentOrderStatusIndex] = useState(2);
  const [orderStatusStages, setOrderStatusStages] = useState(initialStages);
  const [orderedFood, setOrderedFood] = useState([]);
  const handleCancelOrder = () => {
    const updatedStages = [...orderStatusStages.slice(0, 1), ...cancel];
    setCurrentOrderStatusIndex(currentOrderStatusIndex + 1);
    setOrderStatusStages(updatedStages);
  };

  useEffect(() => {
    const ordersCollection = collection(db, "orders");

    // Set up a real-time listener
    const unsubscribe = onSnapshot(
      ordersCollection,
      (ordersSnapshot) => {
        const ordersList = ordersSnapshot.docs.map((doc) => ({
          OrderId: doc.id,
          ...doc.data(),
        }));
        setOrderedFood(ordersList);
        console.log(ordersList);
      },
      (error) => {
        console.error("Error fetching orders:", error);
      }
    );

    // Cleanup function to unsubscribe from the listener
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="bg-color ">
      <Navbar />
      <div className="ease-in  ">
        {orderedFood.length > 0 && (
          <h2 className="mt-5 pt-5 d-flex flex-column justify-content-center align-items-center">
            Your Order Status
          </h2>
        )}
        {orderedFood.length > 0 ? (
          orderedFood.map((item, index) => (
            <div
              className="d-flex justify-content-center align-items-center"
              key={index}
            >
              <Tracker
                orderItem={item}
                stages={orderStatusStages}
                currentStage={item.orderStatus}
                handleCancelOrder={handleCancelOrder}
              />
            </div>
          ))
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
