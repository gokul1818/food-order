import React from "react";
import "./styles.css";
import ribbonIcon from "../../assets/images/ribbon.png";
import NormalBtn from "../normalButton";
export const OfferCard = ({ item, onClick }) => {
  return (
    <div className="body" onClick={onClick}>
      <div className="card-view">
        <div className="image-view">
          <img src={item.image} alt="img" className="card-image" />
          {item.type === "Combo" && (
            <img src={item.image1} alt="img" className="card-image1" />
          )}
        </div>
        <div className="ribbon-container">
          <p className="type">{item?.type}</p>
          <img src={ribbonIcon} alt="img" className="ribbon" />
        </div>
        <div className="view-details">
          {/* <p className="discount">{`${item?.discount} %`}</p> */}
          <p className="name">{item?.name}</p>
          {/* <div className="btn-container"> */}
            <NormalBtn
              btnlabel={"Add to cart"}
              className={"food-list-btn"}
              onClick={(e) => {
                console.log(e);
              }}
            />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};
