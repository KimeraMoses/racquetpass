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
    dispatch(getRacquetSuccess(res.data?.racquet));
    dispatch(setRacquetsLoading(false));
    // toast.success(
    //   "Your raquet is created successfuly, You can now proceed with your order "
    // );
    if (setStep) setStep(4);
    if (change) change("racquetId", res?.data.racquet?.id);
  } catch (error) {
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
      dispatch(fetchRacquetDetails(res.data?.racquet?.id, "", false));
      dispatch(setRacquetsLoading(false));
      // toast.success(
      //   "Changes to your raquet are saved successfuly, You can now proceed with your order "
      // );
      if (setStep) setStep(4);
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
        if (res.status === 200) {
          if (res.data?.order !== undefined) {
            switch (res.data?.order?.status) {
              case "Pending":
                toast.info("Your order is pending payment");
                navigate(`/order/${res.data?.order?.id}?status=pending`);
                break;
              case "Processing":
                toast.info("Your order is being processed");
                navigate(`/order/${res.data?.order?.id}?status=processing`);
                break;
              default:
                dispatch(getRacquetSuccess(res.data?.racquet));
                navigate && navigate("/order");
                isQr &&
                  toast.success(
                    "Racquet found, You can now continue with your order"
                  );
                break;
            }
          } else {
            dispatch(getRacquetSuccess(res.data?.racquet));
            navigate && navigate("/order");
            isQr &&
              toast.success(
                "Racquet found, You can now continue with your order"
              );
          }
        }
        dispatch(setRacquetsLoading(false));
        isQr && localStorage.setItem("_rpr_", true);
      } catch (error) {
        dispatch(setRacquetsLoading(false));
        if (error?.response?.status === 404) {
          isQr && localStorage.setItem("_qrc_", racquet_id);
          navigate && navigate("/order");
          // SET SCANNED STATE TO SKIP RESCANNING
          isQr && localStorage.setItem("_rpr_", true);
          return toast.success(
            "Successfully scanned a racquet! Press next to proceed."
          );
        }
        toast.error("Failed to scan racquet!");
      }
    }
  };
};

// FETCH RACQUET USING UUID
// export const fetchScannedRacquetDetails = (racquet_id, type) => {
//   return async (dispatch) => {
//     if (racquet_id) {
//       dispatch(setRacquetsLoading(true));
//       const { url } = getRaquetRoute(racquet_id);
//       try {
//         const res = await axios.get(url);
//         console.log(res);
//         if (res.status === 200) {
//           dispatch(getRacquetSuccess(res.data?.racquet));
//           toast.success("Racquet found, You can now continue with your order");
//         }
//         dispatch(setRacquetsLoading(false));
//         // SET SCANNED STATE TO SKIP RESCANNING
//         localStorage.setItem("_rpr_", true);
//       } catch (error) {
//         console.log(error);
//         dispatch(setRacquetsLoading(false));
//         // SET SCANNED STATE TO SKIP RESCANNING
//         localStorage.setItem("_rpr_", true);
//         localStorage.setItem("_qrc_", racquet_id);
//         if (error?.response?.status === 404)
//           return toast.warn(
//             "Racquet not found, Please continue with the process to create your own racquet!"
//           );
//         toast.error("Failed to load racquet details!");
//       }
//     }
//   };
// };

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
