import React from "react";
import { withNamespaces } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { HeadingButton, CustomButton } from "web/components";
import "./index.styles.scss";

function CreateOrder({ t }) {
  const navigate = useNavigate();
  return (
    <div className="create-order-container">
      <div className="header-row">
        <HeadingButton
          drawer
          onClick={() => navigate("/player-tabs?backFrom=CreateOrder")}
        />
        <h1 className="header-row-heading">{t("lockerHeading")}</h1>
        <CustomButton size="sm" btn="white">
          <a href="/CreateOrder/Scan">{t("lockerScan")}</a>
        </CustomButton>
      </div>
      <div className="create-order-body">
        <div className="cards-container">
          <div className="card-locker">
            <div className="img-container">
              <img alt="Racquet" src="../img/tasks/racquet.png" />
            </div>
            <div className="card-locker-title">{t("lockerCardHeading")}</div>
            <div className="card-locker-label racquet-ready">
              {t("lockerCardLabelReady")}
            </div>
          </div>

          <div
            className="card-locker"
            onClick={() => {
              navigate("/CreateOrder/Scan");
            }}
          >
            <div className="img-container">
              <img alt="Racquet" src="../img/tasks/racquet.png" />
            </div>
            <div className="card-locker-title">{t("lockerCardHeading")}</div>
            <div className="card-locker-label racquet-missing-qr">
              {t("lockerCardLabelMissing")}
            </div>
          </div>

          <div className="card-locker">
            <div className="img-container">
              <img alt="Racquet" src="../img/tasks/racquet.png" />
            </div>
            <div className="card-locker-title">{t("lockerCardHeading")}</div>
            <div className="card-locker-label racquet-progress">
              {t("lockerCardLabelProgress")}
            </div>
          </div>

          <div className="card-add-order">
            <div className="add-container">
              <a href="/CreateOrder/Details" className="add-btn">
                <img alt="Plus" src="../svg/plus.svg" />
                <div className="bg-blur"></div>
              </a>
              <img
                className="img"
                alt="Racquet"
                src="../img/orders/racquet.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withNamespaces()(CreateOrder);
