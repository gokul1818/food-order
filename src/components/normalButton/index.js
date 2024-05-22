import React from "react";
import "./style.css";

const NormalBtn = ({
  onClick,
  btnlabel = "button",
  className = "",
  disabled = false  ,
}) => {
  return (
    <button
      onClick={onClick}
      className={`button ${className}`}
      disabled={disabled}
    >
      {" "}
      {btnlabel}
    </button>
  );
};

export default NormalBtn;
