import { Badge, useScrollTrigger } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Paperout from "../../assets/icon/Paper.svg"
import Percent from "../../assets/icon/Percent.svg"



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
    '& .MuiBadge-badge': {
        backgroundColor: '#fff',
        color: "#000" // Set your custom background color here
    },
}));


function Navbar() {
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart.cart);
    return (
        <div className="button-container fixed-top">
            <button className="nav-button "
                onClick={() => {
                    setTimeout(() => {
                        navigate("/");
                    }, 100);
                }}
            >


                <svg
                    className="icon"
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 1024 1024"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"
                    ></path>
                </svg>
            </button>
            <button className="nav-button">
                <img src={Percent} />
            </button>

            <button className="nav-button"
                onClick={() => {
                    setTimeout(() => {
                        navigate("/orders");
                    }, 100);
                }} >
                <img src={Paperout} />
            </button>

            <button className="nav-button"
                onClick={() => {
                    setTimeout(() => {
                        navigate("/cart");
                    }, 100);
                }} >
                <CustomBadge badgeContent={cart.length} >

                    <svg
                        className="icon"
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path
                            d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                        ></path>
                    </svg>
                </CustomBadge>
            </button>
        </div>
    );
}

export default Navbar;




{/* <AppBar style={{ backgroundColor: '#F2F2F2', boxShadow: 'none' }}>
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
            </AppBar> */}