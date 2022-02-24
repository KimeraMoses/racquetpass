import { React } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, HeadingButton, Heading, Tabs } from 'web/components';

import './InventoryDashboard.styles.scss';

export const InventoryDashboard = ({setCurrentScreen, t}) => {
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
          <HeadingButton close height="48px" width="48px" />
        </div>
      </div>

      <div className="inventory-dashboard__menu">
        <Tabs
          tabs={[
            {
              title: 'My Pro Shop',
              icon: '/img/drawer/shop.png',
              onClick: () => setCurrentScreen('proshop'),
            },
            {
              title: 'Inventory',
              icon: '/img/drawer/orders.png',
              onClick: () => setCurrentScreen('inventory'),
            },
            { title: 'Logout', icon: '/img/drawer/logout.png' },
          ]}
        />
      </div>
    </div>
  );
};
