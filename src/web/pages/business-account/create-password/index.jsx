import React from 'react';
import { withNamespaces } from 'react-i18next';
import { MenuButton } from 'web/components';
import { CustomButton } from 'web/components';
import './index.styles.scss';

function CreatePassword({ t }) {
  return (
    <div className="create-password-container">
      <div className="header-row">
        <MenuButton>
          <a href="/BusinessAccount/BusinessDetails">
            <img alt="Menu Icon" src="../svg/arrowLeft.svg" />
          </a>
        </MenuButton>
        <h1 className="header-row-heading">
          {t('businessAccountPasswordHeading')}
        </h1>
      </div>
      {/* <div className='create-password-description'>{t('businessAccountPasswordDescription')}</div> */}
      <div className="create-password-body">
        <form className="create-password-form">
          <div>
            <div className="input-container">
              <label className="input-label">
                {t('businessAccountPasswordLabel')}
                <a className="link">
                  {t('businessAccountPasswordPlaceHolderHide')}
                </a>
              </label>
              <input
                className="form-input"
                type="text"
                placeholder={t('businessAccountPasswordPlaceHolder')}
              />
              <div className="password-strength">
                <p className="password-strength-weak">
                  {t('businessAccountPasswordWeak')}
                </p>
              </div>
            </div>
            {/* change class weak with weak, average , strong to change password status */}
            <div className="password-strength-status">
              <div className="current-status weak"></div>
            </div>
            <div className="password-recommendations">
              <div className="password-recommendations-title">
                {t('businessAccountPasswordRecommendation')}
              </div>
              <div className="password-recommendations-row">
                <div className="icon">
                  <img alt="Tick" src="/svg/blacktick.svg" />
                </div>
                {t('businessAccountPasswordRecommendationOne')}
              </div>
              <div className="password-recommendations-row">
                <div className="icon">
                  <img alt="Tick" src="/svg/blacktick.svg" />
                </div>
                {t('businessAccountPasswordRecommendationTwo')}
              </div>
              <div className="password-recommendations-row unfulfilled">
                <div className="icon">
                  <img alt="Tick" src="/svg/blacktick.svg" />
                </div>
                {t('businessAccountPasswordRecommendationThree')}
              </div>
              <div className="password-recommendations-row unfulfilled">
                <div className="icon">
                  <img alt="Tick" src="/svg/blacktick.svg" />
                </div>
                {t('businessAccountPasswordRecommendationFour')}
              </div>
              <div className="password-recommendations-row unfulfilled">
                <div className="icon">
                  <img alt="Tick" src="/svg/blacktick.svg" />
                </div>
                {t('businessAccountPasswordRecommendationFive')}
              </div>
            </div>
          </div>
          <div className="btn-container">
            <CustomButton disabled size="lg" btn="primary">
              <a href="/BusinessAccount/VerifyBusiness">
                {t('businessAccountPasswordCreateBtn')}
              </a>
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withNamespaces()(CreatePassword);
