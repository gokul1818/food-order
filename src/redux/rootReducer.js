// reducers/index.js

import { combineReducers } from '@reduxjs/toolkit';
import cartSlice from './reducers/cartSlice';
// Import other reducers as needed

const rootReducer = combineReducers({
  cart: cartSlice,
  // Add other reducers here
});

export default rootReducer;
