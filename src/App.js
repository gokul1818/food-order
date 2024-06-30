import React, { useState, useEffect } from "react";
import { deviceDetect } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Cart from "./page/cart/cart";
import Checkout from "./page/checkout";
import Home from "./page/Home/home.jsx"
import Offers from "./page/offers/index";
import OrderStatus from "./page/orderStatus/index.jsx";
import NotFound from "./page/notFound/notFound.jsx";
import { updateDeviceID, updateHotelId } from "./redux/reducers/authSlice.js";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig.js";
import {
  updateLastOrder,
  updateNewOrder,
} from "./redux/reducers/ordersSlice.js";
import { isMobile } from "react-device-detect";
import Categories from "./page/categories/index.jsx";
const navigator_info = window.navigator;
const screen_info = window.screen;
let uid = navigator_info.mimeTypes.length;
uid += navigator_info.userAgent.replace(/\D+/g, "");
uid += navigator_info.plugins.length;
uid += screen_info.height + "";
uid += screen_info.width + "";
uid += screen_info.pixelDepth || "";

function App() {
  const dispatch = useDispatch();
  const deviceInfo = deviceDetect();
  uid += deviceInfo.model;
  console.log(screen_info, "UUUUID");
  const hotelId = useSelector((state) => state.auth.hotelId);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromQRCode = () => {
      localStorage.setItem("qrDataTable", "null");
      localStorage.setItem("qrDataChair", "null");
      const urlParams = new URLSearchParams(window.location.search);
      const base64Data = urlParams.get("data");
      if (base64Data) {
        try {
          const jsonString = atob(base64Data);
          const qrData = JSON.parse(jsonString);
          localStorage.setItem("qrDataTable", qrData.tableNumber);
          localStorage.setItem("qrDataChair", qrData.chairs.id);
          localStorage.setItem("hotelID", qrData.hotelId);
          dispatch(updateHotelId(qrData.hotelId));
        } catch (error) {
          console.error("Failed to decode or parse QR data:", error);
        }
      } else {
        console.log("No QR data found in the URL");
      }
      setLoading(false);
    };

    fetchDataFromQRCode();
  }, [dispatch]);

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
        let hotelOrdersListLength = hotelOrdersList.length - 1;
        console.log(hotelOrdersList[hotelOrdersListLength]?.orderStatus);
        if (hotelOrdersList[hotelOrdersListLength]?.orderStatus === 1) {
          dispatch(updateNewOrder(false));
          dispatch(updateLastOrder(hotelOrdersList[hotelOrdersListLength]));
        } else {
          dispatch(updateNewOrder(true));
        }
      },
      (error) => {
        console.error("Error fetching orders:", error);
      }
    );

    // Cleanup function to unsubscribe from the listener
    return () => unsubscribe();
  }, [userPhoneNumber]);

  console.log(isMobile);
  const ProtectedRoute = ({ element }) => {
    if (loading) {
      return <div>Loading...</div>; // Optionally, render a loading spinner here
    }
    if (!hotelId) {
      return <Navigate to="/404" />;
    }
    return element;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route
          path="/categories"
          element={<ProtectedRoute element={<Categories />} />}
        />
        <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
        <Route
          path="/cart/checkout"
          element={<ProtectedRoute element={<Checkout />} />}
        />
        <Route
          path="/order-status"
          element={<ProtectedRoute element={<OrderStatus />} />}
        />
        <Route
          path="/offers"
          element={<ProtectedRoute element={<Offers />} />}
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
