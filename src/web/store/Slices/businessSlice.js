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
    editBusinessPending: (state) => {
      state.isLoading = true;
    },
    editBusinessSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload.status;
    },
    editBusinessFail: (state, { payload }) => {
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
  editBusinessPending,
  editBusinessSuccess,
  editBusinessFail,
} = actions;

export default reducer;
