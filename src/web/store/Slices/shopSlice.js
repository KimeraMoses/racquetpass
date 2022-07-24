import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shops: [],
  shop: {},
  orders: [],
  order: {},
  link: "",
  paymentUrl: "",
  isLoading: false,
  isFetching: false,
  message: "",
};

const shopSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {
    setShopLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
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
    getSessionLink: (state, { payload }) => {
      state.link = payload;
    },
    getAllShopOrders: (state, { payload }) => {
      state.orders = payload;
    },
    getAllShopOrder: (state, { payload }) => {
      state.order = payload;
    },
    getPaymentUrl: (state, { payload }) => {
      state.paymentUrl = payload;
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
  getSessionLink,
  setShopLoading,
  getAllShopOrders,
  getAllShopOrder,
  getPaymentUrl,
} = actions;

export default reducer;
