import {
  axios,
  editRaquetsRoute,
  editStringsRoute,
  getRaquetRoute,
  getStringsRoute,
  newRaquetsRoute,
  newStringsRoute,
  showError,
} from "lib/index";
import {
  getRacquetStrings,
  getRacquetSuccess,
  setRacquetsLoading,
} from "../Slices/racquetSlice";
import { toast } from "react-toastify";

export const createNewRacquet = (data, setStep, change) => async (dispatch) => {
  dispatch(setRacquetsLoading(true));
  try {
    const { url } = newRaquetsRoute();
    const res = await axios.post(url, data);
    console.log(res);
    dispatch(getRacquetSuccess(res.data?.racquet));
    dispatch(setRacquetsLoading(false));
    toast.success(
      "Your raquet is created successfuly, You can now proceed with your order "
    );
    if (setStep) setStep(4);
    if (change) change("racquetId", res?.data.racquet?.id);
  } catch (error) {
    console.log(error);
    toast.error(showError(error));
    dispatch(setRacquetsLoading(false));
  }
};

//EDIT RACQUET DETAILS
export const editRacquetDetails =
  (data, rac_id, setStep) => async (dispatch) => {
    dispatch(setRacquetsLoading(true));
    try {
      const { url } = editRaquetsRoute(rac_id);
      const res = await axios.patch(url, data);
      dispatch(fetchRacquetDetails(res.data?.racquet?.id, false));
      dispatch(setRacquetsLoading(false));
      toast.success(
        "Changes to your raquet are saved successfuly, You can now proceed with your order "
      );
      if (setStep) setStep(4);
    } catch (error) {
      toast.error(showError(error));
      dispatch(setRacquetsLoading(false));
    }
  };

export const fetchAllStrings = (shop_id) => {
  return async (dispatch) => {
    dispatch(setRacquetsLoading(true));
    const { url } = getStringsRoute(shop_id);
    if (shop_id) {
      try {
        const res = await axios.get(url);
        dispatch(getRacquetStrings(res.data?.inventory));
        dispatch(setRacquetsLoading(false));
      } catch (error) {
        dispatch(setRacquetsLoading(false));
      }
    }
  };
};

export const fetchRacquetDetails = (racquet_id, showSuccess, isQr) => {
  return async (dispatch) => {
    dispatch(setRacquetsLoading(true));
    const { url } = getRaquetRoute(racquet_id, isQr ? true : false);
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        dispatch(getRacquetSuccess(res.data?.racquet));
        if (showSuccess)
          toast.success("Racquet found, You can now continue with your order");
      }
      dispatch(setRacquetsLoading(false));
    } catch (error) {
      dispatch(setRacquetsLoading(false));
      if (error?.response?.status === 404)
        return toast.error(
          "Racquet not found, Please continue with the process to create your own racquet!"
        );
      toast.error("Failed to scan racquet!");
    }
  };
};

export const fetchScannedRacquetDetails = (racquet_id) => {
  return async (dispatch) => {
    dispatch(setRacquetsLoading(true));
    const { url } = getRaquetRoute(racquet_id, false);
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        dispatch(getRacquetSuccess(res.data?.racquet));
        toast.success("Racquet found, You can now continue with your order");

        // SET SCANNED STATE TO SKIP RESCANNING
        localStorage.setItem("_rpr_", true);
      }
      dispatch(setRacquetsLoading(false));
    } catch (error) {
      dispatch(setRacquetsLoading(false));
      if (error?.response?.status === 404)
        return toast.warn(
          "Racquet not found, Please continue with the process to create your own racquet!"
        );
      toast.error("Failed to scan racquet!");
    }
  };
};

export const createNewString =
  (
    name,
    type,
    brand,
    model,
    size,
    price,
    shop,
    hybrid_type,
    in_stock,
    tension
  ) =>
  async (dispatch) => {
    const data = {
      name,
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
    dispatch(setRacquetsLoading(true));
    try {
      const { url } = newStringsRoute();
      await axios.post(url, data);
      toast.success("String created successfuly");
      dispatch(setRacquetsLoading(false));
    } catch (error) {
      toast.error(showError(error));
      dispatch(setRacquetsLoading(false));
    }
  };

export const editNewString =
  (
    string_id,
    name,
    type,
    brand,
    model,
    price,
    size,
    tension,
    hybrid_type,
    in_stock
  ) =>
  async (dispatch) => {
    const data = {
      name,
      type,
      brand,
      model,
      price,
      hybrid_type,
      in_stock,
      size,
      tension,
    };
    dispatch(setRacquetsLoading(true));
    if (string_id) {
      try {
        const { url } = editStringsRoute(string_id);
        await axios.patch(url, data);
        toast.success("Changes to string saved Successfuly");
        dispatch(setRacquetsLoading(false));
      } catch (error) {
        dispatch(setRacquetsLoading(false));
        toast.error(showError(error));
      }
    }
  };

export const deleteString = (string_id) => {
  return async (dispatch) => {
    dispatch(setRacquetsLoading(true));
    if (string_id) {
      const { url } = editStringsRoute(string_id);
      try {
        await axios.delete(url);
        dispatch(setRacquetsLoading(false));
        toast.success("String deleted Successfuly");
      } catch (error) {
        dispatch(setRacquetsLoading(false));
        toast.error(showError(error));
      }
    }
  };
};
