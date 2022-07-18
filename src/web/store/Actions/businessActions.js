import {
  createNewBusinessFail,
  createNewBusinessPending,
  createNewBusinessSuccess,
  editBusinessFail,
  editBusinessPending,
  editBusinessSuccess,
} from "../Slices/businessSlice";
import { fetchShopDetails } from "./shopActions";

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
      dispatch(createNewBusinessSuccess(res));
    } catch (error) {
      dispatch(createNewBusinessFail(error));
    }
  };

export const editBusinessDetails =
  (
    authToken,
    Id,
    name,
    email,
    phone,
    etimated_delivery_time,
    labor_price,
    country,
    allow_own_strings,
    address
  ) =>
  async (dispatch) => {
    dispatch(editBusinessPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/v1/catalog/edit-shop-settings/${Id}`,
        {
          method: "POST",
          body: JSON.stringify({
            name,
            email,
            phone,
            etimated_delivery_time,
            labor_price,
            country,
            allow_own_strings,
            address,
          }),
          headers: new Headers({
            "Content-type": "application/json",
            apiKey: process.env.REACT_APP_APIKEY,
            Authorization: "Bearer " + authToken,
          }),
        }
      );
      const res = await response.json();
      dispatch(editBusinessSuccess(res.status));
      dispatch(fetchShopDetails(authToken, Id));
    } catch (error) {
      dispatch(editBusinessFail(error));
    }
  };

// export const fetchAllOrders = (authToken) => {
//   return async (dispatch) => {
//     // dispatch(fetchOrdersPending());
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_BASEURL}/api/v1/orders`,
//         {
//           method: "GET",
//           headers: new Headers({
//             "Content-type": "application/json",
//             Authorization: "Bearer " + authToken,
//             apiKey: process.env.REACT_APP_APIKEY,
//           }),
//         }
//       );
//       const data = await response.json();
//       // console.log("Orders", data);
//       // dispatch(fetchOrdersSuccess(data.orders));
//     } catch (error) {
//       // dispatch(fetchOrdersFail(error));
//       // console.log("Orders err", error);
//     }
//   };
// };
