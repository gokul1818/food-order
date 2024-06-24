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
import Home from "./page/Home/home.jsx";
import Offers from "./page/offers/index";
import OrderStatus from "./page/orderStatus/index.jsx";
import NotFound from "./page/notFound/notFound.jsx";
import { updateDeviceID, updateHotelId } from "./redux/reducers/authSlice.js";

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
  console.log(uid, "UUUUID");
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
