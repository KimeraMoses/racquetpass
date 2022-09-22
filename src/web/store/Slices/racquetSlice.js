import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  racquets: [],
  racquet: {},
  hybrid: false,
  brand: {},
  main: {},
  cross: {},
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
    setIsHybrid: (state, { payload }) => {
      state.hybrid = payload;
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
    setStringBrand: (state, { payload }) => {
      state.brand = payload;
      state.main = payload;
      state.cross = payload;
    },
    setStringMain: (state, { payload }) => {
      state.main = payload;
    },
    setStringCross: (state, { payload }) => {
      state.cross = payload;
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
  setIsHybrid,
  setStringBrand,
  setStringCross,
  setStringMain,
} = actions;

export default reducer;
