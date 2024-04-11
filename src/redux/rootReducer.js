import { combineReducers } from '@reduxjs/toolkit';
import cartSlice from './reducers/cartSlice';

const rootReducer = combineReducers({
  cart: cartSlice,
});

export default rootReducer;
