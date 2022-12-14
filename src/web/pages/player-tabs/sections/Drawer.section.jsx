import { React, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Avatar, HeadingButton, Heading, Tabs } from 'web/components';

import './Drawer.styles.scss';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export const Drawer = ({ t, setCurrent }) => {
  const backFrom = useQuery().get('backFrom');

  const navigate = useNavigate();
  const tabs = [
    {
      title: 'My Locker',
      icon: '/img/drawer/locker.png',
      onClick: () => setCurrent('locker'),
    },
    {
      title: 'Pro Shops',
      description: 'Home Shop: Jimmy’s Pro Shop',
      onClick: () => setCurrent('shop'),
      icon: '/img/drawer/shop.png',
    },
    {
      title: 'Orders',
      icon: '/img/drawer/orders.png',
      onClick: () => setCurrent('orderDetails'),
      orders: [
        {
          title: 'Ole Reliable',
          description: 'Pickup at Jimmy’s Pro Shop',
          status: 'Ready for pickup',
        },
        {
          title: 'Why did you make this',
          description: 'Available in 3-5 days',
          status: 'In progress',
        },
      ],
    },
    {
      title: 'Payment Methods',
      icon: '/img/drawer/payment.png',
      onClick: () => setCurrent('payment'),
    },
    {
      title: 'Account Details',
      icon: '/img/drawer/account.png',
      onClick: () => setCurrent('accountDetails'),
    },
    {
      title: 'Logout',
      icon: '/img/drawer/logout.png',
      onClick: () => navigate('/login'),
    },
  ];

  return (
    <div className="drawer">
      <div className="drawer__profile">
        <div></div>

        <div className="drawer__profile-avatar">
          <Avatar height={102} width={102} img="/img/player/1.png" />
          <div className="drawer__profile-avatar-text">
            <Heading customClass="drawer__profile-avatar-text-heading">
              Mannan Cheema
            </Heading>
            <div
              onClick={() => setCurrent('profile')}
              className="drawer__profile-avatar-text-link"
            >
              View Profile
            </div>
          </div>
        </div>

        <div className="drawer__close">
          <HeadingButton
            close
            onClick={() =>
              backFrom === 'CreateOrder'
                ? navigate('/CreateOrder/Locker')
                : setCurrent('locker')
            }
          />
        </div>
      </div>

      <div className="drawer__menu">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};
