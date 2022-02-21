import React from 'react';
import { withNamespaces } from 'react-i18next';
import { MenuButton } from 'web/components';
import { CustomButton } from 'web/components';
import './index.styles.scss';

function StringDetails({ t }) {
  return (
    <div className='string-details-container'>
      <div className='header-row'>
				<MenuButton>
					<a href="/CreateOrder/Payment">
          	<img alt="Menu Icon" src="../svg/arrowLeft.svg" />
					</a>
        </MenuButton>
        <h1 className='header-row-heading'>{t('stringDetailsHeading')}</h1>
      </div>
			<div className='string-details-body'>
				<form className='string-account-form'>
					<div>
						<div className='input-container'>
							<label className='input-label'>{t('stringDetailsTypeLabel')}</label>
							<input className='form-input' type="text" placeholder={t('stringDetailsTypePlaceholder')} />
							<p className='label-text'>{t('stringDetailsTypeSelect')}</p>
						</div>
						<div className='input-container'>
							<label className='input-label'>
								{t('stringDetailsTensionLabel')}
								<p>{t('stringDetailsTensionUnit')}</p>
							</label>
							<input className='form-input' type="text" placeholder={t('stringDetailsTensionPlaceholder')} />
						</div>
						<div className='hybrid-row'>{t('stringDetailsHybrid')}</div>
						<div className='price-row'>
							<div className='label'>{t('stringDetailsPriceLabel')}</div>
							<div className='desc'>{t('stringDetailsPriceValue')}</div>
						</div>
					</div>
					<div className='btn-container'>
						<CustomButton size='lg' btn='primary'>
							<a href='/CreateOrder/Payment'>{t('stringDetailsSave')}</a>
						</CustomButton>
					</div>
				</form>
			</div>
			<div className='bg-image'>
				<img alt="Racquet" src="../img/orders/racquet.png" />
			</div>
    </div>
  );
}

export default withNamespaces()(StringDetails);
