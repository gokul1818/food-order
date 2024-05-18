import { Badge, useScrollTrigger } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.css";
import home from "../../assets/images/home.png";
import offer from "../../assets/images/offer.png";
import cartIcon from "../../assets/images/cart.png";
import history from "../../assets/images/history.png";

function ElevationScroll({ children }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const CustomBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "rgb(15, 155, 10)",
    color: "#fff", // Set your custom background color here
  },
}));

function Navbar() {
  const navigate = useNavigate();

  const orderedFood = useSelector((state) => state.order.order);
  console.log(orderedFood, "orderStatus");

  const cart = useSelector((state) => state.cart.cart);
  return (
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
        <CustomBadge badgeContent={orderedFood.length}>
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
