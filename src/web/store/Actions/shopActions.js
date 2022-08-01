import {
  axios,
  completeOrderRoute,
  createOrdersRoute,
  enabledShopsRoute,
  manageSessionRoute,
  onboardSessionRoute,
  orderPaymentRoute,
  sendCodeVerificationRoute,
  shopDetailsRoute,
  shopOrderRoute,
  shopOrdersRoute,
  showError,
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
  getOnboardSessionLink,
} from "../Slices/shopSlice";
import { toast } from "react-toastify";

//FETCH ALL ENABLED SHOP
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
        dispatch(getAllShopOrders(res.data.order));
        dispatch(setShopLoading(false));
      } catch (error) {
        dispatch(setShopLoading(false));
      }
    }
  };
};

//GET ALL SHOP ORDERS
export const getOrder = (id, navigate) => {
  return async (dispatch) => {
    dispatch(setShopLoading(true));
    const shopId = JSON.parse(
      localStorage.getItem("Racquet__CurrentUser")
    )?.shop;
    if (id) {
      const { url } = shopOrderRoute(id);
      try {
        const res = await axios.get(url);
        if (navigate && res.data.order?.delivery_shop?.id !== shopId) {
          navigate("/tasks/scan");
          return toast.error("Not authorised to view this order");
        }
        dispatch(getShopOrder(res.data.order));
      } catch (error) {
        if (error?.response?.status === 404) {
          if (navigate && shopId) navigate("/");
          return toast.error("Order not found!");
        }
        toast.error("Failed to load order details");
      }
    }
  };
};

//COMPLETE ORDER
export const completeOrder = (data) => {
  return async () => {
    if (data) {
      const { url } = completeOrderRoute();
      try {
        await axios.post(url, data);
        toast.success("Order Completed Successfuly");
      } catch (error) {
        if (error?.response?.status === 400) {
          return toast.error("Pending order can not be completed!");
        }
        toast.error("Failed to complete order!");
      }
    }
  };
};

//CREATE ORDER
export const createOrder = (data) => {
  return async (dispatch) => {
    dispatch(setShopLoading(true));
    if (data) {
      const { url } = createOrdersRoute();
      try {
        const res = await axios.post(url, data);
        dispatch(getPaymentUrl(res.data.url));
        dispatch(setShopLoading(false));
        toast.success("Redirecting to stripe...");
        window.location.replace(res.data.url);
        // console.log(res.data);
      } catch (error) {
        toast.error("Failed to generate link!");
        dispatch(setShopLoading(false));
        // console.log(error);
      }
    }
  };
};

//GET STRIPE PAYMENT LINK
export const getStripePaymentLink = (id) => {
  return async () => {
    const data = {
      order_id: id,
    };
    if (id) {
      const { url } = orderPaymentRoute();
      try {
        const res = await axios.post(url, data);
        toast.success("Redirecting to stripe...");
        window.location.replace(res.data.url);
      } catch (error) {
        toast.error(
          `${showError(error)}, please contact admin to send you a payment link`
        );
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
    if (id) {
      const { url } = subscriptionSessionRoute();
      try {
        const res = await axios.post(url, data);
        dispatch(getSessionLink(res.data.url));
        toast.success("Redirecting to stripe...");
        window.location.replace(res.data.url);
      } catch (error) {
        toast.error(
          `${showError(
            error
          )}, please contact admin to set subscription for your shop`
        );
      }
    }
  };
};

//GET ONBOARDING SESSION PAYMENT LINK
export const getStripeOnBoardingLink = (id) => {
  return async (dispatch) => {
    const data = {
      shop_id: id,
    };
    if (id) {
      const { url } = onboardSessionRoute();
      try {
        const res = await axios.post(url, data);
        dispatch(getOnboardSessionLink(res.data.url));
        toast.success("Redirecting to stripe...");
        window.location.replace(res.data.url);
      } catch (error) {
        toast.error(showError(error));
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
    if (id) {
      const { url } = manageSessionRoute();
      try {
        const res = await axios.post(url, data);
        toast.success("Redirecting to stripe...");
        window.location.replace(res.data.url);
      } catch (error) {
        toast.error(showError(error));
      }
    }
  };
};

//FETCH SHOP DETAILS
export const fetchShopDetails = (shopId) => {
  return async (dispatch) => {
    dispatch(fetchShopPending());
    const { url } = shopDetailsRoute(shopId);
    if (shopId) {
      try {
        const res = await axios.get(url);
        dispatch(fetchShopSuccess(res.data?.shop));
        // console.log("shop", res?.data?.shop);
      } catch (error) {
        dispatch(fetchShopFail(error));
        // console.log(error);
      }
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

export const sendVerificationCode = (phone, setStep) => {
  return async (dispatch) => {
    dispatch(setShopLoading(true));
    // console.log("Phone", phoneFormater(phone));
    try {
      const { url } = sendCodeVerificationRoute();
      await axios.post(url, { phone: phoneFormater(phone) });
      // console.log("code sent", res);
      toast.success("Verification code sent to your phone");
      dispatch(setShopLoading(false));
      if (setStep) setStep(5);
    } catch (error) {
      dispatch(setShopLoading(false));
      // console.log("Code verify", error);
      toast.error("Failed to generate verification code!");
    }
  };
};

// VERIFY USER CODE
export const codeVerification = (otp, phone, setStep) => {
  return async (dispatch) => {
    dispatch(setShopLoading(true));
    try {
      const { url } = verifyCodeRoute();
      const res = await axios.post(url, { otp, phone: phoneFormater(phone) });
      toast.success("Phone verified Successfuly");
      dispatch(setShopLoading(false));
      if (res.status === 200) {
        localStorage.setItem("_rpe_", JSON.stringify({ e: phone, isV: true }));
      }
      if (setStep) setStep(6);
    } catch (error) {
      dispatch(setShopLoading(false));
      toast.error("Phone verification failed!");
    }
  };
};

//FORMATING PHONE NUMBER TO MATCH
export const phoneFormater = (phone) => {
  const code = process.env.REACT_APP_COUNTRY_CODE;
  const hasZero = phone?.charAt(0) === "0" ? true : false;
  return (
    code +
    phone
      .replace("-", "")
      .replace("(", "")
      .replace(")", "")
      .replace(" ", "")
      .substring(hasZero ? 1 : 0)
  );
};
