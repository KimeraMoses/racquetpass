import React from 'react';
import { withNamespaces } from 'react-i18next';
import { MenuButton } from 'web/components';
import './index.styles.scss';

function VerifyBusiness({ t }) {
  return (
    <div className='verify-business-container'>
			<div>
				<div className='header-row'>
					<MenuButton>
						<a href="/BusinessAccount/ProfileInfo">
							<img alt="Menu Icon" src="../svg/hamburgerMenu.svg" />
						</a>
					</MenuButton>
					<h1 className='header-row-heading'>{t('verifyBusinessAccountBusinessHeading')}</h1>
				</div>
				<div className='verify-business-desc'>{t('verifyBusinessAccountBusinessDescription')}</div>
				<div className='verify-business-body'>
					<div className='phone-input-container'>
						<label className='input-label'>{t('verifyBusinessAccountBusinessCodeLabel')}</label>
						<input className='form-input' type="email" placeholder={t('verifyBusinessAccountBusinessCodePlaceHolder')} />
					</div>
					<div className='verify-desc'>{t('verifyBusinessAccountBusinessCodeDescription')}</div>
				</div>
			</div>
    </div>
  );
}

export default withNamespaces()(VerifyBusiness);
