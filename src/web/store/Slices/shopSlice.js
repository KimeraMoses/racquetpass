import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shops: [],
  shop: {},
  orders: [],
  order: {},
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
  setShopLoading,
  getAllShopOrders,
  getShopOrder,
} = actions;

export default reducer;
