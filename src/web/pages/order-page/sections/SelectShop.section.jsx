import { Link } from 'react-router-dom';
// Custom Components
import {
  Heading,
  Description,
  HeadingButton,
  CustomInput,
} from 'web/components';

// Styles
import './SelectShop.styles.scss';

export function SelectShop({ t }) {
  return (
    <>
      <div className="shop-section">
        <div className="shop-section__heading">
          <Heading>{t('odrShopHeading')}</Heading>
          <HeadingButton close />
        </div>
        <div className="shop-section__text-container">
          <Description customClass="shop-section__text-container-text">
            {t('odrShopDesc')}
          </Description>
        </div>
        <div className="shop-section__search-container">
          <CustomInput
            icon="/img/orderpage/search.png"
            label="Search By Name, City Or State"
            noLabel
          />
        </div>
        <div className="shop-section__account-container">
          <Description customClass="shop-section__account-container-text">
            {t('odrAccount')} &nbsp;
            <Link to="#">
              <span
                style={{ textDecoration: 'none !important', color: '#304FFE' }}
              >
                {t('odrSignIn')}
              </span>
            </Link>
          </Description>
        </div>
      </div>
    </>
  );
}
