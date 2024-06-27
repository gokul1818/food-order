// src/page/NotFound.jsx
import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/404.json";

const NotFound = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center flex-column"
      style={{ height: "100vh" }}
    >
 
      <Lottie
        options={{
          animationData: animationData,
          loop: true,
          autoplay: true,
        }}
        height={300}
        width={300}
      />
    </div>
  );
};

export default NotFound;
