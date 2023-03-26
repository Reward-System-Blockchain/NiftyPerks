import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  items: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    togglePanel: (state) => {
      state.isOpen = !state.isOpen;
    },
    addNotification: (state, action) => {
      state.items.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.items = state.items.filter((item) => item.sid !== action.payload.sid);
    },
  },
});

export const { togglePanel, addNotification, removeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
