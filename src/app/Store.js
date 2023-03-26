import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice.js";
import NotificationSlice from "./NotificationSlice.js";

const Store = configureStore({
    reducer: {
        cart: CartSlice,
        notifications: NotificationSlice
    }
});

export default Store;