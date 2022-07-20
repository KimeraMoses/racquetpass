import {
  axios,
  editStringsRoute,
  getRaquetRoute,
  getRaquetsRoute,
  getStringsRoute,
  newStringsRoute,
  showError,
} from "lib/index";
import {
  getRacquetStrings,
  getRacquetSuccess,
  setRacquetsLoading,
} from "../Slices/racquetSlice";
import { toast } from "react-toastify";

export const fetchAllRacquets = () => {
  return async (dispatch) => {
    // dispatch(setRacquetsLoading(true));
    const { url } = getRaquetsRoute();
    try {
      const res = await axios.get(url);
      console.log("rac data", res);
      //   dispatch(getRacquetSuccess(res));
    } catch (error) {
      console.log("rac err", error);
      //   dispatch(setRacquetsLoading(false));
    }
  };
};

export const fetchAllStrings = (shop_id) => {
  return async (dispatch) => {
    dispatch(setRacquetsLoading(true));
    const { url } = getStringsRoute(shop_id);
    if (shop_id) {
      try {
        const res = await axios.get(url);
        console.log("strings data", res);
        dispatch(getRacquetStrings(res.data?.inventory));
        dispatch(setRacquetsLoading(false));
      } catch (error) {
        dispatch(setRacquetsLoading(false));
        console.log("strings err", error);
      }
    }
  };
};

export const fetchRacquetDetails = (racquet_id) => {
  return async (dispatch) => {
    dispatch(setRacquetsLoading(true));
    const { url } = getRaquetRoute(racquet_id);
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        dispatch(getRacquetSuccess(res.data?.racquet));
      } else if (res.status === 404) {
        return toast.error("Racquet not found!");
      }
      dispatch(setRacquetsLoading(false));
      console.log("rac data", res);
    } catch (error) {
      dispatch(setRacquetsLoading(false));
      toast.error("Failed to scan racquet!");
      console.log("rac err", error);
    }
  };
};

export const createNewString =
  (type, brand, model, size, price, shop, hybrid_type, in_stock, tension) =>
  async (dispatch) => {
    const data = {
      type,
      brand,
      model,
      size,
      price,
      shop,
      hybrid_type,
      in_stock,
      tension,
    };
    console.log(data);
    dispatch(setRacquetsLoading(true));
    try {
      const { url } = newStringsRoute();
      const res = await axios.post(url, data);
      // dispatch(createNewBusinessSuccess(res.data));
      // toast.success(
      //   "Your Account is created successfuly, Please go to settings to complete profile"
      // );
      console.log(res);
      dispatch(setRacquetsLoading(false));
    } catch (error) {
      // toast.error(showError(error));
      console.log(error);
      dispatch(setRacquetsLoading(false));
    }
  };

export const editNewString =
  (string_id, brand, model, price, hybrid_type, in_stock) =>
  async (dispatch) => {
    const data = {
      brand,
      model,
      price,
      hybrid_type,
      in_stock,
    };
    console.log(data);
    dispatch(setRacquetsLoading(true));
    if (string_id) {
      try {
        const { url } = editStringsRoute(string_id);
        const res = await axios.patch(url, data);
        // dispatch(createNewBusinessSuccess(res.data));
        toast.success("Changes saved Successfuly");
        console.log(res);
        dispatch(setRacquetsLoading(false));
      } catch (error) {
        dispatch(setRacquetsLoading(false));
        toast.error(showError(error));
        // console.log(error);
      }
    }
  };

export const deleteString = (string_id) => {
  return async (dispatch) => {
    console.log(string_id);
    dispatch(setRacquetsLoading(true));
    if (string_id) {
      const { url } = editStringsRoute(string_id);
      try {
        const res = await axios.delete(url);
        console.log("strings data", res);
        // dispatch(getRacquetStrings(res.data?.inventory));
        dispatch(setRacquetsLoading(false));
        toast.success("String deleted Successfuly");
      } catch (error) {
        dispatch(setRacquetsLoading(false));
        console.log("strings err", error);
        toast.error(showError(error));
      }
    }
  };
};
