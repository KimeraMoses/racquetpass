import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form';
import { useNavigate } from 'react-router-dom';

import {
  Heading,
  Description,
  SubHeading,
  CustomInput,
  SubmitButton,
  AccountButton,
} from 'web/components';
import './Done.styles.scss';

export const Done = ({ t, setStep, setDone }) => {
  const links = [
    { path: '#', title: t('homePP') },
    { path: '#', title: t('homeCU') },
  ];
  const navigate = useNavigate();
  return (
    <>
      <div className="done">
        <div>
          <div className="mt-[100px]">
            <h5 className="text-white text-[24px] font-semibold text-center">
              Order Submitted!
            </h5>
            <p className="text-white text-[18px] font-normal text-center mt-[20px] mb-[34px]">
              We've sent you a text confirming your order details.{' '}
              <Link to="" className="underline">
                Didn't get a text?
              </Link>
            </p>
            <div className="flex flex-col items-center gap-[12px]">
              <button
                onClick={() => navigate('/')}
                className="bg-[#044794] text-white text-[18px] w-full h-[59px] rounded-[12px]"
              >
                Back to Homepage
              </button>
              <button
                onClick={() => {
                  setDone(false);
                  setStep(8);
                }}
                className="bg-[rgba(255,255,255,0.21)] text-white text-[18px] w-full h-[59px] rounded-[12px]"
              >
                View Order Details
              </button>
            </div>
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
};

export function DoneOld({ t }) {
  const [passwordFieldType, setPasswordFieldType] = useState('password');

  const links = [
    { path: '#', title: t('homePP') },
    { path: '#', title: t('homeCU') },
  ];
  const navigate = useNavigate();
  return (
    <>
      <div className="done">
        <div>
          <div className="done__button">
            <button
              className="done__button-btn"
              onClick={() => navigate('/login')}
            >
              {t('homeSignin')}
            </button>
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
              placeholder="Password"
              component={CustomInput}
              switchPasswordShow={() => {
                if (passwordFieldType === 'password') {
                  setPasswordFieldType('text');
                } else {
                  setPasswordFieldType('password');
                }
              }}
              type={passwordFieldType}
              isPasswordField
              // Validate with Backend
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
