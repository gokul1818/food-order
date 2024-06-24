import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    deviceID: 0,
    locationMatch: false,
    hotelId: "",
  },
  reducers: {
    updateDeviceID: (state, action) => {
      state.deviceID = action.payload;
    },
    updateLocationMatch: (state, action) => {
      state.locationMatch = action.payload;
    },
    updateHotelId: (state, action) => {
      state.hotelId = action.payload;
    },
  },
});

export const { updateDeviceID, updateLocationMatch, updateHotelId } =
  authSlice.actions;
export default authSlice.reducer;
