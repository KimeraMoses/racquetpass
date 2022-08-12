import React, { useEffect } from "react";
import { withNamespaces } from "react-i18next";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchShopDetails,
  fetchShopOrders,
} from "web/store/Actions/shopActions";
import { HeadingButton, CustomButton, TaskCard } from "web/components";
import WelcomeMessage from "./WelcomeMessage";
import "./index.styles.scss";
import "../inventory/sections/ProShop.styles.scss";

function Tasks({ t }) {
  const shopOrders = useSelector((state) => state.shop.orders);
  const shopId = useSelector((state) => state.auth?.user?.shop);
  const { shop, isFetching } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShopOrders(shopId));
    dispatch(fetchShopDetails(shopId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopId]);

  useEffect(() => {
    dispatch(fetchShopDetails(shopId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    shopOrders?.others?.filter(
      (order) => order?.status?.toLowerCase() !== "completed"
    );

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
              {isFetching ? 0 : shopOrders ? shopOrders?.dueToday?.length : 0}
            </div>
          </div>
          <div className="cards-container">
            {isFetching ? (
              <TaskCard
                title={`Loading...`}
                desc={`Please wait as we get you all the orders here`}
              />
            ) : shopOrders && shopOrders?.dueToday?.length < 1 ? (
              <TaskCard
                title={`No Orders due today!`}
                desc={`All orders due today will appear here`}
              />
            ) : (
              shopOrders?.dueToday?.map((order) => {
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
              {isFetching
                ? 0
                : shopOrders
                ? shopOrders?.dueThisWeek?.length
                : 0}
            </div>
          </div>
          <div className="cards-container">
            {isFetching ? (
              <TaskCard
                title={`Loading...`}
                desc={`Please wait as we get you all the orders here`}
              />
            ) : shopOrders && shopOrders?.dueThisWeek?.length < 1 ? (
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
            <div className="badge">
              {isFetching ? 0 : shopOrders ? OtherOrders?.length : 0}
            </div>
          </div>
          <div className="cards-container">
            {isFetching ? (
              <TaskCard
                title={`Loading...`}
                desc={`Please wait as we get you all the orders here`}
              />
            ) : shopOrders && OtherOrders?.length < 1 ? (
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
            <div className="badge">
              {shopOrders ? completedOrders?.length : 0}
            </div>
          </div>
          <div className="cards-container">
            {isFetching ? (
              <TaskCard
                title={`Loading...`}
                desc={`Please wait as we get you all the orders here`}
              />
            ) : shopOrders && completedOrders?.length < 1 ? (
              <TaskCard
                title={`No completed orders found!`}
                desc={`Scan the qr code to complete orders`}
              />
            ) : (
              shopOrders &&
              completedOrders?.map((order) => {
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
