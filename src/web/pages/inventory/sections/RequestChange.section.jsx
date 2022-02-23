import { Field } from 'redux-form';

import {
  Heading,
  HeadingButton,
  Description,
  SubmitButton,
  CustomInput,
} from 'web/components';

import './RequestChange.styles.scss';

export function RequestChange({ t }) {
  return (
    <>
      <div className="edit-name">
        <div>
          <div className="edit-name__heading">
            {/* <Heading>{t('editNameRequest')}</Heading> */}
            <Heading>{t('RequestAddressChnage')}</Heading>

            <HeadingButton close />
          </div>
          <div className="edit-name__text">
            {/* <Description>{t('editText')}</Description> */}
            <Description>{t('RequestAddressText')}</Description>
          </div>
          <div className="edit-name__form">
            {/* <Field
              name="new-name"
              label="New Name"
              type="text"
              component={CustomInput}
            /> */}

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
          </div>
        </div>
        <div className="edit-name__button">
          <SubmitButton>{t('submitRequest')}</SubmitButton>
        </div>
      </div>
    </>
  );
}
