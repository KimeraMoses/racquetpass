import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shops: [],
  isLoading: false,
  message: "",
};

const shopSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {
    fetchShopsPending: (state) => {
      state.isLoading = true;
    },
    fetchShopsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.shops = payload;
    },
    fetchShopsFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    updateShopSettingsPending: (state) => {
      state.isLoading = true;
    },
    updateShopSettingsSuccess: (state, { payload }) => {
      state.isLoading = false;
    },
    updateShopSettingsFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    sendMessagePending: (state) => {
      state.isLoading = true;
    },
    sendMessageSucess: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    sendMessageFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
  },
});

const { reducer, actions } = shopSlice;

export const {
  fetchShopsPending,
  fetchShopsSuccess,
  fetchShopsFail,
  updateShopSettingsPending,
  updateShopSettingsSuccess,
  updateShopSettingsFail,
  sendMessagePending,
  sendMessageSucess,
  sendMessageFail,
} = actions;

export default reducer;
