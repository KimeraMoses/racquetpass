import React from 'react';
import { withNamespaces } from 'react-i18next';
import { MenuButton } from 'web/components';
import { CustomButton } from 'web/components';
import './index.styles.scss';

function Create({ t }) {
  return (
    <div className='create-account-container'>
      <div className='header-row'>
				<MenuButton>
					<a href="/BusinessAccount">
          	<img alt="Menu Icon" src="../svg/arrowLeft.svg" />
					</a>
        </MenuButton>
        <h1 className='header-row-heading'>{t('createBusinessAccountHeading')}</h1>
				<CustomButton size='sm' btn='white'><a href='/BusinessAccount'>{t('accountSignIn')}</a></CustomButton>
      </div>
			<div className='create-account-description'>{t('createBusinessAccountDescription')}</div>
			<div className='create-account-body'>
				<form className='business-account-form'>
					<div className='input-container'>
						<label className='input-label'>{t('createBusinessAccountShopLabel')}</label>
						<input className='form-input' type="text" placeholder={t('createBusinessAccountShopPlaceholder')} />
					</div>
					<div className='input-container'>
						<label className='input-label'>{t('createBusinessAccountPhoneLabel')}</label>
						<input className='form-input' type="number" placeholder={t('createBusinessAccountPhonePlaceholder')} />
					</div>
					<div className='input-container'>
						<label className='input-label'>{t('createBusinessAccountEmailLabel')}</label>
						<input className='form-input' type="email" placeholder={t('createBusinessAccountEmailPlaceholder')} />
					</div>
					<div className='btn-container'>
						<CustomButton size='lg' btn='primary'><a href='/BusinessAccount/VerifyPhone'>{t('createBusinessAccountContinueBtn')}</a></CustomButton>
					</div>
				</form>
				<div className='other-options'>
					<div className='line'></div>
					<div className='text'>{t('createBusinessAccountContinueText')}</div>
					<div className='line'></div>
				</div>
				<div className='facebook-btn'>
					<CustomButton size='lg' btn='primary'>
						{t('createBusinessAccountContinueWithFacebook')}
						<img className='icon' alt="Menu Icon" src="../svg/facebook.svg" />
					</CustomButton>
				</div>
				<div className='google-btn'>
					<CustomButton size='lg' btn='primary'>
						{t('createBusinessAccountContinueWithGoogle')}
						<img className='icon' alt="Menu Icon" src="../svg/google.svg" />
					</CustomButton>
				</div>
				<div className='apple-btn'>
					<CustomButton size='lg' btn='primary'>
						{t('createBusinessAccountContinueWithApple')}
						<img className='icon' alt="Menu Icon" src="../svg/apple.svg" />
					</CustomButton>
				</div>
				<div className='privacy-policy'>
					{t('createBusinessAccountPolicyDescription')}
					<span>{t('createBusinessAccountTerms')}</span>
					{t('createBusinessAccountPolicySpace')}
					<span>{t('createBusinessAccountPolicy')}</span>
				</div>
			</div>
    </div>
  );
}

export default withNamespaces()(Create);
