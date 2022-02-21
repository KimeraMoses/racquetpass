import React from 'react';
import { withNamespaces } from 'react-i18next';
import { MenuButton } from 'web/components';
import { CustomButton } from 'web/components';
import './index.styles.scss';
          
function CreateOrderPayment({ t }) {
  return (
    <div className='payment-details-container'>
      <div>
        <div className='header-row'>
          <h1 className='header-row-heading'>{t('orderPaymentHeading')}</h1>
          <MenuButton>
            <a href="/CreateOrder/Details"><img alt="Menu Icon" src="../svg/close.svg" /></a>
          </MenuButton>
        </div>
         <div className='payment-body-container'>
					 <div className='payment-detail-row'>
						 <div className='row-heading'>{t('orderPaymentShopName')}</div>
						 <div className='btn-shop'>
						 	<CustomButton size="sm" btn="white"><a href="/CreateOrder/Shop">{t('orderPaymentShopBtn')}</a></CustomButton>
						 </div>
					 </div>
					 <div className='shop-card'>
						 <div className='icon'>
						 	<img alt="Menu Icon" src="../svg/shop.svg" />
						 </div>
						 <div className='info-box'>
							 <div className='title'>{t('orderPaymentShopHeading')}</div>
							 <div className='desc'>{t('orderPaymentShopTitle')}</div>
						 </div>
						 <div className='card-line'></div>
					 </div>
					 
					 <div className='payment-detail-row'>
						 <div className='row-heading'>{t('orderPaymentRacquetName')}</div>
						 <div className='btn-racquet'>
						 	<CustomButton size="sm" btn="white"><a>{t('orderPaymentRacquetBtn')}</a></CustomButton>
						 </div>
					 </div>
					 <div className='shop-card'>
						 <div className='info-box'>
							 <div className='title'>
								 {t('orderPaymentShopHeading')}
								 <p className='label'>{t('orderPaymentRacquetQR')}</p>
								</div>
							 <div className='desc'>{t('orderPaymentShopTitle')}</div>
						 </div>
						 <div className='card-line'></div>
					 </div>

					 <div className='payment-detail-row'>
						 <div className='row-heading'>{t('orderPaymentSummaryName')}</div>
						 <div className='btn-summary'>
						 	<CustomButton size="sm" btn="white"><a href="/CreateOrder/StringDetails">{t('orderPaymentSummaryBtn')}</a></CustomButton>
						 </div>
					 </div>
					 <div className='summary-card'>
						 <div className='summary-heading'>{t('orderPaymentSummaryHeading')}</div>
						 <div className='summary-desc'>{t('orderPaymentSummaryDesc')}</div>
						 <div className='summary-row'>{t('orderPaymentSummaryLabelMains')}<span className='price'>{t('orderPaymentSummaryLabelPrice')}</span></div>
						 <div className='summary-row'>{t('orderPaymentSummaryLabelCrosses')}<span className='price'>{t('orderPaymentSummaryLabelPrice')}</span></div>
						 <div className='summary-row'>{t('orderPaymentSummaryLabelLabour')}<span className='price'>{t('orderPaymentSummaryLabelPrice')}</span></div>
						 <div className='summary-row'>{t('orderPaymentSummaryLabelTax')}<span className='price'>{t('orderPaymentSummaryLabelPrice')}</span></div>
						 <div className='summary-line'>{t('')}</div>
					 </div>
				 </div>
      </div>
      <div className='btn-container'>
				<div className="apple-btn">
					<CustomButton size="lg" btn="primary">
						<a href="/CreateOrder/Submitted">
							{t('orderPaymentApple')}
							<img alt="Apple Icon" src="../svg/appleIcon.svg" />
							{t('orderPaymentApplePay')}
						</a>
					</CustomButton>
				</div>
				<CustomButton size="lg" btn="white"><a href="/CreateOrder/Submitted">{t('orderPaymentCreditCard')}</a></CustomButton>
      </div>
    </div>
  );
}

export default withNamespaces()(CreateOrderPayment);
