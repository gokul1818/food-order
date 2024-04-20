import { combineReducers } from '@reduxjs/toolkit';
import cartSlice from './reducers/cartSlice';
import orderSlice from "./reducers/ordersSlice"
const rootReducer = combineReducers({
  cart: cartSlice,
  order:orderSlice
});

export default rootReducer;
