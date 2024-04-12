import React from "react";
import "./style.css"

const NormalBtn = (
    {
        onClick,
        btnlabel = "button",
        className=""
    }

) => {

    return (
        <button onClick={onClick} className={`button ${className}`}  > {btnlabel}</button>

    )

}

export default NormalBtn