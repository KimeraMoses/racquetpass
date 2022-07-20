//FETCH ALL SHOPS

import { allShopsRoute, axios, enabledShopsRoute } from "lib/index";
import {
  fetchShopFail,
  fetchShopPending,
  fetchShopsFail,
  fetchShopsPending,
  fetchShopsSuccess,
  fetchShopSuccess,
  sendMessageFail,
  sendMessagePending,
  sendMessageSucess,
} from "../Slices/shopSlice";

//FETCH ALL SHOPS

export const fetchAllShops = () => {
  return async (dispatch) => {
    dispatch(fetchShopsPending());
    const { url } = allShopsRoute();
    try {
      const res = await axios.get(url);
      dispatch(fetchShopsSuccess(res.data?.list_shops));
    } catch (error) {
      dispatch(fetchShopsFail(error));
    }
  };
};
export const fetchEnabledShops = () => {
  return async (dispatch) => {
    dispatch(fetchShopsPending());
    const { url } = enabledShopsRoute();
    try {
      const res = await axios.get(url);
      dispatch(fetchShopsSuccess(res.data?.list_shops));
    } catch (error) {
      dispatch(fetchShopsFail(error));
    }
  };
};

//FETCH SHOP DETAILS
export const fetchShopDetails = (authToken, shopId) => {
  return async (dispatch) => {
    dispatch(fetchShopPending());
    if (shopId && authToken) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASEURL}/api/v1/shops/${shopId}`,
          {
            method: "GET",
            headers: new Headers({
              "Content-type": "application/json",
              apiKey: process.env.REACT_APP_APIKEY,
              Authorization: "Bearer " + authToken,
            }),
          }
        );
        const data = await response.json();
        dispatch(fetchShopSuccess(data?.shop));
      } catch (error) {
        dispatch(fetchShopFail(error));
      }
    }
  };
};

//DON'T SEE SHOP MESSAGE

export const sendShopInquiry =
  (shop_name, city, state, phone, search) => async (dispatch) => {
    dispatch(sendMessagePending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/v1/shops/shop-requests`,
        {
          method: "POST",
          body: JSON.stringify({
            shop_name,
            city,
            state,
            phone,
            search,
          }),
          headers: new Headers({
            "Content-type": "application/json",
            apiKey: process.env.REACT_APP_APIKEY,
          }),
        }
      );
      const res = await response.json();
      dispatch(sendMessageSucess(res.status));
    } catch (error) {
      dispatch(sendMessageFail(error));
    }
  };
