import { OrderCard } from '../OrderCard/OrderCard.component';
import './Tabs.styles.scss';

export const Tabs = ({ tabs, active = 'My Locker' }) => {
  return (
    <div className="tabs">
      {tabs.map((tab) => {
        const { Icon } = tab;
        return (
          <div
            className={`tabs-link ${tab?.active ? 'tabs-link__active' : ''}`}
            key={tab?.title}
            onClick={tab.title !== 'Orders' ? tab?.onClick : () => {}}
          >
            {tab.title !== 'Orders' ? (
              <div className="tabs__tab">
                {Icon ? (
                  <Icon color={tab?.active ? '#304FFE' : '#3B3B3B'} />
                ) : (
                  <img src={'/img/drawer/tick-circle.png'} alt={tab.title} />
                )}
                <p className="tabs__tab-text">
                  {tab.title} <br />{' '}
                  <span className="tabs__tab-text-description">
                    {tab?.description}
                  </span>
                </p>
              </div>
            ) : (
              <div className="tabs__tab tabs__tab-order">
                <div className="tabs__tab-order-main">
                  <div className="tabs__tab-order-inner">
                    {Icon ? (
                      <Icon color={tab?.active ? '#304FFE' : '#3B3B3B'} />
                    ) : (
                      <img
                        src={'/img/drawer/tick-circle.png'}
                        alt={tab.title}
                      />
                    )}
                    <p className="tabs__tab-text">{tab.title}</p>
                  </div>
                  <div
                    className="tabs__tab-link"
                    onClick={tab.title === 'Orders' ? tab?.onClick : () => {}}
                  >
                    View All
                  </div>
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
