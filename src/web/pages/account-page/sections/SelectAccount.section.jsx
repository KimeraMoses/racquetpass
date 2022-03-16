import { useEffect, useState } from 'react';
import { Field } from 'redux-form';
import { useNavigate } from 'react-router-dom';

import { BackButton, Heading, AccountCard } from 'web/components';

import './SelectAccount.styles.scss';

export function SelectAccount({ t, back, forward, change, moveToLogin }) {
  const [accountType, setAccountType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (accountType) {
      change('account-type', accountType);
      forward();
    }
  }, [accountType]);

  return (
    <>
      <div className="select-account">
        <div className="select-account__header-container">
          <div className="select-account__header-container-heading">
            <BackButton onClick={back} />
            <Heading>{t('odrCreateBtn')}</Heading>
          </div>
          <div className="select-account__button-container">
            <button
              className="select-account__button-container-btn"
              onClick={moveToLogin}
            >
              {t('homeSignin')}
            </button>
          </div>
        </div>
        <div className="select-account__card-container">
          <AccountCard
            heading="I'm a Player"
            description="Get started with a new account as a player."
            img="/img/accountpage/Image.png"
            onClick={() => {
              setAccountType('player');
            }}
          />
          <AccountCard
            heading="I'm a Stringer"
            description="Get started with a new account as a stringer."
            img="/img/accountpage/stringer.png"
            onClick={() => {
              navigate('/BusinessAccount/create');
            }}
          />
        </div>
        <Field
          name="account-type"
          component="input"
          style={{ visibility: 'hidden' }}
        />
      </div>
    </>
  );
}
