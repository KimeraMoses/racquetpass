import React from 'react';
import { withNamespaces } from 'react-i18next';
import { MenuButton } from 'web/components';
import { CustomButton } from 'web/components';
import './index.styles.scss';

function BusinessDetails({ t }) {
  return (
    <div className='business-details-container'>
      <div className='header-row'>
				<MenuButton>
					<a href="/BusinessAccount/VerifyPhone">
          	<img alt="Menu Icon" src="../svg/arrowLeft.svg" />
					</a>
        </MenuButton>
        <h1 className='header-row-heading'>{t('businessAccountDetailHeading')}</h1>
      </div>
			<div className='business-details-description'>{t('businessAccountDetailDescription')}</div>
			<div className='business-details-body'>
				<form className='business-account-form'>
					<div>
						<div className='input-container'>
							<label className='input-label'>{t('businessAccountDetailStreetLabel')}</label>
							<input className='form-input' type="text" placeholder={t('businessAccountDetailStreetPlaceHolder')} />
						</div>
						<div className='input-container'>
							<label className='input-label'>{t('businessAccountDetailSuiteLabel')}</label>
							<input className='form-input' type="text" placeholder={t('businessAccountDetailSuitePlaceHolder')} />
						</div>
						<div className='input-container'>
							<label className='input-label'>{t('businessAccountDetailStateLabel')}</label>
							<input className='form-input' type="text" placeholder={t('businessAccountDetailStatePlaceHolder')} />
						</div>
						<div className='input-container'>
							<label className='input-label'>{t('businessAccountDetailZipLabel')}</label>
							<input className='form-input' type="number" placeholder={t('businessAccountDetailZipPlaceHolder')} />
						</div>
					</div>
					<div className='btn-container'>
						<CustomButton size='lg' btn='primary'><a href='/BusinessAccount/CreatePassword'>{t('businessAccountDetailNextBtn')}</a></CustomButton>
					</div>
				</form>
			</div>
    </div>
  );
}

export default withNamespaces()(BusinessDetails);
