import React from 'react';
import { withNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MenuButton } from 'web/components';
import './index.styles.scss';

function VerifyBusiness({ t }) {
  return (
    <div className="verify-business-container">
      <div>
        <div className="header-row">
          <MenuButton>
            <Link to="/inventory">
              <img alt="Menu Icon" src="../svg/hamburgerMenu.svg" />
            </Link>
          </MenuButton>
          <h1 className="header-row-heading">
            {t('verifyBusinessAccountBusinessHeading')}
          </h1>
        </div>

        {/* <div className='verify-business-desc'>{t('verifyBusinessAccountBusinessDescription')}</div> */}
        <div className="verify-business-body">
          <div>
            <p className="verify-business-body-text">
              Thank you for signing up with RacquetPass! We’ll email you a link
              to activate and access your account.
            </p>
            <div className="verify-business-body-link">Resend</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withNamespaces()(VerifyBusiness);
