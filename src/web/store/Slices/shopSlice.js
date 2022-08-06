import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shops: [],
  shop: {},
  orders: [],
  order: {},
  sessionLink: "",
  onBoardLink: "",
  // paymentUrl: "",
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
    setShopFetching: (state, { payload }) => {
      state.isFetching = payload;
    },
    getAllShops: (state, { payload }) => {
      state.shops = payload;
    },
    getShop: (state, { payload }) => {
      state.shop = payload;
    },
    getSessionLink: (state, { payload }) => {
      state.link = payload;
    },
    getOnboardSessionLink: (state, { payload }) => {
      state.onBoardLink = payload;
    },
    getAllShopOrders: (state, { payload }) => {
      state.orders = payload;
    },
    getShopOrder: (state, { payload }) => {
      state.order = payload;
    },
  },
});

const { reducer, actions } = shopSlice;

export const {
  setShopFetching,
  getAllShops,
  getShop,
  getSessionLink,
  getOnboardSessionLink,
  setShopLoading,
  getAllShopOrders,
  getShopOrder,
} = actions;

export default reducer;
