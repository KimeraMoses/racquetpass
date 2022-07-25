// Custom Components
import {
  Heading,
  Description,
  // HeadingButton,
  SummaryCard,
  // PaymentButton,
  SubHeading,
  SearchCard,
} from "web/components";

// Styles
import "./ReviewOrder.styles.scss";
import { BackButton } from "web/components/Buttons/BackButton.component";
import { useSelector } from "react-redux";
import { withNamespaces } from "react-i18next";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getOrder } from "web/store/Actions/shopActions";
import { Survey } from "web/components/index";
import Loader from "web/components/Loader/Loader";

function OrderDetails({ t, setStep, setDone }) {
  const [showSurvey, setShowSurvey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const order = useSelector((state) => state?.shop?.order);
  console.log("order", order);
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchOrderDetails = async (order_id) => {
    setIsLoading(true);
    if (order_id) {
      await dispatch(getOrder(order_id, true, navigate));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrderDetails(orderId);
  }, [orderId]);

  const orderDetails = {
    // done: true,
    expectedPickup: new Date().toDateString(order && order?.due_on),
    shopName: order && order?.delivery_shop?.name,
    shopAddress: order && order?.delivery_shop?.address.city,
    orderDate: new Date().toDateString(order && order?.created),
    completionDate: "July 22, 2022",
    orderNumber: order && order?.order_number,
    name:
      order &&
      `${order.delivery_address?.first_name} ${order.delivery_address?.last_name}`,
    phone: order && order?.delivery_address?.phone_number,
    racquetName: `${order && order?.racquet?.brand}, ${
      order && order?.racquet?.model
    }`,
    racquetSport: order && order?.racquet?.sport,
  };

  let mainsPrice = order && order?.racquet?.mains?.string_id?.price;
  let crossesPrice = order && order?.racquet?.crosses?.string_id?.price;
  if (order && order?.racquet?.mains?.string_id?.hybrid_type === "Reel") {
    mainsPrice = order && order?.racquet?.mains?.string_id?.price / 2;
  }
  if (order && order?.racquet?.crosses?.string_id?.hybrid_type === "Reel") {
    crossesPrice = order && order?.racquet?.crosses?.string_id?.price / 2;
  }

  const items = [
    {
      heading: "Mains",
      isOutOfStock: order && !order.racquet?.mains?.string_id?.in_stock,
      description:
        order &&
        `${order?.racquet?.mains?.string_id?.name}(${
          order?.racquet?.mains?.string_id?.hybrid_type
        }) ${order && order?.racquet?.mains?.string_id?.size} G @ ${
          order && order?.racquet?.mains?.string_id?.tension
        } lbs`,
      price: `$${mainsPrice}`,
    },
    {
      heading: "Crosses",
      isOutOfStock: order && !order.racquet?.crosses?.string_id?.in_stock,
      description:
        order &&
        `${order?.racquet?.crosses?.string_id?.name}(${
          order?.racquet?.crosses?.string_id?.hybrid_type
        }) ${order && order?.racquet?.crosses?.string_id?.size} G @ ${
          order && order?.racquet?.crosses?.string_id?.tension
        } lbs`,
      price: `$${crossesPrice}`,
    },

    {
      description: "Labor",
      price: `$${order && order?.delivery_shop?.labor_price}`,
    },
    {
      description: "Tax",
      price: `$${order && order?.delivery_shop?.tax}`,
    },
  ];

  const TotalPrice =
    mainsPrice +
    crossesPrice +
    order?.delivery_shop?.labor_price +
    order?.delivery_shop?.tax;

  const summary = {
    items,
    TotalPrice,
    mainsPrice,
    crossesPrice,
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const OrderStatus = query.get("status");

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loader />
        </div>
      ) : (
        <>
          <Survey
            show={showSurvey}
            setShow={setShowSurvey}
            onExit={() => {
              // setStep(7);
              // setDone(true);
              console.log("Done");
            }}
          />
          {OrderStatus && (
            <div
              className={`max-w-[450px] m-[0_auto] ${
                OrderStatus === "success"
                  ? `text-[#008d3b] bg-[#E5FAEE]`
                  : `text-[#E40000] bg-[#fff0f0]`
              } p-3 rounded-md mt-1 text-center`}
            >
              {OrderStatus === "success"
                ? `Your payment for this order has been successfuly recieved by ${
                    order && order?.delivery_shop?.name
                  }`
                : `Transaction for this order has failed, Please try again or contact shop for help`}
            </div>
          )}
          <div className="review-order-odr max-w-[450px] m-[0_auto] mt-5">
            <div className="review-order-odr__heading">
              <BackButton onClick={() => navigate("/order/done")} />
              <Heading customClass="review-order-odr__heading-text">
                Order Details
              </Heading>
            </div>
            {/* Status */}
            <div
              className={`mt-[15px] py-[10px] px-[16px] rounded-[12px] w-[fit-content] flex items-center font-medium ${
                orderDetails?.done
                  ? "text-[#008d3b] bg-[#E5FAEE]"
                  : "text-[#D78700] bg-[#FFF6E5] gap-[50px]"
              }`}
            >
              {orderDetails?.done ? (
                <>
                  <img src="/img/tick-circle.png" alt="tick" />
                  Order complete
                </>
              ) : (
                <>
                  Expected Pickup: {orderDetails?.expectedPickup}{" "}
                  <img src="/svg/calenderOD.svg" alt="calender" />
                </>
              )}
            </div>
            {/* Description */}
            <div className="mt-[15px] text-[18px]">
              {orderDetails?.done ? (
                <>
                  Pickup this racquet at{" "}
                  <span className="font-bold">{orderDetails?.shopName}.</span>{" "}
                  When you arrive, show the attendant this screen to verify your
                  order.
                </>
              ) : (
                <>
                  Your order is{" "}
                  <span className="text-[#DF9D2E] font-bold capitalize">
                    {order && order?.status}
                  </span>
                  . You'll be notified when your racquet is ready for pickup.
                </>
              )}
            </div>
            {/* Order Details (Dates + Order Number) */}
            <div className="grid grid-cols-2 gap-[20px] mt-[20px]">
              {/* Order Date */}
              <div className="flex flex-col gap-[12px]">
                <div className="text-[#8e8e8e] text-[12px] font-semibold">
                  Order Date
                </div>
                <div className="text-[#3C3C3C] text-[18px] font-medium">
                  {orderDetails?.orderDate}
                </div>
              </div>
              {/* Completion Date */}
              {orderDetails?.done ? (
                <>
                  <div className="flex flex-col gap-[12px]">
                    <div className="text-[#8e8e8e] text-[12px] font-semibold">
                      Completion Date
                    </div>
                    <div className="text-[#3C3C3C] text-[18px] font-medium">
                      {orderDetails?.completionDate}
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
              {/* Order Number */}
              <div className="flex flex-col gap-[12px]">
                <div className="text-[#8e8e8e] text-[12px] font-semibold">
                  Order Number
                </div>
                <div className="text-[#3C3C3C] text-[18px] font-medium">
                  {orderDetails?.orderNumber}
                </div>
              </div>
            </div>
            <div className="review-order-odr__shop-heading">
              <Heading customClass="review-order-odr__shop-heading-text">
                {t("ShopContactHeading")}
              </Heading>
            </div>
            <div className="review-order-odr__contact">
              <div className="review-order-odr__contact-details">
                <SubHeading>{t("reviewOdrName")}</SubHeading>
                <Description>{orderDetails?.name}</Description>
              </div>
              <div className="review-order-odr__contact-details">
                <SubHeading>{t("taskOpenedPlayerPhoneHeading")}</SubHeading>
                <Description>{orderDetails?.phone}</Description>
              </div>
            </div>

            <div className="review-order-odr__shop">
              <div className="review-order-odr__shop-heading">
                <Heading customClass="review-order-odr__shop-heading-text">
                  {t("odrReviewShop")}
                </Heading>
                <a
                  href={`tel:${order && order?.delivery_shop?.phone}`}
                  className="text-[12px] text-[#304FFE] font-semibold"
                >
                  Call Shop
                </a>
              </div>
              <div className="review-order-odr__shop-card">
                <SearchCard
                  shop={{
                    name: orderDetails?.shopName,
                    address: orderDetails?.shopAddress,
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
                    img:
                      order && order?.racquet?.image_url
                        ? order && order?.racquet?.image_url
                        : "/img/raquet.png",
                    name: orderDetails?.racquetName,
                    model: `${orderDetails?.racquetSport} Racquet`,
                  }}
                />
              </div>
            </div>
            <div className="review-order-odr__summary">
              <div className="review-order-odr__summary-heading">
                <Heading customClass="review-order-odr__summary-heading-text">
                  {t("odrSummary")}
                </Heading>
              </div>
              <div className="review-order-odr__summary-card mb-[116px]">
                <SummaryCard summary={summary} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default withNamespaces()(OrderDetails);
