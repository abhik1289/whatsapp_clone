

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./features/userReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Define persist configuration
const persistConfig = {
  key: "root", // Root key for the persisted state
  storage, // Storage mechanism (localStorage, sessionStorage, etc.)
  whitelist: ["user"], // List of reducers to persist
};
// there are two store system 1)storage and 2)systemStorage
//  1) Sessionstorage data gone when broswer closed or pc restart
// 2) but storage data is still available 
// Combine reducers
const rootReducer = combineReducers({
  user: userSlice.reducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: true, // Enable Redux DevTools
});

// Create persistor
export const persistor = persistStore(store);
