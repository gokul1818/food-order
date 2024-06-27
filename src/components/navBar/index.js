import { Badge, useScrollTrigger } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import home from "../../assets/images/home.png";
import offer from "../../assets/images/offer.png";
import cartIcon from "../../assets/images/cart.png";
import history from "../../assets/images/history.png";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { updateOrderLength } from "../../redux/reducers/ordersSlice";
import GeolocationComponent from "../geolocation";
import shineSound from "../../assets/effect/shine.mp3";
import { Howl } from "howler";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import HistorySharpIcon from "@mui/icons-material/HistorySharp";
import FastfoodSharpIcon from "@mui/icons-material/FastfoodSharp";
import LocalOfferSharpIcon from "@mui/icons-material/LocalOfferSharp";
const CustomBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#00BA00",
    color: "#fff", // Set your custom background color here
  },
}));

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const userPhoneNumber = localStorage.getItem("userPhoneNumber");

  useEffect(() => {
    if (!userPhoneNumber) {
      console.error("No user phone number found in local storage.");
      return;
    }

    const ordersCollection = collection(db, "orders");
    const q = query(
      ordersCollection,
      where("phoneNumber", "==", userPhoneNumber)
    );

    // Set up a real-time listener
    const unsubscribe = onSnapshot(
      q,
      (ordersSnapshot) => {
        const ordersList = ordersSnapshot.docs.map((doc) => ({
          OrderId: doc.id,
          ...doc.data(),
        }));
        dispatch(updateOrderLength(ordersList.length));
      },
      (error) => {
        console.error("Error fetching orders:", error);
      }
    );

    // Cleanup function to unsubscribe from the listener
    return () => unsubscribe();
  }, [dispatch, userPhoneNumber]);

  const orderedFood = useSelector((state) => state.order.orderLength);

  const cart = useSelector((state) => state.cart.cart);

  const SelectSound = new Howl({
    src: [shineSound],
    volume: 3,
  });
  return (
    <>
      <div className="button-container fixed-bottom">
        <button
          className="nav-button "
          onClick={() => {
            SelectSound.play();
            setTimeout(() => {
              navigate("/");
            }, 100);
          }}
        >
          <HomeSharpIcon
            sx={{
              background: path == "/" ? "#470d56" : "",
              color: path == "/" ? "#fff" : "#16121e",
              borderRadius: path == "/" ? "50%" : "0%",
              padding: 1,
              fontSize: 40,
              boxShadow: path == "/" ? "0px 0px 20px 2px #470d56 " : "",
            }}
          />
          {/* <img src={home} className="nav-icon" /> */}
        </button>
        <button
          className="nav-button"
          onClick={() => {
            SelectSound.play();
            setTimeout(() => {
              navigate("/offers");
            }, 100);
          }}
        >
          {/* <img src={offer} className="nav-icon" /> */}
          <FastfoodSharpIcon
            sx={{
              background: path == "/offers" ? "#470d56" : "",
              color: path == "/offers" ? "#fff" : "#16121e",
              borderRadius: path == "/offers" ? "50%" : "0%",
              padding: 1,
              fontSize: 40,
              boxShadow: path == "/offers" ? "0px 0px 20px 2px #470d56 " : "",
            }}
          />
        </button>

        <button
          className="nav-button"
          onClick={() => {
            SelectSound.play();
            setTimeout(() => {
              navigate("/order-status");
            }, 100);
          }}
        >
          <CustomBadge badgeContent={orderedFood}>
            <HistorySharpIcon
              sx={{
                background: path == "/order-status" ? "#470d56" : "",
                color: path == "/order-status" ? "#fff" : "#16121e",
                borderRadius: "50%",
                padding: 1,
                fontSize: 40,
                boxShadow:
                  path == "/order-status" ? "0px 0px 20px 2px #470d56 " : "",
              }}
            />
          </CustomBadge>
        </button>

        <button
          className="nav-button"
          onClick={() => {
            SelectSound.play();
            setTimeout(() => {
              navigate("/cart");
            }, 100);
          }}
        >
          <CustomBadge badgeContent={cart?.length}>
            <ShoppingCartSharpIcon
              sx={{
                background: path == "/cart" ? "#470d56" : "",
                color: path == "/cart" ? "#fff" : "#16121e",
                borderRadius: "50%",
                padding: 1,
                fontSize: 40,
                boxShadow: path == "/cart" ? "0px 0px 20px 2px #470d56 " : "",
              }}
            />
          </CustomBadge>
        </button>
      </div>
      <div className="mt-5"></div>
      <GeolocationComponent />
    </>
  );
}

export default Navbar;

{
  /* <AppBar style={{ backgroundColor: '#F2F2F2', boxShadow: 'none' }}>
                <Toolbar>
                    <div className='d-flex justify-content-between align-items-center w-100' >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => {
                                // Handle hamburger icon click event
                            }}
                        >
                            <img src={MenuIcon} alt="Menu" />
                        </IconButton>

                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="shopping cart"
                            sx={{ mr: 0 }}
                            onClick={() => {
                                // Handle cart icon click event
                            }}
                        >
                            <Link to="/cart">

                                <Badge badgeContent={cart.length} color="warning">
                                    <img src={ShoppingCartIcon} alt="Shopping Cart" />
                                </Badge>
                            </Link>

                        </IconButton>

                    </div>
                </Toolbar>
            </AppBar> */
}
