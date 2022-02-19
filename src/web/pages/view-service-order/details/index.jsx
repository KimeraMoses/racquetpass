import React from 'react';
import { withNamespaces } from 'react-i18next';
import { MenuButton } from 'web/components';
import { CustomButton } from 'web/components';
import { ServiceOrderStatus } from 'web/components';
import './index.styles.scss';
          
function OrderDetails({ t }) {
  return (
    <div className='order-detail-container'>
      <div>
        <div className='header-row'>
          <MenuButton>
            <a href="/ServiceOrder/View">
              <img alt="Menu Icon" src="../svg/arrowLeft.svg" />
            </a>
          </MenuButton>
          <h1 className='header-row-heading'>{t('orderOpenedHeading')}</h1>
        </div>
        <div className='status-container'>
          <ServiceOrderStatus state="partial" status={true} t={t}>     
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="9" viewBox="0 0 13 9" fill="none">
              <path d="M1.3645 4.49966L4.78408 7.91924L11.6353 1.08008" stroke="#304FFE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ServiceOrderStatus>
        </div>
        <div className='pickup'>{t('orderOpenedPickup')} <b>{t('orderOpenedPickupName')}</b></div>
        <div className='detail-body-container'>
          <div className='racquet-info'>
            <img className='img' alt="racquet" src='../img/tasks/racquet.png'/>
            <div className='brand'>
              <div className='model'>{t('orderOpenedBrand')}</div>
              <div className='title'>{t('orderOpenedBrandTitle')}</div>
            </div>
          </div>
          <div className='string-details'>
            <div className='title'>{t('orderOpenedStringTitle')}</div>
            <div className='string-label'>{t('orderOpenedStringMainsHeading')}</div>
            <div className='string-desc'>{t('orderOpenedStringMainsDesc')}</div>
            <div className='string-label'>{t('orderOpenedStringCrossesHeading')}</div>
            <div className='string-desc'>{t('orderOpenedStringCrossesDesc')}</div>
          </div>
          <div className='shop-details'>
            <div className='title-row'>
              <div className='title'>{t('orderOpenedShopTitle')}</div>
            </div>
            <div className='shop-label'>{t('orderOpenedShopNameHeading')}</div>
            <div className='shop-desc'>{t('orderOpenedShopName')}</div>
            <div className='shop-label'>{t('orderOpenedShopAddressHeading')}</div>
            <div className='shop-desc'>{t('orderOpenedShopAddress')}<br/>{t('orderOpenedShopAddress1')}</div>
            <div className='shop-label'>{t('orderOpenedShopPhoneHeading')}</div>
            <div className='shop-desc'>
              <a href="/">{t('orderOpenedShopPhone')}</a>
            </div>
          </div>
        </div>
      </div>

      <div>
        <CustomButton size="lg" btn="primary">{t('orderReopenedPickup')}</CustomButton>
      </div>
    </div>
  );
}

export default withNamespaces()(OrderDetails);
