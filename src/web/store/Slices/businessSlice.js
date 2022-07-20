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
    setBusinessLoading: (state) => {
      state.isLoading = true;
    },
    createNewBusinessSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    editBusinessSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
  },
});
const { reducer, actions } = businessSlice;

export const {
  saveEnteredValues,
  clearEnteredValues,
  setBusinessLoading,
  createNewBusinessSuccess,
  editBusinessSuccess,
} = actions;

export default reducer;
