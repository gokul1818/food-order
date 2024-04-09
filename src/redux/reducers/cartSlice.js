
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        addCartItem: (state, action) => {
            console.log(action)
            state.cart.push(action.payload);
        },
        removeCartItem: (state, action) => {
            const indexToRemove = state.cart.findIndex(item => item.id === action.payload.id);
            if (indexToRemove !== -1) {
                state.cart.splice(indexToRemove, 1);
            }
        },
        // You can define other reducers here as needed
    },
});

export const { addCartItem, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
