import React from 'react';
import { withNamespaces } from 'react-i18next';
import { MenuButton } from 'web/components';
import { CustomButton } from 'web/components';
import './index.styles.scss';

function VerifyPhone({ t }) {
  return (
    <div className='verify-phone-container'>
			<div>
				<div className='header-row'>
					<MenuButton>
						<a href="/BusinessAccount/Create">
							<img alt="Menu Icon" src="../svg/arrowLeft.svg" />
						</a>
					</MenuButton>
					<h1 className='header-row-heading'>{t('verifyBusinessAccountPhoneHeading')}</h1>
				</div>
				<div className='verify-phone-body'>
					<div className='phone-input-container'>
						<label className='input-label'>{t('verifyBusinessAccountPhoneCodeLabel')}</label>
						<input className='form-input' type="email" placeholder={t('verifyBusinessAccountPhoneCodePlaceHolder')} />
					</div>
					<div className='verify-desc'>{t('verifyBusinessAccountPhoneCodeDescription')}</div>
					<a className='resend-link' href="/">{t('verifyBusinessAccountPhoneCodeResend')}</a>
				</div>
			</div>
			<div className='btn-container'>
				<CustomButton size='lg' btn='primary'><a href='/BusinessAccount/BusinessDetails'>{t('verifyBusinessAccountPhoneNextBtn')}</a></CustomButton>
			</div>
    </div>
  );
}

export default withNamespaces()(VerifyPhone);
