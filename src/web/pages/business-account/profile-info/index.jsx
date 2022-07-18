import React, { useRef } from "react";
import { withNamespaces } from "react-i18next";
import { MenuButton } from "web/components";
import Recaptcha from "web/components/Google-Recaptcha/Recaptcha";
import "./index.styles.scss";

function ProfileInfo({ t }) {
  const refRecaptcha = useRef();
  return (
    <div className="profile-info-container">
      <div className="header-row">
        <div className="header-row-img">
          <img alt="Profile" src="../img/businessaccount/profile.png" />
        </div>
        <div className="header-row-heading">
          {t("businessAccountDetailsHeading")}
        </div>
        <div className="close-menu">
          <MenuButton>
            <a href="/BusinessAccount/VerifyBusiness">
              <img alt="Menu Icon" src="../svg/close.svg" />
            </a>
          </MenuButton>
        </div>
      </div>
      <div className="profile-info-body">
        <div className="profile-info-row">
          <div className="img-container">
            <img alt="Tick" src="../svg/blacktick.svg" />
          </div>
          {t("businessAccountDetailsVerify")}
        </div>
        <div className="profile-info-row">
          <div className="img-container">
            <img alt="Shop" src="../svg/shop.svg" />
          </div>
          {t("businessAccountDetailsShop")}
        </div>
        <div className="profile-info-row">
          <div className="img-container">
            <img alt="Inventory" src="../svg/inventory.svg" />
          </div>
          {t("businessAccountDetailsInventory")}
        </div>
        <div className="profile-info-row">
          <div className="img-container">
            <img alt="Logout" src="../svg/logout.svg" />
          </div>
          {t("businessAccountDetailsLogout")}
        </div>
        <Recaptcha refRecaptcha={refRecaptcha} />
      </div>
    </div>
  );
}

export default withNamespaces()(ProfileInfo);
