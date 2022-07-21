import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { Button } from "web/components";
import Recaptcha from "web/components/Google-Recaptcha/Recaptcha";
import "./home.styles.scss";
import { useDispatch } from "react-redux";
import { fetchShopOrder } from "web/store/Actions/shopActions";
import { fetchRacquetDetails } from "web/store/Actions/racquetActions";

function RedirectPage({ t }) {
  const navigate = useNavigate();
  const refRecaptcha = useRef();
  const isLoggedIn = !!JSON.parse(localStorage.getItem("Racquet__AuthToken"))
    ?.token;
  const { uuid } = useParams();

  const dispatch = useDispatch();
  const redirectUserWithToken = async () => {
    await dispatch(
      isLoggedIn ? fetchShopOrder(uuid) : fetchRacquetDetails(uuid)
    );
    navigate(isLoggedIn ? "/tasks/scan" : "/order");
  };

  useEffect(() => {
    redirectUserWithToken();
  }, []);

  return (
    <>
      <div className="home-container">
        <div>
          <div className="home-container__button-container">
            <div className="home-container__button-container-text">
              {t("homeLogo")}
            </div>
          </div>
          <div className="banner-container">
            <h1 className="banner-container__heading text-center">
              Thank you for using RacquetPass, you will be redirected shortly to
              {isLoggedIn ? " complete this " : " continue with your"} order
            </h1>
          </div>
          <div className="flex justify-center mt-5">
            <Button isDark disabled className="max-w-xs">
              Redirecting...
            </Button>
          </div>
        </div>
        <div>
          <div className="footer-container "></div>
          <div className="image-container">
            <img
              className="image-container__image"
              src={"/img/homepage/racquet.png"}
              alt="racquet"
            />
          </div>
          <Recaptcha refRecaptcha={refRecaptcha} />
        </div>
      </div>
    </>
  );
}

export default withNamespaces()(RedirectPage);
