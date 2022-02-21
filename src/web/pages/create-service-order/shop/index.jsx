import React from 'react'
import { withNamespaces } from 'react-i18next';
import { MenuButton } from 'web/components';
import { CustomButton } from 'web/components';
import './index.styles.scss';

const Shop = ({ t }) => {
  return (
    <div className='change-shop-container'>
      <div className='header-row'>
				<MenuButton>
					<a href="/CreateOrder/Payment">
          	<img alt="Menu Icon" src="../svg/arrowLeft.svg" />
					</a>
        </MenuButton>
        <h1 className='header-row-heading'>{t('changeShopHeading')}</h1>
      </div>
			<div className='shop-details-body'>
				<h2 className='shop-title'>{t('changeShopTitle')}</h2>
				<form className='search-shop-form'>
					<div className='input-container'>
						<img alt="Search Icon" src="../svg/search.svg" />
						<input className='form-input' type="text" placeholder={t('changeShopSearchInputPlaceholder')} />
					</div>
				</form>
			</div>
			<div className='bg-image'>
				<img alt="Racquet" src="../img/orders/racquet.png" />
			</div>
    </div>
  )
}

export default withNamespaces()(Shop);