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
