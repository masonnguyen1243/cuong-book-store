import { configureStore } from "@reduxjs/toolkit";

//Cấu hình redux-persist
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Cấu hình persist
const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"],
};

const reducers = combineReducers({});

// Thực hiện persist Reducer
const persistedReducers = persistReducer(rootPersistConfig, reducers);

const store = configureStore({
  reducer: persistedReducers,
  // Fix warning error when implement redux-persist
  // https://stackoverflow.com/a/63244831/8324172
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
