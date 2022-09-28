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
  setIsHybrid,
  setRacquetsLoading,
  setStringBrand,
  setStringCross,
  setStringMain,
} from "../Slices/racquetSlice";
import { toast } from "react-toastify";
import { createOrder } from "./shopActions";
import { setNormalFlow } from "../Slices/shopSlice";

export const createNewRacquet = (data, orderValues) => async (dispatch) => {
  dispatch(setRacquetsLoading(true));
  try {
    const { url } = newRaquetsRoute();
    const res = await axios.post(url, data);
    if (res?.status === 200) {
      await dispatch(
        createOrder({ ...orderValues, racquet_id: res?.data?.racquet?.id })
      );
    }
    dispatch(setRacquetsLoading(false));
  } catch (error) {
    toast.error(showError(error));
    dispatch(setRacquetsLoading(false));
  }
};

//EDIT RACQUET DETAILS
export const editRacquetDetails =
  (data, rac_id, orderValues) => async (dispatch) => {
    dispatch(setRacquetsLoading(true));
    try {
      const { url } = editRaquetsRoute(rac_id);
      const res = await axios.patch(url, data);
      if (res?.status === 200) {
        await dispatch(
          createOrder({ ...orderValues, racquet_id: res.data?.racquet?.id })
        );
      }
      // dispatch(fetchRacquetDetails(res.data?.racquet?.id, "", false));
      dispatch(setRacquetsLoading(false));
    } catch (error) {
      toast.error(showError(error));
      dispatch(setRacquetsLoading(false));
    }
  };

export const fetchAllStrings = (shop_id) => {
  return async (dispatch) => {
    if (shop_id) {
      const { url } = getStringsRoute(shop_id);
      dispatch(setRacquetsLoading(true));
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

export const fetchRacquetDetails = (racquet_id, navigate, isQr) => {
  return async (dispatch) => {
    if (racquet_id) {
      dispatch(setRacquetsLoading(true));
      const { url } = getRaquetRoute(racquet_id);
      try {
        const res = await axios.get(url);
        localStorage.removeItem("_qrc_");
        if (res.status === 200) {
          if (res.data?.order !== undefined) {
            switch (res.data?.order?.status) {
              case "Pending":
                toast.info("Your order is pending payment");
                navigate(
                  `/order-flow/review?status=pending&orderId=${res.data?.order?.id}`
                );
                break;
              case "Processing":
                toast.info("Your order is being processed");
                navigate(`/order/${res.data?.order?.id}?status=processing`);
                break;
              default:
                dispatch(getRacquetSuccess(res.data?.racquet));
                navigate && navigate("/order-flow/scanned");
                isQr &&
                  toast.success(
                    "Successfully scanned a racquet! Press “Choose this Racquet” to proceed."
                  );
                break;
            }
          } else {
            dispatch(getRacquetSuccess(res.data?.racquet));
            // navigate && navigate("/order");
            isQr &&
              toast.success(
                "Successfully scanned a racquet! Press “Start your order now” to proceed."
              );
          }
        }
        dispatch(setRacquetsLoading(false));
        const isHybrid =
          res.data?.racquet?.crosses?.string_id?.id ===
          res.data?.racquet?.mains?.string_id?.id
            ? false
            : true;

        const stringDetailsMains = {
          shop: res.data?.racquet?.mains?.string_id?.shop,
          string_id: res.data?.racquet?.mains?.string_id?.id,
          name: res.data?.racquet?.mains?.string_id?.name,
          in_stock: res.data?.racquet?.mains?.string_id?.in_stock,
          price: res.data?.racquet?.mains?.string_id?.price?.toFixed(2),
          tension: res.data?.racquet?.mains?.tension.toFixed(2),
          hybrid_type: res.data?.racquet?.mains?.string_id?.hybrid_type,
          brand: res.data?.racquet?.mains?.string_id?.brand,
          model: res.data?.racquet?.mains?.string_id?.model,
        };
        const stringDetailsCrosses = {
          shop: res.data?.racquet?.crosses?.string_id?.shop,
          string_id: res.data?.racquet?.crosses?.string_id?.id,
          name: res.data?.racquet?.crosses?.string_id?.name,
          in_stock: res.data?.racquet?.crosses?.string_id?.in_stock,
          price: res.data?.racquet?.crosses?.string_id?.price?.toFixed(2),
          tension: res.data?.racquet?.crosses?.tension.toFixed(2),
          hybrid_type: res.data?.racquet?.crosses?.string_id?.hybrid_type,
          brand: res.data?.racquet?.crosses?.string_id?.brand,
          model: res.data?.racquet?.crosses?.string_id?.model,
        };
        if (isHybrid) {
          dispatch(setIsHybrid(true));
          dispatch(setStringCross(stringDetailsCrosses));
          dispatch(setStringMain(stringDetailsMains));
        } else {
          dispatch(setIsHybrid(false));
          dispatch(setStringBrand(stringDetailsMains));
        }
        dispatch(getRacquetSuccess(res.data?.racquet));
        isQr && dispatch(setNormalFlow(false));
      } catch (error) {
        dispatch(setRacquetsLoading(false));
        if (error?.response?.status === 404) {
          localStorage.setItem("_qrc_", racquet_id);
          if (isQr && navigate) {
            navigate("/order-flow/scanned");
            return toast.success(
              "Successfully scanned a racquet! Press “Start your order now” to proceed."
            );
          }
          // // SET SCANNED STATE TO SKIP RESCANNING
          return toast.success(
            "Successfully scanned a racquet! Press next to proceed."
          );
        }
        toast.error("Failed to scan racquet!");
      }
    }
  };
};

export const createNewString =
  (name, brand, model, price, shop, hybrid_type, in_stock) =>
  async (dispatch) => {
    const data = {
      name,
      brand,
      model,
      price,
      shop,
      hybrid_type,
      in_stock,
    };
    dispatch(setRacquetsLoading(true));
    try {
      const { url } = newStringsRoute();
      await axios.post(url, data);
      toast.success("String created successfully");
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
    // type,
    brand,
    model,
    price,
    // size,
    // tension,
    hybrid_type,
    in_stock
  ) =>
  async (dispatch) => {
    const data = {
      name,
      // type,
      brand,
      model,
      price,
      hybrid_type,
      in_stock,
      // size,
      // tension,
    };
    if (string_id) {
      dispatch(setRacquetsLoading(true));
      try {
        const { url } = editStringsRoute(string_id);
        await axios.patch(url, data);
        toast.success("Changes to string saved successfully");
        dispatch(setRacquetsLoading(false));
      } catch (error) {
        dispatch(setRacquetsLoading(false));
        toast.error(showError(error));
      }
    }
  };

export const deleteString = (string_id) => {
  return async (dispatch) => {
    if (string_id) {
      dispatch(setRacquetsLoading(true));
      const { url } = editStringsRoute(string_id);
      try {
        await axios.delete(url);
        dispatch(setRacquetsLoading(false));
        toast.success("String deleted successfully");
      } catch (error) {
        dispatch(setRacquetsLoading(false));
        toast.error(showError(error));
      }
    }
  };
};
