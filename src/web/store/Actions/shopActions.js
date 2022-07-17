//FETCH ALL SHOPS

import {
  fetchShopsFail,
  fetchShopsPending,
  fetchShopsSuccess,
  sendMessageFail,
  sendMessagePending,
  sendMessageSucess,
} from "../Slices/shopSlice";

export const fetchAllShops = () => {
  return async (dispatch) => {
    dispatch(fetchShopsPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/v1/shops`,
        {
          method: "GET",
          headers: new Headers({
            "Content-type": "application/json",
            apiKey: process.env.REACT_APP_APIKEY,
          }),
        }
      );
      const data = await response.json();
      dispatch(fetchShopsSuccess(data?.list_shops));
    } catch (error) {
      dispatch(fetchShopsFail(error));
    }
  };
};

//FETCH ALL ENABLED SHOPS
export const fetchEnabledShops = () => {
  return async (dispatch) => {
    // dispatch(fetchEnabledShopsPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/v1/shops/get-enabled`,
        {
          method: "GET",
          headers: new Headers({
            "Content-type": "application/json",
            apiKey: process.env.REACT_APP_APIKEY,
          }),
        }
      );
      const data = await response.json();
      // dispatch(fetchEnabledShopsSuccess(data?.shops));
      console.log("shops", data?.shops);
    } catch (error) {
      // dispatch(fetchEnabledShopssFail(error));
      console.log(error);
    }
  };
};

//DON'T SEE SHOP MESSAGE

export const sendShopInquiry =
  (shop_name, city, state, phone, shop_search) => async (dispatch) => {
    dispatch(sendMessagePending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/v1/catalog/message`,
        {
          method: "POST",
          body: JSON.stringify({
            shop_name,
            city,
            state,
            phone,
            shop_search,
          }),
          headers: new Headers({
            "Content-type": "application/json",
            apiKey: process.env.REACT_APP_APIKEY,
          }),
        }
      );
      const res = await response.json();
      // console.log("msg data", res);
      dispatch(sendMessageSucess(res.status));
    } catch (error) {
      dispatch(sendMessageFail(error));
      // console.log("msg error", error);
    }
  };
