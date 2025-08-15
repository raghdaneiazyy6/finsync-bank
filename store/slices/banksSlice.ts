import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BanksState {
  banks: Bank[];
  loading: boolean;
}

const initialState: BanksState = {
  banks: [],
  loading: false,
};

const banksSlice = createSlice({
  name: "banks",
  initialState,
  reducers: {
    setBanks: (state, action: PayloadAction<Bank[]>) => {
      state.banks = action.payload;
    },
    addBank: (state, action: PayloadAction<Bank>) => {
      state.banks.push(action.payload);
    },
    removeBank: (state, action: PayloadAction<string>) => {
      state.banks = state.banks.filter(
        (bank: Bank) => bank.$id !== action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setBanks, addBank, removeBank, setLoading } = banksSlice.actions;
export default banksSlice.reducer;
