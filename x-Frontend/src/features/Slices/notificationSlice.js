import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  tweetDataFromRedux: [],
  unReadNotificationCount: 0,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    postNotification: (state, action) => {
      // state.tweetDataFromRedux = action.payload;
      if (action.payload) {
        state.tweetDataFromRedux.unshift(action.payload);
        state.unReadNotificationCount++;
      }
    },
    resetNotificationCountToZero :(state,action)=>{
      state.unReadNotificationCount = 0
    }
  },
});

export const { postNotification,resetNotificationCountToZero } = notificationSlice.actions;

export default notificationSlice.reducer;
