import React, { useEffect } from "react";
import { withNamespaces } from "react-i18next";
import {
  HeadingButton,
  CustomButton,
  TaskCard,
  // CustomDrawer,
} from "web/components";
import { Link } from "react-router-dom";
import "./index.styles.scss";
import "../inventory/sections/ProShop.styles.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchShopDetails,
  fetchShopOrders,
} from "web/store/Actions/shopActions";
import WelcomeMessage from "./WelcomeMessage";

function Tasks({ t }) {
  const shopOrders = useSelector((state) => state.shop.orders);
  const shopId = useSelector((state) => state.auth?.user?.shop);
  const { shop, isFetching } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShopOrders(shopId));
    dispatch(fetchShopDetails(shopId));
  }, [shopId]);

  const completedOrders =
    shopOrders &&
    shopOrders?.others
      ?.concat(
        shopOrders && shopOrders?.dueToday,
        shopOrders && shopOrders?.dueThisWeek
      )
      .filter((order) => order.status.toLowerCase() === "completed");

  const OtherOrders =
    shopOrders &&
    shopOrders?.others.filter(
      (order) => order.status.toLowerCase() !== "completed"
    );

  console.log(completedOrders);

  const showPromp =
    (shop && shop?.tax === 0) ||
    (shop && shop?.labor_price === undefined) ||
    (shop && shop?.estimated_delivery_time === undefined) ||
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
          <Link to="/tasks/scan">{t("taskScan")}</Link>
        </CustomButton>
      </div>
      {!isFetching && showPromp && <WelcomeMessage />}

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
            <div className="badge">
              {shopOrders && shopOrders?.dueToday?.length}
            </div>
          </div>
          <div className="cards-container">
            {shopOrders && shopOrders?.dueToday.length < 1 ? (
              <TaskCard
                title={`No Orders due today!`}
                desc={`All orders due today will appear here`}
              />
            ) : (
              shopOrders?.dueToday?.map((order, index) => {
                return (
                  <TaskCard
                    key={order.id}
                    status={order.status}
                    title={`Order #${order.order_number}`}
                    desc={`${order?.racquet?.model}, ${order?.racquet?.brand}`}
                    name={
                      order?.delivery_address?.first_name +
                      " " +
                      order?.delivery_address?.last_name
                    }
                  />
                );
              })
            )}
          </div>
          <div className="task-row">
            <p className="tasks-info">{t("taskDueWeek")}</p>
            <div className="badge">
              {shopOrders && shopOrders?.dueThisWeek?.length}
            </div>
          </div>
          <div className="cards-container">
            {shopOrders && shopOrders?.dueThisWeek.length < 1 ? (
              <TaskCard
                title={`No Orders due this week!`}
                desc={`All orders due this week will appear here`}
              />
            ) : (
              shopOrders &&
              shopOrders?.dueThisWeek?.map((order) => {
                return (
                  <TaskCard
                    key={order.id}
                    status={order.status}
                    title={`Order #${order.order_number}`}
                    desc={`${order?.racquet?.model}, ${order?.racquet?.brand}`}
                    name={
                      order?.delivery_address?.first_name +
                      " " +
                      order?.delivery_address?.last_name
                    }
                  />
                );
              })
            )}
          </div>

          <div className="task-row">
            <p className="tasks-info">Pending &#38; Processing</p>
            <div className="badge">{shopOrders && OtherOrders?.length}</div>
          </div>
          <div className="cards-container">
            {shopOrders && OtherOrders.length < 1 ? (
              <TaskCard
                title={`No Orders recieved yet`}
                desc={`All your pending and processing orders will appear here`}
              />
            ) : (
              shopOrders &&
              OtherOrders?.map((order) => {
                return (
                  <TaskCard
                    key={order.id}
                    status={order.status}
                    title={`Order #${order.order_number}`}
                    desc={`${order?.racquet?.model}, ${order?.racquet?.brand}`}
                    name={
                      order?.delivery_address?.first_name +
                      " " +
                      order?.delivery_address?.last_name
                    }
                  />
                );
              })
            )}
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
            <div className="badge">{shopOrders && completedOrders?.length}</div>
          </div>
          <div className="cards-container">
            {shopOrders && completedOrders.length < 1 ? (
              <TaskCard
                title={`No completed orders found!`}
                desc={`Scan the qr code to complete orders`}
              />
            ) : (
              shopOrders &&
              completedOrders.map((order) => {
                return (
                  <TaskCard
                    key={order.id}
                    status={order.status}
                    title={`Order #${order.order_number}`}
                    desc={`${order?.racquet?.model}, ${order?.racquet?.brand}`}
                    name={
                      order?.delivery_address?.first_name +
                      " " +
                      order?.delivery_address?.last_name
                    }
                  />
                );
              })
            )}
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
