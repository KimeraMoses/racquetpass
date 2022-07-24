import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  racquets: [],
  racquet: {},
  strings: [],
  isLoading: false,
  message: "",
};

export const racquetSlice = createSlice({
  initialState,
  name: "raquetSlice",
  reducers: {
    setRacquetsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    getRacquetsSuccess: (state, { payload }) => {
      state.racquets = payload;
    },
    getRacquetSuccess: (state, { payload }) => {
      state.racquet = payload;
    },
    getRacquetStrings: (state, { payload }) => {
      state.strings = payload;
    },
    removeRacquetFromState: (state) => {
      state.racquet = {};
    },
  },
});
const { reducer, actions } = racquetSlice;

export const {
  setRacquetsLoading,
  getRacquetsSuccess,
  getRacquetSuccess,
  getRacquetStrings,
  removeRacquetFromState,
} = actions;

export default reducer;
