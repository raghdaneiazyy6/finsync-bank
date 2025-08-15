import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountsState {
  accounts: Account[];
  loading: boolean;
}

const initialState: AccountsState = {
  accounts: [],
  loading: false,
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<Account[]>) => {
      state.accounts = action.payload;
    },
    addAccount: (state, action: PayloadAction<Account>) => {
      state.accounts.push(action.payload);
    },
    removeAccount: (state, action: PayloadAction<string>) => {
      state.accounts = state.accounts.filter(
        (acc: Account) => acc.id !== action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setAccounts, addAccount, removeAccount, setLoading } =
  accountsSlice.actions;
export default accountsSlice.reducer;
