import { Field } from 'redux-form';

import {
  Heading,
  HeadingButton,
  Description,
  SubmitButton,
  CustomInput,
} from 'web/components';

import './RequestChange.styles.scss';

export function RequestChange({ t, isAddress, setCurrentScreen }) {
  return (
    <>
      <div className="edit-name">
        <div>
          <div className="edit-name__heading">
            {isAddress ? (
              <Heading>{t('RequestAddressChnage')}</Heading>
            ) : (
              <Heading>{t('editNameRequest')}</Heading>
            )}
            <HeadingButton close onClick={() => setCurrentScreen('editShop')} />
          </div>
          <div className="edit-name__text">
            {isAddress ? (
              <>
                <Description>{t('RequestAddressText')}</Description>
              </>
            ) : (
              <>
                <Description>{t('editText')}</Description>
              </>
            )}
          </div>
          <div className="edit-name__form">
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
                type="text"
                component={CustomInput}
              />
            )}
          </div>
        </div>
        <div className="edit-name__button">
          <SubmitButton onClick={() => setCurrentScreen('editShop')}>
            {t('submitRequest')}
          </SubmitButton>
        </div>
      </div>
    </>
  );
}
