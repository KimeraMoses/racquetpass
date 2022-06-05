import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import {
  MenuButton,
  CustomInput,
  CustomButton,
  CustomSelect,
} from 'web/components';
import './index.styles.scss';

let BusinessDetails = ({ t }) => {
  return (
    <div className="business-details-container">
      <div className="header-row">
        <MenuButton>
          <Link to="/BusinessAccount/VerifyPhone">
            <img alt="Menu Icon" src="../svg/arrowLeft.svg" />
          </Link>
        </MenuButton>
        <h1 className="header-row-heading">
          {t('businessAccountDetailHeading')}
        </h1>
      </div>
      <div className="business-details-description">
        {t('businessAccountDetailDescription')}
      </div>
      <div className="business-details-body">
        <form className="business-account-form">
          <div className="business-account-fields">
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
            <div className="business-account-fields-cs">
              <Field
                name="city"
                label="City"
                type="text"
                component={CustomInput}
              />
              <Field
                name="state"
                label="State"
                placeholder="Select"
                component={CustomSelect}
                options={[
                  { label: 'Option 1', value: 'Option 1' },
                  { label: 'Option 2', value: 'Option 2' },
                ]}
              />
            </div>
            <Field
              name="zip-code"
              label="ZIP Code"
              placeholder="ZIP`"
              type="text"
              component={CustomInput}
            />
          </div>
          <div className="btn-container">
            <CustomButton size="lg" btn="primary">
              <Link to="/BusinessAccount/CreatePassword">
                {t('businessAccountDetailNextBtn')}
              </Link>
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

const onSubmit = (values, dispatch) => {
  // dispatch(    // your submit action //      );
  console.log(values);
};

BusinessDetails = reduxForm({
  // a unique name for the form
  form: 'create-business-account-3',
  onSubmit,
})(BusinessDetails);

export default withNamespaces()(BusinessDetails);
