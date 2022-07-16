import React from "react";
import { withNamespaces } from "react-i18next";
import { CustomButton } from "web/components";
import "./index.styles.scss";

function OrderSubmitted({ t }) {
  return (
    <div className="order-submitted-detail-container">
      <div>
        <div className="header-row">
          <h1 className="header-row-heading">{t("OrderSubmitted")}</h1>
        </div>
        <div className="status-container">
          <div className="service-order-status">
            <div className="state-half uncompleted">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="22"
                  viewBox="0 0 20 22"
                  fill="none"
                >
                  <path
                    d="M6 1V4"
                    stroke="#4A4A4A"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14 1V4"
                    stroke="#4A4A4A"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1.5 8.08984H18.5"
                    stroke="#4A4A4A"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19 7.5V16C19 19 17.5 21 14 21H6C2.5 21 1 19 1 16V7.5C1 4.5 2.5 2.5 6 2.5H14C17.5 2.5 19 4.5 19 7.5Z"
                    stroke="#4A4A4A"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.6947 12.6992H13.7037"
                    stroke="#4A4A4A"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.6947 15.6992H13.7037"
                    stroke="#4A4A4A"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.99548 12.6992H10.0045"
                    stroke="#4A4A4A"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.99548 15.6992H10.0045"
                    stroke="#4A4A4A"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.29431 12.6992H6.30329"
                    stroke="#4A4A4A"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.29431 15.6992H6.30329"
                    stroke="#4A4A4A"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              {t("OrderSubmittedDate")}
            </div>
          </div>
        </div>
        <div className="pickup">
          {t("OrderSubmittedInfo")} <b>{t("OrderSubmittedInfoProgress")} </b>{" "}
          {t("OrderSubmittedInfoConfirmation")}
        </div>
        <div className="detail-body-container">
          <div className="racquet-info">
            <img className="img" alt="racquet" src="../img/tasks/racquet.png" />
            <div className="brand">
              <div className="model">{t("orderOpenedBrand")}</div>
              <div className="title">{t("orderOpenedBrandTitle")}</div>
            </div>
          </div>
          <div className="string-details">
            <div className="title">{t("orderOpenedStringTitle")}</div>
            <div className="string-label">
              {t("orderOpenedStringMainsHeading")}
            </div>
            <div className="string-desc">{t("orderOpenedStringMainsDesc")}</div>
            <div className="string-label">
              {t("orderOpenedStringCrossesHeading")}
            </div>
            <div className="string-desc">
              {t("orderOpenedStringCrossesDesc")}
            </div>
          </div>
          <div className="shop-details">
            <div className="title-row">
              <div className="title">{t("orderOpenedShopTitle")}</div>
            </div>
            <div className="shop-label">{t("orderOpenedShopNameHeading")}</div>
            <div className="shop-desc">{t("orderOpenedShopName")}</div>
            <div className="shop-label">
              {t("orderOpenedShopAddressHeading")}
            </div>
            <div className="shop-desc">
              {t("orderOpenedShopAddress")}
              <br />
              {t("orderOpenedShopAddress1")}
            </div>
            <div className="shop-label">{t("orderOpenedShopPhoneHeading")}</div>
            <div className="shop-desc">
              <a href="/">{t("orderOpenedShopPhone")}</a>
            </div>
          </div>
        </div>
      </div>

      <div>
        <CustomButton size="lg" btn="primary">
          <a href="/CreateOrder/Locker">{t("OrderSubmittedBack")}</a>
        </CustomButton>
      </div>
    </div>
  );
}

export default withNamespaces()(OrderSubmitted);
