import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/login/loginSlice";
import cartReducer from "./features/cart/cartSlice";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";



const persistConfig = {
  key: "root",
  storage,
  whitelist:["login"]
};


const rootReducer = combineReducers({
  login: loginReducer,
  cart: cartReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
