import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: []
    },
    reducers: {
        updateOrder: (state, action) => {
            state.order = action.payload
        }

    },
});

export const { updateOrder } = orderSlice.actions;
export default orderSlice.reducer;
