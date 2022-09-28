import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shops: [],
  shop: {},
  orders: [],
  order: {},
  isLoading: false,
  isFetching: false,
  message: "",
  backFromPreview: false,
  reviewArrowSource: false,
  normalFlow: false,
  contacts: {},
};

const shopSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {
    setBackFromPreview: (state, { payload }) => {
      state.backFromPreview = payload;
    },
    setReviewArrowSource: (state, { payload }) => {
      state.reviewArrowSource = payload;
    },
    setNormalFlow: (state, { payload }) => {
      state.normalFlow = payload;
    },
    setShopLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setShopFetching: (state, { payload }) => {
      state.isFetching = payload;
    },
    getAllShops: (state, { payload }) => {
      state.shops = payload;
    },
    getShop: (state, { payload }) => {
      state.shop = payload;
    },
    getAllShopOrders: (state, { payload }) => {
      state.orders = payload;
    },
    getShopOrder: (state, { payload }) => {
      state.order = payload;
    },
    getOrderContact: (state, { payload }) => {
      state.contacts = payload;
    },
  },
});

const { reducer, actions } = shopSlice;

export const {
  setShopFetching,
  getAllShops,
  getShop,
  setShopLoading,
  getAllShopOrders,
  getShopOrder,
  setBackFromPreview,
  setReviewArrowSource,
  setNormalFlow,
  getOrderContact,
} = actions;

export default reducer;
