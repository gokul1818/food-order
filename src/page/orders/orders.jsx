import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, createBrowserRouter, useN } from "react-router-dom";
import historyIcon from "../../assets/icon/history.svg";
import NormalBtn from "../../components/normalButton";
import { addCartItem, removeCartItem } from "../../redux/reducers/cartSlice";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navBar";
import Lottie from "react-lottie";
import animationData from "../../assets/emptyOrder.json";

function Orders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.order);

  return (
    <div className="bg-color">
 
      <Navbar />

      {order.length > 0 ? (

        <>


        </>
      ) : (
        <div className="cart-nofound-container ">
          <Lottie
            options={{
              animationData: animationData,
              loop: true, // Optional
              autoplay: true,
            }}
            height={300} // Optional
            width={300} // Optional
          />
          {/* <img src={historyIcon} className="pe-3" alt="cartIcon" /> */}
          <p className="no-cart-list mt-3"> No History Yet</p>
          <div>
            <NormalBtn
              btnlabel="Start To Order"
              className={"start-order-btn mt-3"}
              onClick={() => {
                setTimeout(() => {
                  navigate("/");
                }, 500);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
