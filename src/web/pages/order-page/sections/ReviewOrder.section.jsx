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

// Styles
import "./ReviewOrder.styles.scss";
import { BackButton } from "web/components/Buttons/BackButton.component";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchShopDetails } from "web/store/Actions/shopActions";
import { fetchRacquetDetails } from "web/store/Actions/racquetActions";
import { useDispatch } from "react-redux";

export function ReviewOrder({
  t,
  setStep,
  change,
  setBackFromReview,
  isReturnCustomer,
}) {
  const [cookies, setCookie] = useCookies("_rpo_");
  const { isLoading, isFetching: isGettingShop } = useSelector(
    (state) => state.shop
  );
  const { isLoading: isFetching } = useSelector((state) => state.racquet);
  const SelectedShop = useSelector(
    (state) => state?.form?.signup?.values?.shop
  );

  const values = useSelector((state) => state?.form?.signup?.values);
  const racquet = useSelector((state) => state.racquet?.racquet);
  const shop = useSelector((state) => state.shop?.shop);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (cookies?._rpo_ === undefined) navigate("/");

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [cookies]);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const isReturning = query.get("rpc");

  useEffect(() => {
    if (cookies?._rpo_ !== undefined) {
      change("shop", {
        shop_id: shop?.id,
        name: shop?.name,
        address: `${shop?.address?.street}, ${shop?.address?.city}, ${shop?.address?.state}`,
      });
      change("racquetBrand", racquet && racquet?.brand);
      change("racquetId", racquet && racquet?.id);
      change("racquetModel", racquet && racquet?.model);
      change("racquetSport", racquet && racquet?.sport);
      if (racquet?.mains?.string_id?.id !== racquet?.crosses?.string_id?.id) {
        change("main", {
          shop_id: racquet?.mains?.string_id?.shop,
          string_id: racquet?.mains?.string_id?.id,
          tension: racquet?.mains?.tension,
          name: `${racquet?.mains?.string_id?.name}(${racquet?.mains?.string_id?.hybrid_type})`,
          description: `${racquet?.mains?.string_id?.brand}, ${racquet?.mains?.string_id?.model}`,
          price: `$${racquet?.mains?.string_id?.price}`,
          size: racquet?.mains?.string_id?.size,
        });
        change("cross", {
          shop_id: racquet?.crosses?.string_id?.shop,
          string_id: racquet?.crosses?.string_id?.id,
          tension: racquet?.crosses?.tension,
          name: `${racquet?.crosses?.string_id?.name}(${racquet?.crosses?.string_id?.hybrid_type})`,
          description: `${racquet?.crosses?.string_id?.brand}, ${racquet?.crosses?.string_id?.model}`,
          price: `$${racquet?.crosses?.string_id?.price}`,
          size: racquet?.crosses?.string_id?.size,
        });
      } else {
        change("brand", {
          shop_id: racquet?.crosses?.string_id?.shop,
          string_id: racquet?.crosses?.string_id?.id,
          tension: racquet?.crosses?.tension,
          name: `${racquet?.crosses?.string_id?.name}(${racquet?.crosses?.string_id?.hybrid_type})`,
          description: `${racquet?.crosses?.string_id?.brand}, ${racquet?.crosses?.string_id?.model}`,
          price: `$${racquet?.crosses?.string_id?.price}`,
          size: racquet?.crosses?.string_id?.size,
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies, shop, racquet, change, isReturnCustomer]);

  useEffect(() => {
    if (cookies?._rpo_ !== undefined && !isReturnCustomer) {
      change("email", cookies?._rpo_?.email);
      change("first-name", cookies?._rpo_?.first_name);
      change("last-name", cookies?._rpo_?.last_name);
      change("phone-number", cookies?._rpo_?.phone_number);
      dispatch(fetchShopDetails(cookies?._rpo_?.shop_id));
      dispatch(fetchRacquetDetails(cookies?._rpo_?.racquet_id, false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies, change, isReturnCustomer]);

  let isVerifiedObj = JSON.parse(localStorage.getItem("_rpe_"));
  let prevStep = 5;
  if (isVerifiedObj?.e === values?.email && isVerifiedObj?.isV) {
    prevStep = 4;
  }

  let mainsPrice = racquet && racquet?.mains?.string_id?.price;
  let crossesPrice = racquet && racquet?.crosses?.string_id?.price;
  if (racquet && racquet?.mains?.string_id?.hybrid_type === "Reel") {
    mainsPrice = racquet && racquet?.mains?.string_id?.price / 2;
  }
  if (racquet && racquet?.crosses?.string_id?.hybrid_type === "Reel") {
    crossesPrice = racquet && racquet?.crosses?.string_id?.price / 2;
  }

  const items = [
    {
      heading: "Mains",
      isOutOfStock: !racquet?.mains?.string_id?.in_stock,
      description: `${racquet?.mains?.string_id?.name}(${racquet?.mains?.string_id?.hybrid_type}) ${racquet?.mains?.string_id?.size} G @ ${racquet?.mains?.string_id?.tension} lbs`,
      price: `$${mainsPrice}`,
      isToShop: racquet?.mains?.string_id?.shop !== shop?.id,
    },
    {
      heading: "Crosses",
      isOutOfStock: !racquet?.crosses?.string_id?.in_stock,
      description: `${racquet?.crosses?.string_id?.name}(${racquet?.crosses?.string_id?.hybrid_type}) ${racquet?.crosses?.string_id?.size} G @ ${racquet?.crosses?.string_id?.tension} lbs`,
      price: `$${crossesPrice}`,
      isToShop: racquet?.crosses?.string_id?.shop !== shop?.id,
    },
    {
      description: "Labor",
      price: `$${shop && shop?.labor_price}`,
    },
    {
      description: "Tax",
      price: `$${shop && shop?.tax}`,
    },
  ];

  const hasError =
    racquet?.mains?.string_id?.shop !== shop?.id ||
    racquet?.crosses?.string_id?.shop !== shop?.id;

  const TotalPrice = mainsPrice + crossesPrice + shop?.labor_price + shop?.tax;

  const summary = {
    items,
    TotalPrice,
    mainsPrice,
    crossesPrice,
  };

  return (
    <>
      <div>
        <div className={`review-order-odr max-w-[450px] m-[0_auto]`}>
          {isReturning === "true" && !isReturnCustomer && (
            <div className="bg-[rgba(48,79,254,0.1)] text-[#304FFE] m-2 px-2 py-4  text-center mb-8 rounded-md font-medium">
              <p>
                We entered in your last used settings. If you're shopping
                somewhere new, tap "Change Shop".
              </p>
            </div>
          )}
          <div className="review-order-odr__heading">
            <BackButton
              onClick={() =>
                isReturning !== "true" ? setStep(prevStep) : null
              }
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
                setBackFromReview(true);
                setStep(4);
              }}
            />
          </div>
          <div className="review-order-odr__contact">
            <div className="review-order-odr__contact-details">
              <SubHeading>{t("reviewOdrName")}</SubHeading>
              <Description>
                {values && `${values["first-name"]} ${values["last-name"]}`}
              </Description>
            </div>
            <div className="review-order-odr__contact-details">
              <SubHeading>{t("taskOpenedPlayerPhoneHeading")}</SubHeading>
              <Description>{values && values["phone-number"]}</Description>
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
                  setBackFromReview(true);
                  setStep(0);
                }}
              />
            </div>
            <div className="review-order-odr__shop-card">
              <SearchCard
                shop={{
                  name: isGettingShop ? "Loading..." : SelectedShop?.name,
                  address: isGettingShop
                    ? "Please hold on as we get you details for last used shop..."
                    : SelectedShop?.address,
                }}
              />
            </div>
          </div>
          <div className="review-order-odr__raquet">
            <div className="review-order-odr__raquet-heading">
              <Heading customClass="review-order-odr__shop-heading-text">
                {t("odrRacquet")}
              </Heading>
              <HeadingButton
                text="Change Racquet"
                onClick={() => {
                  setBackFromReview(true);
                  setStep(1);
                }}
              />
            </div>
            <div className="review-order-odr__shop-card">
              <SearchCard
                shop={{
                  img: "/img/orders/racquet-img.png",
                  name: isFetching
                    ? "Loading..."
                    : `${values && values?.racquetBrand}, ${
                        values && values?.racquetModel
                      }`,
                  address: isLoading
                    ? "Please hold on as we get you the last racquet used..."
                    : values && values?.racquetSport,
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
                  setBackFromReview(true);
                  setStep(values?.brand?.string_id ? 2 : 3);
                }}
              />
            </div>
            <div className="review-order-odr__summary-card">
              <SummaryCard summary={summary} />
            </div>
          </div>
          <div className="review-order-odr__buttons">
            <PaymentButton
              className="review-order-odr__buttons-credit"
              disabled={isLoading || hasError || isGettingShop || isFetching}
              style={{ marginBottom: "40px" }}
            >
              {isLoading ? "Generating Payment Link..." : "Pay and Finish"}
            </PaymentButton>
          </div>
        </div>
      </div>
    </>
  );
}
