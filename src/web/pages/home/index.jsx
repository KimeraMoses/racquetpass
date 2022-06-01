import { Link, useNavigate } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import { Button, CustomInput } from 'web/components';
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
                className="home-container__button-container-buttons-btn"
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
            {/* <CustomInput
              // icon="/img/orderpage/search.png"
              label="Search By Name, City Or State"
              noLabel
              onClick={() => {
                // setShopCurrent('search');
                navigate('/order');
              }}
              style={{ background: 'white' }}
            /> */}
            <Button isDark onClick={() => navigate('/order')}>
              {t('homeLightBtn')}
            </Button>
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
