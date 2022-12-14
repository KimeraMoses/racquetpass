import {
  clearEnteredValues,
  createNewBusinessSuccess,
  editBusinessSuccess,
  setBusinessLoading,
} from "../Slices/businessSlice";
import { fetchShopDetails, phoneFormater } from "./shopActions";
import { toast } from "react-toastify";
import { axios, createBusinessRoute, editBusinessRoute, showError } from "lib";
import { saveUserInitials } from "../Slices/authSlice";

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
    password,
    navigate
  ) =>
  async (dispatch) => {
    const data = {
      first_name,
      last_name,
      phone: phoneFormater(phone),
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
      toast.success("Your account has been created successfully!");
      dispatch(setBusinessLoading(false));

      localStorage.setItem("_rpn_", true);
      if (res.status === 200) {
        navigate("/BusinessAccount/Thanks");
        dispatch(saveUserInitials({ email: email, pwd: password }));
        dispatch(clearEnteredValues());
      }
    } catch (error) {
      toast.error(showError(error));
      dispatch(setBusinessLoading(false));
    }
  };

export const editBusinessDetails =
  (
    Id,
    name,
    email,
    phone,
    estimated_delivery_time,
    labor_price,
    tax,
    country,
    allow_own_strings,
    address,
    is_tax_percentage
  ) =>
  async (dispatch) => {
    const data = {
      name,
      email,
      phone,
      estimated_delivery_time,
      labor_price,
      tax,
      country,
      allow_own_strings,
      address,
      is_tax_percentage,
    };
    dispatch(setBusinessLoading(true));
    try {
      const { url } = editBusinessRoute(Id);
      const res = await axios.post(url, data);
      dispatch(editBusinessSuccess(res?.data));
      if (res.status === 200) {
        dispatch(setBusinessLoading(false));
        dispatch(fetchShopDetails(Id));
        toast.success("Changes saved successfully");
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(showError(error));
      dispatch(setBusinessLoading(false));
    }
  };
