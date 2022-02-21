import React from 'react'
import { withNamespaces } from 'react-i18next';
import { MenuButton } from 'web/components';
import './index.styles.scss';

const ShopSearching = ({ t }) => {
  return (
    <div className='shop-searching-container'>
			<div className='shop-seaching-details-body'>
				<form className='search-shop-form'>
					<div className='input-container'>
						<img className='search-icon' alt="Search Icon" src="../svg/search.svg" />
						<input className='form-input' type="text" value={"Joe's Tenni"} placeholder={t('changeShopSearchInputPlaceholder')} />
						<span className='cancel-search-icon'><img alt="Cancel Search" src="../svg/closeBold.svg" /></span>
						<a className='cancel-link'>Cancel</a>
					</div>
				</form>
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
			</div>
    </div>
  )
}

export default withNamespaces()(ShopSearching);