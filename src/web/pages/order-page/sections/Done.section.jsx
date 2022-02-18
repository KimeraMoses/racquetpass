import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import { Field } from 'redux-form';

import {
  Button,
  Heading,
  Description,
  SubHeading,
  CustomInput,
  SubmitButton,
  AccountButton,
} from 'web/components';
import './Done.styles.scss';

export function Done({ t }) {
  const links = [
    { path: '#', title: t('homePP') },
    { path: '#', title: t('homeCU') },
  ];
  return (
    <>
      <div className="done">
        <div>
          <div className="done__button">
            <button className="done__button-btn">{t('homeSignin')}</button>
          </div>
          <div className="done__banner">
            <Heading customClass="done__banner-heading">
              {t('odrDoneHeading')}
            </Heading>
            <Description customClass="done__banner-text">
              {t('odrDoneDesc')}
            </Description>
            <SubHeading customClass="done__banner-bold">
              {t('odrDoneText')}
            </SubHeading>
          </div>
          <div className="done__list">
            <ul>
              <li>{t('odrList1')}</li>
              <li>{t('odrList2')}</li>
              <li>{t('odrList3')}</li>
            </ul>
          </div>
          <div className="done__form">
            <Field
              name="password"
              label="Password"
              type="password"
              component={CustomInput}
            />
            <SubmitButton type="submit" className="done__form-submit-btn">
              {t('odrCreateBtn')}
            </SubmitButton>
          </div>
          <div className="done__option">
            <div className="done__option-line"></div>
            <div>
              <SubHeading customClass="done__option-txt">
                {t('odrContineWith')}
              </SubHeading>
            </div>
            <div className="done__option-line"></div>
          </div>
          <div className="done__buttons">
            <AccountButton facebook />
            <AccountButton google />
            <AccountButton apple />
          </div>
          <div className="done__statement">
            <Description customClass="done__statement-txt">
              {t('odrPivacyText')}
              <span className="done__statement-txt-bold">
                {t('odrTermsBold')}
              </span>
              &nbsp;
              {t('odrPrivacyAnd')}
              &nbsp;
              <span className="done__statement-txt-bold">
                {t('odrPrivacyBold')}
              </span>
            </Description>
          </div>
        </div>
        <div>
          <div className="done__footer">
            {links.map((link, index) => (
              <Link className="done__footer-link" key={index} to={link.path}>
                {link.title}
              </Link>
            ))}
          </div>
          <div className="done__image">
            <img
              className="done__image-img"
              src="img/homepage/racquet.png"
              alt="racquet"
            />
          </div>
        </div>
      </div>
    </>
  );
}
