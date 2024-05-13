import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { alertReducer } from "./reducers/alertReducer";
import { productReducer } from "./reducers/productsReducer";
// import { loadUserCart } from "./middleware/loaduserCart.middleware";
import { userReducer } from "./reducers/userReducer";
// import thunkMiddleware from "redux-thunk";
export const store = configureStore({
  reducer: { authReducer, alertReducer, productReducer, userReducer },
  // middleware: [loadUserCart, thunkMiddleware],
});
