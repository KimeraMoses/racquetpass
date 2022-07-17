import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shops: [],
  shop: {},
  isLoading: false,
  isFetching: false,
  message: "",
};

const shopSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {
    fetchShopsPending: (state) => {
      state.isFetching = true;
    },
    fetchShopsSuccess: (state, { payload }) => {
      state.isFetching = false;
      state.shops = payload;
    },
    fetchShopsFail: (state, { payload }) => {
      state.isFetching = false;
      state.message = payload;
    },
    fetchShopPending: (state) => {
      state.isFetching = true;
    },
    fetchShopSuccess: (state, { payload }) => {
      state.isFetching = false;
      state.shop = payload;
    },
    fetchShopFail: (state, { payload }) => {
      state.isFetching = false;
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
  fetchShopPending,
  fetchShopSuccess,
  fetchShopFail,
  updateShopSettingsPending,
  updateShopSettingsSuccess,
  updateShopSettingsFail,
  sendMessagePending,
  sendMessageSucess,
  sendMessageFail,
} = actions;

export default reducer;
