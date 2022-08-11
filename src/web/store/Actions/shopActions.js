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
  shopSurveyRoute,
  showError,
  subscriptionSessionRoute,
  verifyCodeRoute,
} from "lib/index";
import {
  // fetchShopFail,
  // fetchShopPending,
  // fetchShopsFail,
  // fetchShopsPending,
  // fetchShopsSuccess,
  // fetchShopSuccess,
  // sendMessageFail,
  // sendMessagePending,
  // sendMessageSucess,
  setShopLoading,
  // getSessionLink,
  getAllShopOrders,
  // getPaymentUrl,
  getShopOrder,
  // getOnboardSessionLink,
  setShopFetching,
  getShop,
  getAllShops,
} from "../Slices/shopSlice";
import { toast } from "react-toastify";

//FETCH ALL ENABLED SHOP
export const fetchEnabledShops = () => {
  return async (dispatch) => {
    dispatch(setShopFetching(true));
    const { url } = enabledShopsRoute();
    try {
      const res = await axios.get(url);
      dispatch(getAllShops(res.data?.list_shops));
      dispatch(setShopFetching(false));
    } catch (error) {
      toast.error(showError(error));
      dispatch(setShopFetching(false));
    }
  };
};

//GET ALL SHOP ORDERS
export const fetchShopOrders = (id) => {
  return async (dispatch) => {
    if (id) {
      dispatch(setShopFetching(true));
      const { url } = shopOrdersRoute(id);
      try {
        const res = await axios.get(url);
        dispatch(getAllShopOrders(res.data.order));
        dispatch(setShopFetching(false));
      } catch (error) {
        toast.error(showError(error));
        dispatch(setShopFetching(false));
      }
    }
  };
};

//GET ALL SHOP ORDERS
export const getOrder = (id, navigate) => {
  return async (dispatch) => {
    const shopId = JSON.parse(
      localStorage.getItem("Racquet__CurrentUser")
    )?.shop;
    if (id) {
      dispatch(setShopFetching(true));
      const { url } = shopOrderRoute(id);
      try {
        const res = await axios.get(url);
        if (navigate && res.data.order?.delivery_shop?.id !== shopId) {
          if (navigate) navigate("/tasks/scan");
          return;
        }
        dispatch(getShopOrder(res.data.order));
        dispatch(setShopFetching(false));
      } catch (error) {
        dispatch(setShopFetching(false));
        if (error?.response?.status === 404) {
          if (navigate) navigate("/tasks/scan");
          return;
        }
        toast.error("Failed to load order details");
      }
    }
  };
};

//CANCEL ORDER
export const cancelOrder = (orderId, navigate) => {
  return async () => {
    const data = {
      order_id: orderId,
      action: "cancel",
    };
    if (orderId) {
      const { url } = completeOrderRoute();
      try {
        await axios.post(url, data);
        toast.success("Order cancelled Successfuly");
        navigate("/order");
      } catch (error) {
        toast.error("Failed to cancel order!");
      }
    }
  };
};

//CREATE ORDER
export const createOrder = (data, setCookie) => {
  return async (dispatch) => {
    if (data) {
      const { url } = createOrdersRoute();
      dispatch(setShopLoading(true));
      try {
        const res = await axios.post(url, data);
        setCookie("_rpo_", JSON.stringify(data), { path: "/" });
        dispatch(setShopLoading(false));
        toast.success("Redirecting to stripe...");
        window.location.replace(res.data.url);
      } catch (error) {
        toast.error("Failed to generate link!");
        dispatch(setShopLoading(false));
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
  return async () => {
    const data = {
      shop_id: id,
    };
    if (id) {
      const { url } = subscriptionSessionRoute();
      try {
        const res = await axios.post(url, data);
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
  return async () => {
    const data = {
      shop_id: id,
    };
    if (id) {
      const { url } = onboardSessionRoute();
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

//GET PAYMENT MANAGEMENT LINK
export const getStripeManagementSessionLink = (id) => {
  return async () => {
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
    if (shopId) {
      dispatch(setShopFetching(true));
      const { url } = shopDetailsRoute(shopId);
      try {
        const res = await axios.get(url);
        dispatch(getShop(res.data?.shop));
        dispatch(setShopFetching(false));
      } catch (error) {
        dispatch(setShopFetching(false));
        toast.error(showError(error));
      }
    }
  };
};

//SEND ORDER SERVEY
export const sendSurveyResponse = (data, setShow, setCookie) => {
  return async () => {
    if (data) {
      const { url } = shopSurveyRoute();
      try {
        await axios.post(url, data);
        setCookie("_rpr_", data.email, {
          path: "/",
        });
        toast.success("Your response is submitted successfully");
        setShow(false);
      } catch (error) {
        toast.error(showError(error));
      }
    }
  };
};

//DON'T SEE SHOP MESSAGE
export const sendShopInquiry =
  (shop_name, city, state, phone, search) => async (dispatch) => {
    dispatch(setShopLoading(true));
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
      await response.json();
      dispatch(setShopLoading(false));
    } catch (error) {
      dispatch(setShopLoading(false));
    }
  };

//SEND VERIFICATION CODE VERIFICATION CODE

export const sendVerificationCode = (phone, setStep) => {
  return async () => {
    try {
      const { url } = sendCodeVerificationRoute();
      await axios.post(url, { phone: phoneFormater(phone) });
      toast.success("Verification code sent to your phone");
      if (setStep) setStep(5);
    } catch (error) {
      toast.error("Failed to generate verification code!");
    }
  };
};

// VERIFY USER CODE
export const codeVerification = (otp, phone, setStep) => {
  return async () => {
    try {
      const { url } = verifyCodeRoute();
      const res = await axios.post(url, { otp, phone: phoneFormater(phone) });
      toast.success("Phone verified Successfuly");
      if (res.status === 200) {
        localStorage.setItem("_rpe_", JSON.stringify({ e: phone, isV: true }));
      }
      if (setStep) setStep(6);
    } catch (error) {
      toast.error("Phone verification failed!");
    }
  };
};

//FORMATING PHONE NUMBER TO MATCH
export const phoneFormater = (phone) => {
  const code = process.env.REACT_APP_COUNTRY_CODE;
  // const hasZero = phone?.charAt(0) === "0" ? true : false;
  return (
    code +
    phone.replace("-", "").replace("(", "").replace(")", "").replace(" ", "")
    // .substring(hasZero ? 1 : 0)
  );
};
