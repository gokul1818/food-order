import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './page/Home/home';
import Cart from './page/cart/cart';
import Checkout from './page/checkout';
import Orders from './page/orders/orders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />

      </Routes>
    </Router>
  );
}

export default App;