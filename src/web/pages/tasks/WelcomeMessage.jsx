import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withNamespaces } from "react-i18next";
import { Heading, SubHeading } from "web/components";
import { Link } from "react-router-dom";
import {
  getStripeOnBoardingLink,
  getStripeSessionLink,
} from "web/store/Actions/shopActions";
import "./index.styles.scss";
import "../inventory/sections/ProShop.styles.scss";

const WelcomeMessage = ({ t }) => {
  const { shop, isFetching } = useSelector((state) => state.shop);
  const [isLoading, setIsLoading] = useState({
    subscription: false,
    onboarding: false,
  });
  const dispatch = useDispatch();

  const handleSubscription = async () => {
    setIsLoading({ ...isLoading, subscription: true });
    await dispatch(getStripeSessionLink(shop && shop.id));
    setIsLoading({ ...isLoading, subscription: false });
  };

  const handleOnboarding = async () => {
    setIsLoading({ ...isLoading, onboarding: true });
    await dispatch(getStripeOnBoardingLink(shop && shop.id));
    setIsLoading({ ...isLoading, onboarding: false });
  };

  const incompleteSetUp =
    shop?.estimated_delivery_time === undefined ||
    shop?.labor_price === undefined ||
    shop?.tax === 0;

  const isNew = localStorage.getItem("_rpn_");

  const NewUserWelcomeMessage = () => {
    return (
      <div className="shop__services-card_welcome bg-[rgba(48,79,254,0.1)] rounded-md">
        <div>
          <div className="shop__services-card-inner pl-3">
            <div className="shop__services-card-heading text-[#304FFE]">
              <Heading customClass="text-[#304FFE] font-medium">
                Welcome to RacquetPass!
              </Heading>
              <p className="mt-2 text-sm">
                We'll personally guide you through setting up your account.{" "}
                <span className="font-semibold">We sent you an email</span> to
                schedule a call.
              </p>
              <p className="mt-2 text-sm">
                <span className="font-semibold">After we meet,</span> we'll send
                you a link to subscribe to RaquetPass. During the meeting, we'll
                make all of the following properly configured:
              </p>
            </div>

            {shop && shop?.estimated_delivery_time === undefined && (
              <div className="shop__services-card-inner-text">
                <SubHeading customClass="shop__services-card-inner-text-heading">
                  {t("shopDeliveryTime")}
                </SubHeading>
                <SubHeading customClass="shop__services-card-inner-text-txt">
                  {isFetching
                    ? "Loading..."
                    : `${
                        shop && shop.estimated_delivery_time
                          ? `${shop?.estimated_delivery_time}d`
                          : "Not set"
                      }`}
                </SubHeading>
              </div>
            )}
            <div className="shop__services-card-inner-text">
              {shop && shop?.labor_price === undefined && (
                <>
                  <SubHeading customClass="shop__services-card-inner-text-heading">
                    {t("shopLaborPriceHeading")}
                  </SubHeading>
                  <SubHeading customClass="shop__services-card-inner-text-txt">
                    {isFetching
                      ? "Loading..."
                      : shop && shop.labor_price
                      ? `${shop && shop?.labor_price}`
                      : "Not set"}
                  </SubHeading>
                </>
              )}
              {incompleteSetUp && (
                <p className="text-semibold text-[#E40000] text-sm">
                  Please{" "}
                  <Link
                    to="/inventory?active=proshop"
                    className="text-[#304FFE]"
                  >
                    click here
                  </Link>{" "}
                  to edit shop settings and set all the fields above
                </p>
              )}
            </div>

            {shop && shop?.stripe_status === "disabled" && (
              <div className="shop__services-card-inner-text">
                <SubHeading customClass="shop__services-card-inner-text-heading">
                  Subcription to RacquetPass
                </SubHeading>
                <div className="flex justify-between items-center">
                  <SubHeading customClass="shop__services-card-inner-text-txt">
                    Not Subscribed
                  </SubHeading>
                  <p
                    className="text-semibold text-[#304FFE] text-sm cursor-pointer"
                    onClick={handleSubscription}
                  >
                    {isLoading.subscription
                      ? "Generating link..."
                      : "Meet with us to subscribe"}
                  </p>
                </div>
              </div>
            )}
            {shop && !shop?.stripe_account_enabled && (
              <div className="shop__services-card-inner-text">
                <SubHeading customClass="shop__services-card-inner-text-heading">
                  Stripe Account
                </SubHeading>
                <div className="flex justify-between items-center">
                  <SubHeading customClass="shop__services-card-inner-text-txt">
                    Not set up
                  </SubHeading>
                  <p
                    className="text-semibold text-[#304FFE] text-sm cursor-pointer"
                    onClick={handleOnboarding}
                  >
                    {isLoading.onboarding ? "Generating link..." : "Set up now"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const AttentionWelcomeMessage = () => {
    return (
      <div className="shop__services-card_welcome bg-[#fff0f0]">
        <div>
          <div className="shop__services-card-inner pl-4">
            <div className="shop__services-card-heading text-[#E40000]">
              <Heading>Attention!</Heading>
              <p>
                Your shop isn???t visible to players. Make sure all of the
                following are properly configured for your shop to show up.
              </p>
            </div>

            {shop && shop?.estimated_delivery_time === undefined && (
              <div className="shop__services-card-inner-text">
                <SubHeading customClass="shop__services-card-inner-text-heading">
                  {t("shopDeliveryTime")}
                </SubHeading>
                <SubHeading customClass="shop__services-card-inner-text-txt">
                  {isFetching
                    ? "Loading..."
                    : `${
                        shop && shop.estimated_delivery_time
                          ? `${shop?.estimated_delivery_time}d`
                          : "Not set"
                      }`}
                </SubHeading>
              </div>
            )}

            <div className="shop__services-card-inner-text">
              {shop && shop?.labor_price === undefined && (
                <>
                  <SubHeading customClass="shop__services-card-inner-text-heading">
                    {t("shopLaborPriceHeading")}
                  </SubHeading>
                  <SubHeading customClass="shop__services-card-inner-text-txt">
                    {isFetching
                      ? "Loading..."
                      : shop && shop.labor_price
                      ? `${shop && shop?.labor_price}`
                      : "Not set"}
                  </SubHeading>
                </>
              )}
              {incompleteSetUp && (
                <p className="text-semibold text-[#E40000] text-sm">
                  Please{" "}
                  <Link
                    to="/inventory?active=proshop"
                    className="text-[#304FFE]"
                  >
                    click here
                  </Link>{" "}
                  to edit shop settings and set all the fields above
                </p>
              )}
            </div>

            {shop && !shop?.enabled && (
              <div className="shop__services-card-inner-text">
                <SubHeading customClass="shop__services-card-inner-text-heading">
                  Account Status
                </SubHeading>
                <SubHeading customClass="shop__services-card-inner-text-txt">
                  Locked
                </SubHeading>
                <p className="text-semibold text-[#E40000] text-sm">
                  <a
                    href={`mailto:info@racquetpass.com?subject=Unlock Account Request - ${shop?.name}!`}
                    className="text-semibold text-sm text-[#304FFE]"
                  >
                    Contact admin
                  </a>{" "}
                  to unlock your account
                </p>
              </div>
            )}
            {shop && shop?.stripe_status === "disabled" && (
              <div className="shop__services-card-inner-text">
                <SubHeading customClass="shop__services-card-inner-text-heading">
                  Subcription to RacquetPass
                </SubHeading>
                <div className="flex justify-between items-center">
                  <SubHeading customClass="shop__services-card-inner-text-txt">
                    Not Subscribed
                  </SubHeading>
                  <p
                    className="text-semibold text-[#E40000] text-sm cursor-pointer"
                    onClick={handleSubscription}
                  >
                    {isLoading.subscription
                      ? "Generating link..."
                      : "Subscribe now"}
                  </p>
                </div>
              </div>
            )}
            {shop && !shop?.stripe_account_enabled && (
              <div className="shop__services-card-inner-text">
                <SubHeading customClass="shop__services-card-inner-text-heading">
                  Stripe Account
                </SubHeading>
                <div className="flex justify-between items-center">
                  <SubHeading customClass="shop__services-card-inner-text-txt">
                    Not set up
                  </SubHeading>
                  <p
                    className="text-semibold text-[#E40000] text-sm cursor-pointer"
                    onClick={handleOnboarding}
                  >
                    {isLoading?.onboarding
                      ? "Generating link..."
                      : "Set up now"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {!!isNew && shop?.appeared_to_clients ? (
        <AttentionWelcomeMessage />
      ) : (
        <NewUserWelcomeMessage />
      )}
    </>
  );
};

export default withNamespaces()(WelcomeMessage);
