import React, { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
// import { useNavigate } from "react-router-dom";
import {
  HeadingButton,
  CustomButton,
  TaskCard,
  Heading,
  SubHeading,
  // CustomDrawer,
} from "web/components";
import { Link } from "react-router-dom";
import "./index.styles.scss";
import "../inventory/sections/ProShop.styles.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchShopDetails,
  fetchShopOrders,
  getStripeOnBoardingLink,
  getStripeSessionLink,
} from "web/store/Actions/shopActions";
// import { fetchAllOrders } from "web/store/Actions/businessActions";

const dueToday = [];
for (let i = 0; i <= 3; i++) {
  dueToday.push({
    title: `Order # 12${i}`,
    description: `Wilson Prostaff 6.1`,
    player: `Player ${i}`,
  });
}

const dueThisWeek = [];
for (let i = 4; i <= 9; i++) {
  dueThisWeek.push({
    title: `Order # 12${i}`,
    description: `Wilson Prostaff 6.1`,
    player: `Player ${i}`,
  });
}

const completed = [];
for (let i = 0; i <= 9; i++) {
  completed.push({
    title: `Order # 1${i}`,
    description: `Wilson Prostaff 6.1`,
    player: `Player ${i}`,
  });
}

function Tasks({ t }) {
  const [isLoading, setIsLoading] = useState({
    subscription: false,
    onboarding: false,
  });
  const shopOrders = useSelector((state) => state.shop.orders);
  const shopId = useSelector((state) => state.auth?.user?.shop);
  const { shop, isLoading: isFetching } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShopOrders(shopId));
    dispatch(fetchShopDetails(shopId));
  }, [shopId]);

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

  const showPromp =
    incompleteSetUp ||
    (shop && !shop?.enabled) ||
    (shop && !shop?.stripe_account_enabled) ||
    (shop && shop?.stripe_status === "disabled");

  return (
    <div className="tasks-container">
      <div className="header-row">
        <HeadingButton
          drawer
          onClick={() => dispatch({ type: "SHOW_DRAWER" })}
        />
        <h1 className="header-row-heading">{t("taskHeading")}</h1>
        <CustomButton size="sm" btn="white">
          <Link to="/Tasks/Scan">{t("taskScan")}</Link>
        </CustomButton>
      </div>
      {showPromp && (
        <div className="shop__services-card bg-[#fff0f0]">
          <div className="shop__services-card-divider bg-[#E40000]"></div>
          <div>
            <div className="shop__services-card-inner pl-4">
              <div className="shop__services-card-heading text-[#E40000]">
                <Heading>Attention!!</Heading>
                <p>
                  Your account is not fully set up to be visible to clients,
                  Please ensure that all the following are fully configured for
                  your shop to show up.
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
              {shop && shop?.labor_price === undefined && (
                <div className="shop__services-card-inner-text">
                  <SubHeading customClass="shop__services-card-inner-text-heading">
                    {t("shopLaborPriceHeading")}
                  </SubHeading>
                  <SubHeading customClass="shop__services-card-inner-text-txt">
                    {isFetching
                      ? "Loading..."
                      : shop && shop.labor_price
                      ? `${shop && shop?.labor_price}`
                      : "Not Set"}
                  </SubHeading>
                </div>
              )}
              <div className="shop__services-card-inner-text">
                {shop && shop?.tax === 0 && (
                  <>
                    <SubHeading customClass="shop__services-card-inner-text-heading">
                      {t("shopTaxPriceHeading")}
                    </SubHeading>
                    <SubHeading customClass="shop__services-card-inner-text-txt">
                      {isFetching
                        ? "Loading..."
                        : shop && shop?.tax
                        ? `${shop && shop?.tax}`
                        : "Not Set"}
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
                    Please contact admin to unlock your account
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
                        : "Subscribe Now"}
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
                      Not Set Up
                    </SubHeading>
                    <p
                      className="text-semibold text-[#E40000] text-sm cursor-pointer"
                      onClick={handleOnboarding}
                    >
                      {isLoading.onboarding
                        ? "Generating link..."
                        : "Set Up Now"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="tasks-body">
        <div id="due-tasks">
          <div className="task-row">
            <p className="title">Your Orders</p>
            <p className="link" onClick={showCompletedTasks}>
              {t("taskShowCompleted")}
            </p>
          </div>
          <p className="mb-[35px] text-[#545454] text-[18px]">
            To complete an order or view its details, scan the racquet the order
            is associated with.
          </p>
          <div className="task-row">
            <p className="tasks-info">{t("taskDueToday")}</p>
            <div className="badge">{dueToday?.length}</div>
          </div>
          <div className="cards-container">
            {shopOrders?.map((task, index) => {
              return (
                <TaskCard
                  key={task.id}
                  title={`Order #${index + 1}`}
                  desc={`${task?.racquet?.model}, ${task?.racquet?.brand}`}
                  name={task.id}
                />
              );
            })}
          </div>
          <div className="task-row">
            <p className="tasks-info">{t("taskDueWeek")}</p>
            <div className="badge">{dueThisWeek?.length}</div>
          </div>
          <div className="cards-container">
            {shopOrders &&
              shopOrders?.map((task, index) => {
                return (
                  <TaskCard
                    key={task.id}
                    title={`Order #${index + 1}`}
                    desc={`${task?.racquet?.model}, ${task?.racquet?.brand}`}
                    name={task.id}
                  />
                );
              })}
          </div>
        </div>
        <div id="completed-tasks">
          <div className="task-row">
            <p className="title">{t("taskCompleted")}</p>
            <div className="link" onClick={showDueTasks}>
              {t("taskHideCompleted")}
            </div>
          </div>
          <p className="mb-[35px] text-[#545454] text-[18px]">
            To complete an order or view its details, scan the racquet the order
            is associated with.
          </p>
          <div className="task-row">
            <p className="tasks-info">Completed</p>
            <div className="badge">{completed?.length}</div>
          </div>
          <div className="cards-container">
            {shopOrders &&
              shopOrders?.map((task, index) => {
                return (
                  <TaskCard
                    key={task.id}
                    title={`Order #${index + 1}`}
                    desc={`${task?.racquet?.model}, ${task?.racquet?.brand}`}
                    name={task.id}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
function showCompletedTasks() {
  document.getElementById("due-tasks").style.display = "none";
  document.getElementById("completed-tasks").style.display = "block";
}
function showDueTasks() {
  document.getElementById("due-tasks").style.display = "block";
  document.getElementById("completed-tasks").style.display = "none";
}

export default withNamespaces()(Tasks);
