import {
  allShopsRoute,
  axios,
  createOrdersRoute,
  enabledShopsRoute,
  manageSessionRoute,
  sendCodeVerificationRoute,
  shopDetailsRoute,
  shopOrderRoute,
  shopOrdersRoute,
  subscriptionSessionRoute,
  verifyCodeRoute,
} from "lib/index";
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
  setShopLoading,
  getSessionLink,
  getAllShopOrders,
  getPaymentUrl,
  getShopOrder,
} from "../Slices/shopSlice";
import { toast } from "react-toastify";

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

//GET ALL SHOP ORDERS
export const fetchShopOrders = (id) => {
  return async (dispatch) => {
    dispatch(setShopLoading(true));
    if (id) {
      const { url } = shopOrdersRoute(id);
      try {
        const res = await axios.get(url);
        console.log(res);
        dispatch(getAllShopOrders(res.data.order));
      } catch (error) {
        console.log(error);
        // dispatch(fetchShopsFail(error));
      }
    }
  };
};

//GET ALL SHOP ORDERS
// export const fetchShopOrder = (id) => {
//   return async (dispatch) => {
//     dispatch(setShopLoading(true));
//     if (id) {
//       const { url } = shopOrderRoute(id);
//       try {
//         const res = await axios.get(url);
//         console.log("Order", res);
//         dispatch(getShopOrder(res.data.order));
//       } catch (error) {
//         console.log(error);
//         if (error.response.status === 404)
//           return toast.error("Order with scaned code not found!");
//         toast.error("Failed to load order details");
//         // dispatch(fetchShopsFail(error));
//       }
//     }
//   };
// };

//GET ALL SHOP ORDERS
export const getOrder = (id) => {
  return async (dispatch) => {
    dispatch(setShopLoading(true));
    if (id) {
      const { url } = shopOrderRoute(id);
      try {
        const res = await axios.get(url);
        console.log("Order", res);
        dispatch(getShopOrder(res.data.order));
      } catch (error) {
        console.log(error);
        if (error.response.status === 404)
          return toast.error("Order not found!");
        toast.error("Failed to load order details");
        // dispatch(fetchShopsFail(error));
      }
    }
  };
};

//GET ALL SHOP ORDERS
export const createOrder = (data) => {
  return async (dispatch) => {
    dispatch(setShopLoading(true));
    console.log("Order data", data);
    if (data) {
      const { url } = createOrdersRoute();
      try {
        const res = await axios.post(url, data);
        console.log(res);
        dispatch(getPaymentUrl(res.data.url));
        dispatch(setShopLoading(false));
        toast.success("Redirecting to stripe...");
        window.location.replace(res.data.url);
      } catch (error) {
        console.log(error);
        toast.error("Failed to generate link!");
        dispatch(setShopLoading(false));
        // dispatch(fetchShopsFail(error));
      }
    }
  };
};

//GET SESSION PAYMENT LINK
export const getStripeSessionLink = (id) => {
  return async (dispatch) => {
    const data = {
      shop_id: id,
    };
    dispatch(setShopLoading(true));
    console.log(data);
    if (id) {
      const { url } = subscriptionSessionRoute();
      try {
        const res = await axios.post(url, data);
        console.log("Session Link", res);
        dispatch(getSessionLink(res.data.url));
        dispatch(setShopLoading(false));
      } catch (error) {
        dispatch(setShopLoading(false));
        console.log("Session Link err", error);
        // dispatch(fetchShopsFail(error));
      }
    }
  };
};
//GET PAYMENT MANAGEMENT LINK
export const getStripeManagementSessionLink = (id) => {
  return async (dispatch) => {
    const data = {
      shop_id: id,
    };
    dispatch(setShopLoading(true));
    if (id) {
      const { url } = manageSessionRoute();
      try {
        const res = await axios.post(url, data);
        dispatch(getSessionLink(res.data.url));
        dispatch(setShopLoading(false));
      } catch (error) {
        dispatch(setShopLoading(false));
      }
    }
  };
};

//FETCH SHOP DETAILS
export const fetchShopDetails = (shopId) => {
  return async (dispatch) => {
    dispatch(fetchShopPending());
    const { url } = shopDetailsRoute(shopId);
    try {
      const res = await axios.get(url);
      dispatch(fetchShopSuccess(res.data?.shop));
      console.log(res?.data);
    } catch (error) {
      dispatch(fetchShopFail(error));
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

//SEND VERIFICATION CODE VERIFICATION CODE

export const sendVerificationCode = (email) => {
  return async (dispatch) => {
    dispatch(setShopLoading(true));
    try {
      const { url } = sendCodeVerificationRoute();
      const res = await axios.post(url, { email });
      console.log("code sent", res);
      toast.success("Verification code sent to your email");
      dispatch(setShopLoading(false));
    } catch (error) {
      dispatch(setShopLoading(false));
      console.log("Code verify", error);
      toast.error("Failed to generate verification code!");
    }
  };
};

// VERIFY USER CODE
export const codeVerification = (otp, email) => {
  return async (dispatch) => {
    dispatch(setShopLoading(true));
    try {
      const { url } = verifyCodeRoute();
      const res = await axios.post(url, { otp, email });
      console.log("Code verify", res);
      toast.success("Email verified Successfuly");
      dispatch(setShopLoading(false));
      if (res.status === 200) {
        localStorage.setItem("_rpe_", JSON.stringify({ e: email, isV: true }));
      }
    } catch (error) {
      dispatch(setShopLoading(false));
      console.log("Code verify", error);
      toast.error("Email verification failed!");
    }
  };
};
