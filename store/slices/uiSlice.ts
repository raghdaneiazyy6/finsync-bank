import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isSidebarOpen: boolean;
  theme: "light" | "dark";
  notification: string | null;
}

const initialState: UIState = {
  isSidebarOpen: true,
  theme: "light",
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    setNotification: (state, action: PayloadAction<string | null>) => {
      state.notification = action.payload;
    },
  },
});

export const { toggleSidebar, setTheme, setNotification } = uiSlice.actions;
export default uiSlice.reducer;
