import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import banksReducer from "./slices/banksSlice";
import accountsReducer from "./slices/accountsSlice";
import transactionsReducer from "./slices/transactionsSlice";
import uiReducer from "./slices/uiSlice";
// Import and add more reducers here as your app grows

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    banks: banksReducer,
    accounts: accountsReducer,
    transactions: transactionsReducer,
    ui: uiReducer,
    // Add more slices here
  },
  // Middleware and DevTools are enabled by default
});

// Types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
