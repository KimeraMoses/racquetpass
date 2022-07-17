import {
  createNewBusinessFail,
  createNewBusinessPending,
  createNewBusinessSuccess,
} from "../Slices/businessSlice";

export const createNewBusiness =
  (
    first_name,
    last_name,
    phone,
    street,
    shop_name,
    apartment,
    city,
    country,
    state,
    zip_code,
    email,
    password
  ) =>
  async (dispatch) => {
    dispatch(createNewBusinessPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/v1/catalog/register-business`,
        {
          method: "POST",
          body: JSON.stringify({
            first_name,
            last_name,
            phone,
            street,
            shop_name,
            apartment,
            city,
            country,
            state,
            zip_code,
            email,
            password,
          }),
          headers: new Headers({
            "Content-type": "application/json",
            apiKey: process.env.REACT_APP_APIKEY,
          }),
        }
      );
      const res = await response.json();
      console.log("biz data", res);
      dispatch(createNewBusinessSuccess(res));
    } catch (error) {
      dispatch(createNewBusinessFail(error));
      console.log("biz error", error);
    }
  };

export const editBusinessDetails =
  (
    authToken,
    Id,
    first_name,
    last_name,
    phone,
    street,
    shop_name,
    apartment,
    city,
    country,
    state,
    zip_code,
    email,
    password
  ) =>
  async (dispatch) => {
    // dispatch(editBusinessPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/v1/catalog/edit-shop-settings/${Id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            first_name,
            last_name,
            phone,
            street,
            shop_name,
            apartment,
            city,
            country,
            state,
            zip_code,
            email,
            password,
          }),
          headers: new Headers({
            "Content-type": "application/json",
            apiKey: process.env.REACT_APP_APIKEY,
            Authorization: "Bearer " + authToken,
          }),
        }
      );
      const res = await response.json();
      console.log(res);
      // dispatch(editBusinessSuccess(res));
    } catch (error) {
      // dispatch(editBusinessFail(error));
      console.log(error);
    }
  };

export const fetchAllOrders = (authToken) => {
  return async (dispatch) => {
    // dispatch(fetchOrdersPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/v1/orders`,
        {
          method: "GET",
          headers: new Headers({
            "Content-type": "application/json",
            Authorization: "Bearer " + authToken,
            apiKey: process.env.REACT_APP_APIKEY,
          }),
        }
      );
      const data = await response.json();
      console.log("Orders", data);
      // dispatch(fetchOrdersSuccess(data.orders));
    } catch (error) {
      // dispatch(fetchOrdersFail(error));
      console.log("Orders err", error);
    }
  };
};
