
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

import { Button } from 'web/components';
import './home.styles.scss';

function Home({ t }) {
  const links = [
    { path: '#', title: t('homePP') },
    { path: '#', title: t('homeCU') },
  ];
  return (
    <>
      <div className="home-container">
        <div>
          <div className="home-container__button-container">
            <button className="home-container__button-container-signin">
              {t('homeSignin')}
            </button>
          </div>
          <div className="banner-container">
            <h1 className="banner-container__heading">{t('homeHeading')}</h1>
            <p className="banner-container__text">{t('homeDesc')}</p>
          </div>
          <div className="banner-button-container">
            <Button isDark>{t('homeDarkBtn')}</Button>
            <Button>{t('homeLightBtn')}</Button>
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
