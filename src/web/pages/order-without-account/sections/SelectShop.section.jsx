import { Link } from 'react-router-dom';
// Custom Components
import {
  Heading,
  Description,
  HeadingButton,
  CustomInput,
} from 'web/components';
import { BackButton } from 'web/components/Buttons/BackButton.component';

// Styles
import './SelectShop.styles.scss';

export function SelectShop({ t, setStep }) {
  return (
    <>
      <div className="shop-section-wa">
        <div className="shop-section-wa__heading">
          <BackButton
            onClick={() => {
              setStep(0);
            }}
          />
          <Heading>{t('odrShopHeading')}</Heading>
        </div>
        <div className="shop-section-wa__text-container">
          <Description customClass="shop-section-wa__text-container-text">
            {t('odrShopDesc')}
          </Description>
        </div>
        <div className="shop-section-wa__search-container">
          <CustomInput
            icon="/img/orderpage/search.png"
            label="Search By Name, City Or State"
            noLabel
            onClick={() => {
              setStep(3);
            }}
          />
        </div>
        {/* <div className="shop-section-wa__account-container">
          <Description customClass="shop-section-wa__account-container-text">
            {t('odrAccount')} &nbsp;
            <Link to="/login">
              <span
                style={{ textDecoration: 'none !important', color: '#304FFE' }}
              >
                {t('odrSignIn')}
              </span>
            </Link>
          </Description>
        </div> */}
      </div>
    </>
  );
}
