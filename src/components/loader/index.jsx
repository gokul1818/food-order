import React from "react";
import "./styles.css";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__circle"></div>
      <div className="loader__circle"></div>
      <div className="loader__circle"></div>
      <div className="loader__circle"></div>
      <div className="loader__circle"></div>
    </div>
  );
};

export default Loader;
