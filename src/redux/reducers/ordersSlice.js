import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    orderLength: 0,
    newOrder: false,
    lastOrder: [],
  },
  reducers: {
    updateOrder: (state, action) => {
      state.order.push({ ...action.payload });
    },
    updateOrderLength: (state, action) => {
      state.orderLength = action.payload;
    },
    updateNewOrder: (state, action) => {
      state.newOrder = action.payload;
    },
    updateLastOrder: (state, action) => {
      state.lastOrder = action.payload;
    },
  },
});

export const {
  updateOrder,
  updateOrderLength,
  updateNewOrder,
  updateLastOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
