import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/authSlice";
import { bookReducer } from "./slice/bookSlice";
import { cartReducer } from "./slice/cartSlice";
import { checkoutReducer } from "./slice/checkoutSlice";
import { orderReducer } from "./slice/orderSlice";

//Cấu hình redux-persist
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Cấu hình persist
const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth", "cart"],
};

const reducers = combineReducers({
  auth: authReducer,
  book: bookReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  orders: orderReducer,
});

// Thực hiện persist Reducer
const persistedReducers = persistReducer(rootPersistConfig, reducers);

const store = configureStore({
  reducer: persistedReducers,
  // Fix warning error when implement redux-persist
  // https://stackoverflow.com/a/63244831/8324172
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
