import { Link, useNavigate } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import { Button, CustomInput, Description } from 'web/components';
import './home.styles.scss';

function Home({ t }) {
  const navigate = useNavigate();
  const links = [
    { path: '#', title: t('homePP') },
    { path: '#', title: t('homeCU') },
  ];
  return (
    <>
      <div className="home-container">
        <div>
          <div className="home-container__button-container">
            <div className="home-container__button-container-text">
              {t('homeLogo')}
            </div>
            <div className="home-container__button-container-buttons">
              <button
                className="home-container__button-container-buttons-btn bg-[#fff]"
                type="button"
                onClick={() => {
                  navigate('/create-account');
                }}
              >
                {t('homeSignup')}
              </button>
            </div>
          </div>
          <div className="banner-container">
            <h1 className="banner-container__heading">{t('homeHeading')}</h1>
          </div>
          <div className="banner-button-container">
            <CustomInput
              label="Find your Pro Shop by Name, City Or State"
              noLabel
              onClick={() => {
                navigate('/order');
              }}
              style={{ background: 'white' }}
            />
            <Button isDark onClick={() => navigate('/order')}>
              {t('homeNewBtnTxt')}
            </Button>
            <button
              className="banner-button-container__btn"
              type="button"
              onClick={() => {
                navigate('/order-without-account');
              }}
            >
              Scan a QR Code
            </button>
            <div className="banner-button-container__text">
              Want to use RacquetPass at your club or shop?{' '}
              <span
                role="button"
                className="banner-button-container__text-imp"
                onClick={() => {
                  navigate('/BusinessAccount/create');
                }}
              >
                Sign up now.
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="footer-container">
            {links.map((link, index) => (
              <Link
                className="footer-container__link-text"
                key={index}
                to={link.path}
              >
                {link.title}
              </Link>
            ))}
          </div>
          <div className="image-container">
            <img
              className="image-container__image"
              src="img/homepage/racquet.png"
              alt="racquet"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default withNamespaces()(Home);
