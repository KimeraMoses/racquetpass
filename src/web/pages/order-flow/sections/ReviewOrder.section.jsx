// Custom Components
import {
  Heading,
  Description,
  HeadingButton,
  SummaryCard,
  PaymentButton,
  SubHeading,
} from "web/components";
import { SearchCard } from "web/components/index";
import { useNavigate, useLocation } from "react-router-dom";

// Styles
import "./ReviewOrder.styles.scss";
import { BackButton } from "web/components/Buttons/BackButton.component";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import {
  cancelOrder,
  fetchShopDetails,
  getOrder,
  getOrderTax,
  getStripePaymentLink,
} from "web/store/Actions/shopActions";
import {
  createNewRacquet,
  editRacquetDetails,
} from "web/store/Actions/racquetActions";
import { useDispatch } from "react-redux";
import { withNamespaces } from "react-i18next";
import {
  getOrderContact,
  setBackFromPreview,
  setReviewArrowSource,
} from "web/store/Slices/shopSlice";
import { reduxForm } from "redux-form";
import {
  getRacquetSuccess,
  setIsHybrid,
  setStringBrand,
  setStringCross,
  setStringMain,
} from "web/store/Slices/racquetSlice";
import { useState } from "react";

function ReviewOrder({ t }) {
  const [taxing, setTaxing] = useState(false);
  const [tax, setTax] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const { isLoading, isFetching: isGettingShop } = useSelector(
    (state) => state.shop
  );
  const { isLoading: isFetching } = useSelector((state) => state.racquet);
  const userContacts = useSelector((state) => state?.shop?.contacts);
  const racquet = useSelector((state) => state.racquet?.racquet);
  const hasRacquet = !!useSelector((state) => state.racquet?.racquet?.id);
  const shop = useSelector((state) => state.shop?.shop);
  const order = useSelector((state) => state?.shop?.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const OrderStatus = query.get("status");
  const orderId = query.get("orderId");

  const orderLocal = JSON.parse(localStorage.getItem("_rapo_"));

  useEffect(() => {
    if (
      !hasRacquet &&
      orderLocal?.racquet &&
      Object.keys(orderLocal?.racquet).length !== 0
    ) {
      dispatch(getRacquetSuccess(orderLocal?.racquet));
    }
    if (Object.keys(shop).length === 0) {
      dispatch(fetchShopDetails(orderLocal?.shop));
    }

    if (
      Object.keys(userContacts)?.length === 0 &&
      orderLocal?.contact &&
      Object.keys(orderLocal?.contact).length !== 0
    ) {
      const contactValues = {
        "first-name": orderLocal?.contact["first-name"],
        "last-name": orderLocal?.contact["last-name"],
        "phone-number": orderLocal?.contact["phone-number"],
      };

      dispatch(getOrderContact(contactValues));
    }
    dispatch(setReviewArrowSource(false));
  }, []);

  const isHybrid =
    racquet?.mains?.string_id?.id === racquet?.crosses?.string_id?.id
      ? false
      : true;

  let mainsPrice = racquet && parseInt(racquet?.mains?.string_id?.price);
  let crossesPrice = racquet && parseInt(racquet?.crosses?.string_id?.price);
  if (racquet && racquet?.mains?.string_id?.hybrid_type === "Reel") {
    mainsPrice = racquet && parseInt(racquet?.mains?.string_id?.price) / 2;
  }
  if (racquet && racquet?.crosses?.string_id?.hybrid_type === "Reel") {
    crossesPrice = racquet && parseInt(racquet?.crosses?.string_id?.price) / 2;
  }

  const items = [
    {
      heading: "String",
      isOutOfStock: !racquet?.mains?.string_id?.in_stock,
      description: `${racquet?.mains?.string_id?.name} @ ${racquet?.mains?.tension} lbs`,
      price: `$${mainsPrice?.toFixed(2)}`,
      isToShop: racquet?.mains?.string_id?.shop !== shop?.id,
      show: !isHybrid,
    },
    {
      heading: "Mains",
      isOutOfStock: !racquet?.mains?.string_id?.in_stock,
      description: `${racquet?.mains?.string_id?.name}  @ ${racquet?.mains?.tension} lbs`,
      price: `$${mainsPrice?.toFixed(2)}`,
      isToShop: racquet?.mains?.string_id?.shop !== shop?.id,
      show: isHybrid,
    },
    {
      heading: "Crosses",
      isOutOfStock: !racquet?.crosses?.string_id?.in_stock,
      description: `${racquet?.crosses?.string_id?.name} @ ${racquet?.crosses?.tension} lbs`,
      price: `$${crossesPrice?.toFixed(2)}`,
      isToShop: racquet?.crosses?.string_id?.shop !== shop?.id,
      show: isHybrid,
    },
    {
      description: "Labor",
      price: `$${shop && shop?.labor_price?.toFixed(2)}`,
      show: true,
    },
    {
      description: "Tax",
      // price: `${shop && shop?.is_tax_percentage ? "" : "$"}${
      //   shop && shop?.tax?.toFixed(2)
      // }${shop && shop?.is_tax_percentage ? "%" : ""}`,
      price: `${taxing ? "Calculating..." : `$${tax?.toFixed(2)}`}`,
      show: true,
    },
  ];

  const hasError =
    racquet?.mains?.string_id?.shop !== shop?.id ||
    racquet?.crosses?.string_id?.shop !== shop?.id;

  let TotalPrice = shop?.labor_price;
  if (isHybrid) {
    TotalPrice += mainsPrice + crossesPrice;
  } else {
    TotalPrice += mainsPrice;
  }
  // let newtax = shop?.tax;
  // if (shop?.is_tax_percentage) {
  //   newtax = (newtax * TotalPrice) / 100.0;
  // }
  // TotalPrice += newtax;
  const finalAmount = TotalPrice + tax;

  const summary = {
    items,
    TotalPrice: finalAmount?.toFixed(2),
    mainsPrice,
    crossesPrice,
  };
  const racQr = localStorage.getItem("_qrc_");
  const isNewRac = !!racQr;

  const onSubmitHandler = async () => {
    setGenerating(true);
    let mainObj;
    let crossObj;
    if (isHybrid) {
      mainObj = {
        string_id: racquet?.mains?.string_id?.string_id,
        tension: racquet?.mains?.tension,
      };
      crossObj = {
        string_id: racquet?.crosses?.string_id?.string_id,
        tension: racquet?.crosses?.tension,
      };
    } else {
      mainObj = {
        string_id: racquet?.mains?.string_id?.string_id,
        tension: racquet?.mains?.tension,
      };
      crossObj = {
        string_id: racquet?.mains?.string_id?.string_id,
        tension: racquet?.mains?.tension,
      };
    }

    const racquetData = {
      qr_code: isNewRac ? racQr : racquet?.qr_code,
      brand: racquet?.brand,
      model: racquet?.model,
      image_url: racquet?.image_url ? racquet?.image_url : "",
      mains: mainObj,
      crosses: crossObj,
      sport: racquet?.sport ? racquet?.sport : "Tennis",
    };
    const data = {
      shop_id: shop?.id,
      first_name: userContacts["first-name"],
      last_name: userContacts["last-name"],
      phone_number: userContacts["phone-number"],
    };
    try {
      await dispatch(
        isNewRac
          ? createNewRacquet(racquetData, data)
          : editRacquetDetails(racquetData, racquet?.id, data)
      );
      setGenerating(false);
    } catch (e) {
      setGenerating(false);
    }
  };

  const getOrderTaxValue = async () => {
    if (shop) {
      const data = {
        shop_id: shop?.id,
        amount: TotalPrice,
      };
      setTaxing(true);
      await dispatch(getOrderTax(data, setTax));
      setTaxing(false);
    }
  };
  useEffect(() => {
    getOrderTaxValue();
  }, [TotalPrice, shop]);

  const handlePayment = async () => {
    setGenerating(true);
    await dispatch(getStripePaymentLink(orderId));
    setGenerating(false);
  };

  const cancelOrderHanadler = async () => {
    setIsCancelling(true);
    await dispatch(cancelOrder(orderId, navigate));
    setIsCancelling(false);
  };

  useEffect(() => {
    if (orderId && OrderStatus === "pending") {
      dispatch(getOrder(orderId, "", "id"));
    }
  }, [orderId, OrderStatus]);

  useEffect(() => {
    if (order && orderId && OrderStatus === "pending") {
      const contactValues = {
        "first-name": order?.delivery_address?.first_name,
        "last-name": order?.delivery_address?.last_name,
        "phone-number": order?.delivery_address?.phone_number,
      };

      if (OrderStatus === "pending") {
        dispatch(getRacquetSuccess(order?.racquet));
        dispatch(fetchShopDetails(order?.delivery_shop?.id));
        dispatch(getOrderContact(contactValues));
        const isHybrid =
          order?.racquet?.crosses?.string_id?.id ===
          order?.racquet?.mains?.string_id?.id
            ? false
            : true;

        const stringDetailsMains = {
          shop: order?.racquet?.mains?.string_id?.shop,
          string_id: order?.racquet?.mains?.string_id?.id,
          name: order?.racquet?.mains?.string_id?.name,
          in_stock: order?.racquet?.mains?.string_id?.in_stock,
          price: order?.racquet?.mains?.string_id?.price?.toFixed(2),
          tension: order?.racquet?.mains?.tension.toFixed(2),
          hybrid_type: order?.racquet?.mains?.string_id?.hybrid_type,
          brand: order?.racquet?.mains?.string_id?.brand,
          model: order?.racquet?.mains?.string_id?.model,
        };
        const stringDetailsCrosses = {
          shop: order?.racquet?.crosses?.string_id?.shop,
          string_id: order?.racquet?.crosses?.string_id?.id,
          name: order?.racquet?.crosses?.string_id?.name,
          in_stock: order?.racquet?.crosses?.string_id?.in_stock,
          price: order?.racquet?.crosses?.string_id?.price?.toFixed(2),
          tension: order?.racquet?.crosses?.tension.toFixed(2),
          hybrid_type: order?.racquet?.crosses?.string_id?.hybrid_type,
          brand: order?.racquet?.crosses?.string_id?.brand,
          model: order?.racquet?.crosses?.string_id?.model,
        };
        if (isHybrid) {
          dispatch(setIsHybrid(true));
          dispatch(setStringCross(stringDetailsCrosses));
          dispatch(setStringMain(stringDetailsMains));
        } else {
          dispatch(setIsHybrid(false));
          dispatch(setStringBrand(stringDetailsMains));
        }
      }
      const orderState = {
        racquet: order?.racquet,
        contact: contactValues,
        hybrid: isHybrid,
        shop: order?.delivery_shop?.id,
      };
      localStorage.setItem("_rapo_", JSON.stringify(orderState));
    }
  }, [order, orderId]);

  return (
    <>
      <div>
        <div className={`review-order-odr max-w-[450px] m-[0_auto]`}>
          {(OrderStatus && OrderStatus == "fail") ||
            (OrderStatus === "pending" && (
              <div
                className={`max-w-[450px] m-[0_auto] ${
                  OrderStatus === "fail"
                    ? `text-[#E40000] bg-[#fff0f0]`
                    : ` bg-[#304FFE]/10 text-[#304FFE]`
                } rounded-md m-2 text-center px-2 py-4`}
              >
                {OrderStatus === "fail" ? (
                  <p>
                    Transaction for this order has failed, Please try again{" "}
                    <span
                      className="text-[#304FFE] cursor-pointer"
                      onClick={handlePayment}
                    >
                      {generating ? " Generating link... " : " here "}
                    </span>
                    or contact shop for help.
                  </p>
                ) : OrderStatus === "pending" ? (
                  <p>
                    You have an incomplete order on this racquet, Pay for it
                    first or Cancel it to create new order on the same racquet.
                  </p>
                ) : null}
              </div>
            ))}
        </div>
        <div className={`review-order-odr max-w-[450px] m-[0_auto]`}>
          {(OrderStatus === "returning" || OrderStatus === "saved") && (
            <div className="bg-[rgba(48,79,254,0.1)] text-[#304FFE] m-2 px-2 py-4  text-center mb-8 rounded-md font-medium">
              {OrderStatus === "returning" ? (
                <p>
                  We entered in your last used settings. If you're shopping
                  somewhere new, tap "Change Shop".
                </p>
              ) : (
                <p>
                  We have retrieved your saved details, tap "Pay and Finish" to
                  complete your order
                </p>
              )}
            </div>
          )}
          <div className="review-order-odr__heading">
            <BackButton
              onClick={() => {
                dispatch(setBackFromPreview(true));
                dispatch(setReviewArrowSource(true));
                navigate("/order-flow/contacts");
              }}
            />
            <Heading customClass="review-order-odr__heading-text">
              {t("odrReviewHeading")}
            </Heading>
          </div>
          <div className="review-order-odr__text-container">
            <Description customClass="review-order-odr__text-container-text">
              {t("odrReviewDesc")}
            </Description>
          </div>
          <div className="review-order-odr__shop-heading">
            <Heading customClass="review-order-odr__shop-heading-text">
              {t("ShopContactHeading")}
            </Heading>
            <HeadingButton
              text="Edit"
              onClick={() => {
                dispatch(setBackFromPreview(true));
                navigate("/order-flow/contacts");
              }}
            />
          </div>
          <div className="review-order-odr__contact">
            <div className="review-order-odr__contact-details">
              <SubHeading>{t("reviewOdrName")}</SubHeading>
              <Description>
                {userContacts &&
                  `${userContacts["first-name"]} ${userContacts["last-name"]}`}
              </Description>
            </div>
            <div className="review-order-odr__contact-details">
              <SubHeading>{t("taskOpenedPlayerPhoneHeading")}</SubHeading>
              <Description>
                {userContacts && userContacts["phone-number"]}
              </Description>
            </div>
          </div>

          <div className="review-order-odr__shop">
            <div className="review-order-odr__shop-heading">
              <Heading customClass="review-order-odr__shop-heading-text">
                {t("odrReviewShop")}
              </Heading>
              <HeadingButton
                text="Change Shop"
                onClick={() => {
                  dispatch(setBackFromPreview(true));
                  navigate("/order/select-shop");
                }}
              />
            </div>
            <div className="review-order-odr__shop-card">
              <SearchCard
                shop={{
                  name: isGettingShop ? "Loading..." : shop?.name,
                  address: isGettingShop
                    ? "Please hold on as we get you details for last used shop..."
                    : `${shop?.address?.street}, ${shop?.address?.city}, ${shop?.address?.state}`,
                }}
              />
            </div>
          </div>
          <div className="review-order-odr__raquet">
            <div className="review-order-odr__raquet-heading">
              <Heading customClass="review-order-odr__shop-heading-text">
                {t("odrRacquet")}
              </Heading>
            </div>
            <div className="review-order-odr__shop-card">
              <SearchCard
                raquet={{
                  img: racquet?.image_url
                    ? racquet?.image_url
                    : "/img/raquet.png",
                  name: isFetching
                    ? "Loading..."
                    : `${racquet && racquet?.brand}${" "} ${
                        racquet && racquet?.model
                      }`,
                  model: isLoading
                    ? "Please hold on as we get you the last racquet used..."
                    : racquet && racquet?.sport + " Racquet",
                }}
              />
            </div>
          </div>
          <div className="review-order-odr__summary">
            <div className="review-order-odr__summary-heading">
              <Heading customClass="review-order-odr__summary-heading-text">
                {t("odrSummary")}
              </Heading>
              <HeadingButton
                text="Change Strings"
                onClick={() => {
                  const stringDetailsMains = {
                    shop: racquet?.mains?.string_id?.shop,
                    string_id: racquet?.mains?.string_id?.id,
                    name: racquet?.mains?.string_id?.name,
                    in_stock: racquet?.mains?.string_id?.in_stock,
                    price: racquet?.mains?.string_id?.price,
                    tension: racquet?.mains?.tension,
                    hybrid_type: racquet?.mains?.string_id?.hybrid_type,
                    brand: racquet?.mains?.string_id?.brand,
                    model: racquet?.mains?.string_id?.model,
                  };
                  const stringDetailsCrosses = {
                    shop: racquet?.crosses?.string_id?.shop,
                    string_id: racquet?.crosses?.string_id?.id,
                    name: racquet?.crosses?.string_id?.name,
                    in_stock: racquet?.crosses?.string_id?.in_stock,
                    price: racquet?.crosses?.string_id?.price,
                    tension: racquet?.crosses?.tension,
                    hybrid_type: racquet?.crosses?.string_id?.hybrid_type,
                    brand: racquet?.crosses?.string_id?.brand,
                    model: racquet?.crosses?.string_id?.model,
                  };
                  if (isHybrid) {
                    dispatch(setStringCross(stringDetailsCrosses));
                    dispatch(setStringMain(stringDetailsMains));
                  } else {
                    dispatch(setStringBrand(stringDetailsMains));
                  }
                  dispatch(setBackFromPreview(true));
                  navigate("/order-flow/strings");
                }}
              />
            </div>
            <div className="review-order-odr__summary-card">
              <SummaryCard summary={summary} />
            </div>
          </div>
          <div className="review-order-odr__buttons">
            {(OrderStatus === "pending" || OrderStatus === "fail") && (
              <div className="mb-4 text-center">
                <p className="text-sm mb-2">
                  Create new order?{" "}
                  <span
                    className={
                      isCancelling
                        ? "text-[#E40000] cursor-auto"
                        : "text-[#304FFE] cursor-pointer"
                    }
                    onClick={isCancelling ? null : cancelOrderHanadler}
                  >
                    {isCancelling
                      ? "Cancelling order..."
                      : "Cancel this order and create new one"}
                  </span>
                </p>
              </div>
            )}
            <PaymentButton
              handleClick={onSubmitHandler}
              className="review-order-odr__buttons-credit"
              disabled={generating || hasError || isGettingShop || isFetching}
              style={{ marginBottom: "40px" }}
            >
              {generating ? "Generating Payment Link..." : "Pay and Finish"}
            </PaymentButton>
          </div>
        </div>
      </div>
    </>
  );
}

ReviewOrder = reduxForm({
  form: "review",
})(ReviewOrder);

export default withNamespaces()(ReviewOrder);
