import FastfoodSharpIcon from "@mui/icons-material/FastfoodSharp";
import HistorySharpIcon from "@mui/icons-material/HistorySharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import { Badge } from "@mui/material";
import { styled } from "@mui/system";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Howl } from "howler";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import shineSound from "../../assets/effect/shine.mp3";
import { db } from "../../firebaseConfig";
import { updateOrderLength } from "../../redux/reducers/ordersSlice";
import GeolocationComponent from "../geolocation";
import "./style.css";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
const CustomBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#fff",
    color: "#000", // Set your custom background color here
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
          className="nav-button  "
          onClick={() => {
            // SelectSound.play();
            setTimeout(() => {
              navigate("/");
            }, 100);
          }}
        >
          <HomeSharpIcon
            sx={{
              color: path == "/" ? "#410d4f" : "#16121e",
              padding: 1,
              paddingBottom: 0,
              fontSize: 40,
            }}
          />
          <span 
                className="nav-bottom-name"
                style={{
                  color: path == "/categories" ? "#410d4f" : "#16121e",
                }}>Home</span>
        </button>

        <button
          className="nav-button"
          onClick={() => {
            // SelectSound.play();
            setTimeout(() => {
              navigate("/categories");
            }, 100);
          }}
        >
          <RestaurantMenuIcon
            sx={{
              color: path == "/categories" ? "#410d4f" : "#16121e",
              padding: 1,
              fontSize: 40,
            }}
          />
          <span
            className="nav-bottom-name"
            style={{
              color: path == "/categories" ? "#410d4f" : "#16121e",
            }}
          >
            menu
          </span>
        </button>

        <button
          className="nav-button"
          onClick={() => {
            // SelectSound.play();
            setTimeout(() => {
              navigate("/offers");
            }, 100);
          }}
        >
          {/* <img src={offer} className="nav-icon" /> */}
          <FastfoodSharpIcon
            sx={{
              color: path == "/offers" ? "#410d4f" : "#16121e",
              padding: 1,
              fontSize: 40,
            }}
          />
          <span 
                className="nav-bottom-name"
                style={{
                  color: path == "/categories" ? "#410d4f" : "#16121e",
                }}>offers</span>
        </button>

        <button
          className="nav-button"
          onClick={() => {
            // SelectSound.play();
            setTimeout(() => {
              navigate("/order-status");
            }, 100);
          }}
        >
          <CustomBadge badgeContent={orderedFood}>
            <HistorySharpIcon
              sx={{
                color: path == "/order-status" ? "#410d4f" : "#16121e",
                padding: 1,
                fontSize: 40,
              }}
            />
          </CustomBadge>
          <span 
          
          className="nav-bottom-name"
          style={{
            color: path == "/categories" ? "#410d4f" : "#16121e",
          }}>orders</span>
        </button>
      </div>
      {Boolean(path !== "/cart") &&
      Boolean(path !== "/cart/checkout") &&
      cart?.length ? (
        <div className="cart-logo-container">
          <button
            onClick={() => {
              setTimeout(() => {
                navigate("/cart");
              }, 100);
            }}
            style={{
              background: "transparent",
              borderColor: "transparent",
              marginTop: "10px",
            }}
          >
            <CustomBadge badgeContent={cart?.length}>
              <ShoppingCartSharpIcon
                sx={{
                  color: "#fff",
                  padding: 1,
                  fontSize: 40,
                }}
              />
            </CustomBadge>
          </button>
        </div>
      ) : (
        <></>
      )}

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
