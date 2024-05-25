import { Badge, useScrollTrigger } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

const CustomBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#00BA00",
    color: "#fff", // Set your custom background color here
  },
}));

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  return (
    <>
      <div className="button-container fixed-top">
        <button
          className="nav-button "
          onClick={() => {
            setTimeout(() => {
              navigate("/");
            }, 100);
          }}
        >
          <img src={home} className="nav-icon" />
        </button>
        <button
          className="nav-button"
          onClick={() => {
            setTimeout(() => {
              navigate("/order-status");
            }, 100);
          }}
        >
          <img src={offer} className="nav-icon" />
        </button>

        <button
          className="nav-button"
          onClick={() => {
            setTimeout(() => {
              navigate("/order-status");
            }, 100);
          }}
        >
          <CustomBadge badgeContent={orderedFood}>
            <img src={history} className="nav-icon" />
          </CustomBadge>
        </button>

        <button
          className="nav-button"
          onClick={() => {
            setTimeout(() => {
              navigate("/cart");
            }, 100);
          }}
        >
          <CustomBadge badgeContent={cart?.length}>
            <img src={cartIcon} className="nav-icon" />
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
