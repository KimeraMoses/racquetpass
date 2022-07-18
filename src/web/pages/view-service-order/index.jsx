import React from "react";
import { withNamespaces } from "react-i18next";
import { MenuButton } from "web/components";
import { CustomButton } from "web/components";
import { ServiceOrderStatus } from "web/components";
import "./index.styles.scss";

function ViewServiceOrder({ t }) {
  return (
    <div className="view-service-order-container">
      <div>
        <div className="header-row">
          <MenuButton>
            <img alt="Menu Icon" src="../svg/arrowLeft.svg" />
          </MenuButton>
          <h1 className="header-row-heading">{t("taskHeading")}</h1>
        </div>
        <div className="status-container">
          {/* status true or false means complete or inProgress */}
          <ServiceOrderStatus
            state="full"
            status={true}
            t={t}
          ></ServiceOrderStatus>
        </div>
        <div className="detail-body-container">
          <div className="racquet-info">
            <img className="img" alt="racquet" src="../img/tasks/racquet.png" />
            <div className="brand">
              <div>
                <div className="model">{t("taskOpenedBrand")}</div>
                <div className="title">{t("taskOpenedBrandTitle")}</div>
              </div>
              <CustomButton size="sm" btn="white">
                <a href="/ServiceOrder/Details">{t("viewOrderEdit")}</a>
              </CustomButton>
            </div>
          </div>
          <div className="racquet-details">
            <div className="racquet-label">{t("viewOrderBrandLabel")}</div>
            <div className="racquet-desc">{t("viewOrderBrandName")}</div>
            <div className="racquet-label">{t("viewOrderModelLabel")}</div>
            <div className="racquet-desc">{t("viewOrderModelName")}</div>
            <div className="racquet-label">{t("viewOrderStringLabel")}</div>
            <div className="racquet-desc">{t("viewOrderStringName")}</div>
            <div className="racquet-label">{t("viewOrderDateLabel")}</div>
            <div className="racquet-desc">{t("viewOrderDate")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withNamespaces()(ViewServiceOrder);
