import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
}

const initialState: TransactionsState = {
  transactions: [],
  loading: false,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    removeTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (tx: Transaction) => tx.id !== action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setTransactions,
  addTransaction,
  removeTransaction,
  setLoading,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
