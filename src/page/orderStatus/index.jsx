import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import animationData from "../../assets/emptyOrder.json";
import Navbar from "../../components/navBar/index";
import NormalBtn from "../../components/normalButton";
import Tracker from "../../components/tracker/index";
import { db } from "../../firebaseConfig";
import "./style.css";

function OrderStatus() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderedFood, setOrderedFood] = useState([]);
  const hotelId = useSelector((state) => state.auth.hotelId);

  const userPhoneNumber = localStorage.getItem("userPhoneNumber");

  useEffect(() => {
    if (!userPhoneNumber) {
      console.error("No user phone number found in local storage.");
      return;
    }

    const ordersCollection = collection(db, `orders-${hotelId}`);
    const q = query(
      ordersCollection,
      where("phoneNumber", "==", userPhoneNumber)
    );

    // Set up a real-time listener
    const unsubscribe = onSnapshot(
      q,
      (ordersSnapshot) => {
        const ordersList = ordersSnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        const hotelOrdersList = ordersList.filter(
          (data) => data?.hotelId === hotelId
        );

        setOrderedFood(hotelOrdersList);
      },
      (error) => {
        console.error("Error fetching orders:", error);
      }
    );

    // Cleanup function to unsubscribe from the listener
    return () => unsubscribe();
  }, [dispatch, userPhoneNumber]);

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
              <Tracker orderItem={item} />
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
