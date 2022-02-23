import { HeadingButton, Heading, Description } from 'web/components';
import './InventoryDashboard.styles.scss';

export function InventoryDashboard({ t }) {
  const profilelist = [
    {
      icon: '/img/inventory/shop.png',
      text: `{t('businessAccountDetailsShop')}`,
    },
    {
      icon: '/img/inventory/box.png',
      text: `{t('businessAccountDetailsInventory')}`,
    },
    {
      icon: '/img/inventory/logout.png',
      text: `{t('businessAccountDetailsLogout')}`,
    },
  ];
  return (
    <>
      <div className="inventory-dashboard">
        <div className="inventory-dashboard__header">
          <div className="inventory-dashboard__header-placeholder"></div>
          <div className="inventory-dashboard__header-image">
            <img
              src="/img/inventory/profile-pic.png"
              alt="profile-picture"
              className="inventory-dashboard__header-image-img"
            />
          </div>
          <div className="inventory-dashboard__header-button">
            <HeadingButton close />
          </div>
        </div>
        <div className="inventory-dashboard__heading">
          <Heading>{t('businessAccountDetailsHeading')}</Heading>
        </div>
        {/* <ul className="inventory-dashboard__list">
          {profilelist.map(({ icon, text }) => (
            <li key={icon} className="inventory-dashboard__list-item">
              <img src={icon} alt="icon" />
              <Description>{text}</Description>
            </li>
          ))}
        </ul> */}

        <ul className="inventory-dashboard__list">
          <li className="inventory-dashboard__list-item">
            <img src="/img/inventory/shop.png" alt="icon" />
            <Description>{t('businessAccountDetailsShop')}</Description>
          </li>
          <li className="inventory-dashboard__list-item">
            <img src="/img/inventory/box.png" alt="icon" />
            <Description>{t('businessAccountDetailsInventory')}</Description>
          </li>
          <li className="inventory-dashboard__list-item">
            <img src="/img/inventory/logout.png" alt="icon" />
            <Description>{t('businessAccountDetailsLogout')}</Description>
          </li>
        </ul>
      </div>
    </>
  );
}
