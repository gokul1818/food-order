import React from "react";
import { deviceDetect } from "react-device-detect";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Cart from "./page/cart/cart";
import Checkout from "./page/checkout";
import Home from "./page/Home/home.jsx";
import Offers from "./page/offers/index";
import OrderStatus from "./page/orderStatus/index.jsx";
import { updateDeviceID } from "./redux/reducers/authSlice.js";
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
  dispatch(updateDeviceID(uid));

  // Assuming this function is called when your application loads or when needed
  const fetchDataFromQRCode = () => {
    localStorage.setItem("qrDataTable", "null");
    localStorage.setItem("qrDataChair", "null");
    const urlParams = new URLSearchParams(window.location.search);
    const base64Data = urlParams.get("data");
    if (base64Data) {
      try {
        // Decode Base64 to JSON string
        const jsonString = atob(base64Data);
        // Parse JSON string to object
        const qrData = JSON.parse(jsonString);
        // You can also store qrData in local storage if needed
        localStorage.setItem("qrDataTable", qrData.tableNumber);
        localStorage.setItem("qrDataChair", qrData.chairs.id);
      } catch (error) {
        console.error("Failed to decode or parse QR data:", error);
      }
    } else {
      console.log("No QR data found in the URL");
    }
  };

  // Call the function to execute the code
  fetchDataFromQRCode();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/checkout" element={<Checkout />} />
        <Route path="/order-status" element={<OrderStatus />} />
        <Route path="/offers" element={<Offers />} />
      </Routes>
    </Router>
  );
}

export default App;
