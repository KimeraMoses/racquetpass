// Custom Components
import {
  Heading,
  Description,
  HeadingButton,
  SummaryCard,
  PaymentButton,
  SubHeading,
} from "web/components";
import { SearchCard, Survey } from "web/components/index";

// Styles
import "./ReviewOrder.styles.scss";
import { BackButton } from "web/components/Buttons/BackButton.component";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createOrder } from "web/store/Actions/shopActions";

export function ReviewOrder({ t, setStep, setDone, setBackFromReview }) {
  // const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.shop);
  const user = useSelector((state) => state?.form?.signup?.values);
  const SelectedShop = useSelector(
    (state) => state?.form?.signup?.values?.shop
  );
  const values = useSelector((state) => state?.form?.signup?.values);

  const racquet = useSelector((state) => state.racquet?.racquet);
  const shop = useSelector((state) => state.shop?.shop);

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
    },
    {
      heading: "Crosses",
      isOutOfStock: !racquet?.crosses?.string_id?.in_stock,
      description: `${racquet?.crosses?.string_id?.name}(${racquet?.crosses?.string_id?.hybrid_type}) ${racquet?.crosses?.string_id?.size} G @ ${racquet?.crosses?.string_id?.tension} lbs`,
      price: `$${crossesPrice}`,
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
          <div className="review-order-odr__heading">
            <BackButton onClick={() => setStep(prevStep)} />
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
                {user && `${user["first-name"]} ${user["last-name"]}`}
              </Description>
            </div>
            <div className="review-order-odr__contact-details">
              <SubHeading>{t("taskOpenedPlayerPhoneHeading")}</SubHeading>
              <Description>{user && user["phone-number"]}</Description>
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
                  name: SelectedShop?.name,
                  address: SelectedShop?.address,
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
                  name: `${user && user?.racquetBrand}, ${
                    user && user?.racquetModel
                  }`,
                  address: user && user?.racquetSport,
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
              // handleClick={() => {
              //   setShowSurvey(true);
              // }}
              // handleClick={onSubmitHandler}
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
