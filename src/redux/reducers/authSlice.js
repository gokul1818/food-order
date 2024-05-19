import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "order",
  initialState: {
    deviceID: 0,
  },
  reducers: {
    updateDeviceID: (state, action) => {
      state.deviceID = action;
    },
  },
});

export const { updateDeviceID } = authSlice.actions;
export default authSlice.reducer;
