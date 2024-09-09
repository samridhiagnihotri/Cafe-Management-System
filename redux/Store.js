import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import foodReducer from "./slices/foodSlice";
import cartReducer from "./slices/cartSlice";


// Create and configure the Redux store
export const store = configureStore({
  reducer: {
    user: userReducer,
    food: foodReducer,
    cart: cartReducer,
  },
});
