import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        addCartItem: (state, action) => {
            const { item, quantity } = action.payload;
            const existingItemIndex = state.cart.findIndex(cartItem => cartItem.dishName === item.dishName);

            if (existingItemIndex !== -1) {
                // If item already exists in cart, update its quantity
                state.cart[existingItemIndex].quantity += quantity;
            } else {
                // If item doesn't exist in cart, add it with the given quantity
                state.cart.push({ ...item, quantity });
            }
        },
        removeCartItem: (state, action) => {
            const { item,quantity } = action.payload;
            const existingItemIndex = state.cart.findIndex(cartItem => cartItem?.dishName === item.dishName);

            if (existingItemIndex !== -1) {
                if (state.cart[existingItemIndex].quantity === 1) {
                    state.cart.splice(existingItemIndex, 1);
                } else {
                    state.cart[existingItemIndex].quantity -= quantity;
                }
            }
        },

        // You can define other reducers here as needed
    },
});

export const { addCartItem, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
