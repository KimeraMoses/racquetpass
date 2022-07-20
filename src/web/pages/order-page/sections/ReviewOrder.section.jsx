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
import { useState } from "react";
import { useSelector } from "react-redux";

export function ReviewOrder({ t, setStep, setDone, setBackFromReview }) {
  const [showSurvey, setShowSurvey] = useState(false);

  const user = useSelector((state) => state?.form?.signup?.values);
  const shop = useSelector((state) => state?.form?.signup?.values?.shop);

  return (
    <>
      <Survey
        show={showSurvey}
        setShow={setShowSurvey}
        onExit={() => {
          setStep(7);
          setDone(true);
        }}
      />
      <div>
        <div className={`review-order-odr max-w-[450px] m-[0_auto]`}>
          <div className="review-order-odr__heading">
            <BackButton onClick={() => setStep(5)} />
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
                  name: shop?.name,
                  address: shop?.address,
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
                  setStep(2);
                }}
              />
            </div>
            <div className="review-order-odr__summary-card">
              <SummaryCard />
            </div>
          </div>
          <div className="review-order-odr__buttons">
            <PaymentButton
              className="review-order-odr__buttons-credit"
              handleClick={() => {
                setShowSurvey(true);
              }}
              style={{ marginBottom: "40px" }}
            >
              Pay and Finish
            </PaymentButton>
          </div>
        </div>
      </div>
    </>
  );
}
