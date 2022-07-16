import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  businessData: {},
  isLoading: false,
  message: "",
};

export const businessSlice = createSlice({
  initialState,
  name: "businessSlice",
  reducers: {
    saveEnteredValues(state, { payload }) {
      state.businessData = { ...state.businessData, ...payload };
    },
    clearEnteredValues(state) {
      state.businessData = {};
    },
    createNewBusinessPending: (state) => {
      state.isLoading = true;
    },
    createNewBusinessSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload.status;
    },
    createNewBusinessFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload.status;
    },
  },
});
const { reducer, actions } = businessSlice;

export const {
  saveEnteredValues,
  clearEnteredValues,
  createNewBusinessPending,
  createNewBusinessSuccess,
  createNewBusinessFail,
} = actions;

export default reducer;
