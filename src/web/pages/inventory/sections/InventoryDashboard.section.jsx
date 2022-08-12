import { React, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, HeadingButton, Heading, Tabs } from "web/components";

import "./InventoryDashboard.styles.scss";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export const InventoryDashboard = ({ setCurrentScreen, t }) => {
  const navigate = useNavigate();
  const query = useQuery();

  const backFrom = query.get("backFrom");
  return (
    <div className="inventory-dashboard">
      <div className="inventory-dashboard__profile">
        <div className="inventory-dashboard__profile-avatar">
          <Avatar height={102} width={102} img="/img/player/1.png" />
          <div className="inventory-dashboard__profile-avatar-text">
            <Heading customClass="inventory-dashboard__profile-avatar-text-heading">
              Andre’s Awesome Pro Racquets
            </Heading>
          </div>
        </div>
        <div className="inventory-dashboard__profile-close">
          <HeadingButton
            close
            height="48px"
            width="48px"
            onClick={() => {
              if (backFrom === "tasks") {
                navigate("/tasks");
              }
            }}
          />
        </div>
      </div>

      <div className="inventory-dashboard__menu">
        <Tabs
          tabs={[
            {
              title: "Your Orders",
              icon: "/img/drawer/tick-circle.png",
              onClick: () => navigate("/tasks"),
            },
            {
              title: "Shop Settings",
              icon: "/img/drawer/shop.png",
              onClick: () => setCurrentScreen("proshop"),
            },
            {
              title: "Inventory",
              icon: "/img/drawer/orders.png",
              onClick: () => setCurrentScreen("inventory"),
            },
            {
              title: "Payment Methods",
              icon: "/img/drawer/payment.png",
              onClick: () => setCurrentScreen("payment"),
            },
            { title: "Logout", icon: "/img/drawer/logout.png" },
          ]}
        />
      </div>
    </div>
  );
};
