import {
  createNewBusinessSuccess,
  editBusinessSuccess,
  setBusinessLoading,
} from "../Slices/businessSlice";
import { fetchShopDetails } from "./shopActions";
import { toast } from "react-toastify";
import { axios, createBusinessRoute, editBusinessRoute, showError } from "lib";

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
    const data = {
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
    };
    dispatch(setBusinessLoading(true));
    try {
      const { url } = createBusinessRoute();
      const res = await axios.post(url, data);
      dispatch(createNewBusinessSuccess(res.data));
      toast.success(
        "Your Account is created successfuly, Please go to settings to complete profile"
      );
      dispatch(setBusinessLoading(false));
    } catch (error) {
      toast.error(showError(error));
      dispatch(setBusinessLoading(false));
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
    const data = {
      name,
      email,
      phone,
      etimated_delivery_time,
      labor_price,
      country,
      allow_own_strings,
      address,
    };
    dispatch(setBusinessLoading(true));
    try {
      const { url } = editBusinessRoute(Id);
      const res = await axios.post(url, data);
      dispatch(editBusinessSuccess(res?.data));
      if (res.status === 200) {
        dispatch(setBusinessLoading(false));
        dispatch(fetchShopDetails(authToken, Id));
        toast.success("Changes saved successfuly");
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(showError(error));
      dispatch(setBusinessLoading(false));
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
