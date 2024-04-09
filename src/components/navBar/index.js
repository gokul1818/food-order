import React from 'react';
import { AppBar, Toolbar, IconButton, useScrollTrigger, Badge } from '@mui/material';
import MenuIcon from "../../assets/icon/menu.svg";
import ShoppingCartIcon from "../../assets/icon/shopping-cart.svg";
import { useDispatch, useSelector } from "react-redux";

function ElevationScroll({ children }) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

function Navbar() {
    const cart = useSelector(state => state.cart.cart);
    return (
        <ElevationScroll>
            <AppBar style={{ backgroundColor: '#F2F2F2', boxShadow: 'none' }}>
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
                            sx={{ ml: 1 }}
                            onClick={() => {
                                // Handle cart icon click event
                            }}
                        >
                            <Badge badgeContent={cart.length} color="warning">
                                <img src={ShoppingCartIcon} alt="Shopping Cart" />
                            </Badge>
                        </IconButton>

                    </div>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    );
}

export default Navbar;
