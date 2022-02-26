import { Field } from 'redux-form';

import {
  BackButton,
  Heading,
  CustomInput,
  SubmitButton,
  Description,
} from 'web/components';

import './CancelRequest.styles.scss';

export function CancelRequest({ t, isAddress, setCurrentScreen }) {
  return (
    <>
      <div className="change">
        <div className="">
          <div className="change__header">
            <BackButton onClick={() => setCurrentScreen('editShop')} />
            {isAddress ? (
              <Heading>{t('cancelAddressHeading')}</Heading>
            ) : (
              <Heading>{t('changeName')}</Heading>
            )}
          </div>
          <div className="change__text">
            <Description customClass="change__text-txt">
              {t('requestPending')}
            </Description>
          </div>
          <div className="change__form">
            {isAddress ? (
              <>
                <Field
                  name="street-address"
                  label="Street"
                  type="text"
                  component={CustomInput}
                />
                <Field
                  name="apt-suite"
                  label="Apt, suite, etc (optional)"
                  placeholder="Apt, suite, etc"
                  type="text"
                  component={CustomInput}
                />
                <Field
                  name="state"
                  label="state"
                  type="text"
                  component={CustomInput}
                />
                <Field
                  name="zip-code"
                  label="ZIP Code"
                  placeholder="ZIP`"
                  type="text"
                  component={CustomInput}
                />
              </>
            ) : (
              <Field
                name="new-name"
                label="New Name"
                placeholder="Andre’s Even More Awesome Racquets"
                type="text"
                component={CustomInput}
              />
            )}
          </div>
        </div>
        <div className="change__button">
          <SubmitButton
            className="change__button-btn"
            onClick={() => setCurrentScreen('editShop')}
          >
            {t('cancelRequest')}
          </SubmitButton>
        </div>
      </div>
    </>
  );
}
