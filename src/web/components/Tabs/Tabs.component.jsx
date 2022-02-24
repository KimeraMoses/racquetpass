import { Fragment } from 'react';
import { OrderCard } from '../OrderCard/OrderCard.component';
import { Link } from 'react-router-dom';
import './Tabs.styles.scss';

export const Tabs = ({
  tabs = [
    { title: 'My Locker', icon: '/img/drawer/locker.png' },
    { title: 'Home Shop', icon: '/img/drawer/shop.png' },
    {
      title: 'Orders',
      icon: '/img/drawer/orders.png',
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
    { title: 'Payment Methods', icon: '/img/drawer/payment.png' },
    { title: 'Account Details', icon: '/img/drawer/account.png' },
    { title: 'Logout', icon: '/img/drawer/logout.png' },
  ],
}) => {
  return (
    <div className="tabs">
      {tabs.map((tab) => {
        return (
          <div
            className="tabs-link"
            key={tab?.title}
            onClick={tab.title !== 'Orders' ? tab?.onClick : () => {}}
          >
            {tab.title !== 'Orders' ? (
              <div className="tabs__tab">
                <img src={tab.icon} alt={tab.title} />
                <p className="tabs__tab-text">{tab.title}</p>
              </div>
            ) : (
              <div className="tabs__tab tabs__tab-order">
                <div className="tabs__tab-order-main">
                  <div className="tabs__tab-order-inner">
                    <img src={tab.icon} alt={tab.title} />
                    <p className="tabs__tab-text">{tab.title}</p>
                  </div>
                  <Link
                    className="tabs__tab-link"
                    onClick={tab.title === 'Orders' ? tab?.onClick : () => {}}
                  >
                    View All
                  </Link>
                </div>
                <div className="tabs__tab-order-orders">
                  {tab.orders.map((order) => {
                    return (
                      <OrderCard
                        title={order?.title}
                        description={order?.description}
                        status={order?.status}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
      {/* <div className="tabs__tab">
        <div className="tabs__tab-inner">
          <img src="/img/drawer/locker.png" alt="locker" />
          <p className="tabs__tab-inner-text">My Locker</p>
        </div>
      </div>
      <div className={`tabs__tab ${orders ? 'tabs__tab-order' : ''}`}>
        <div className="tabs__tab-inner">
          {orders ? (
            <div className="tabs__tab-inner-icon">
              <img src="/img/drawer/orders.png" alt="locker" />
              <p className="tabs__tab-inner-text">Orders</p>
            </div>
          )}
        </div>
      </div>
      <div className="tabs__tab">
        <div className="tabs__tab-inner">
          <img src="/img/drawer/shop.png" alt="locker" />
          <p className="tabs__tab-inner-text">Home Shop</p>
        </div>
      </div> */}
    </div>
  );
};
