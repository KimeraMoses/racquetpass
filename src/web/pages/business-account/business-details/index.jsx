import React, { useEffect, useState } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link, useNavigate } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import {
  MenuButton,
  CustomInput,
  CustomZIPInput,
  // CustomButton,
  CustomSelect,
} from 'web/components';
import './index.styles.scss';
import { SubmitButton } from 'web/components/Buttons/SubmitButton.component';
import { useSelector } from 'react-redux';

const required = (value) => (value ? undefined : 'This field is required');
// ZIP Validation
const zipValidation = (value) => {
  if (value?.length < 3 || value?.length > 7) {
    return 'Please enter value between 3 and 7 digits';
  } else {
    return undefined;
  }
};

let BusinessDetails = ({ t, change }) => {
  const navigate = useNavigate();
  const errors = useSelector(
    (state) => state?.form?.['create-business-account-3']?.syncErrors
  );
  const state = useSelector(
    (state) => state?.form?.['create-business-account-3']
  )?.values?.['shop-state'];
  const zipCode = useSelector(
    (state) => state?.form?.['create-business-account-3']?.values?.['zip-code']
  );

  const [states, setStates] = useState([]);

  useEffect(() => {
    fetch('/states.json')
      .then((res) => res.json())
      .then((data) => setStates(data));
  }, []);

  return (
    <div className="business-details-container">
      <div className="header-row">
        <MenuButton>
          <Link to="/BusinessAccount/Create">
            <img alt="Menu Icon" src="../svg/arrowLeft.svg" />
          </Link>
        </MenuButton>
        <h1 className="header-row-heading mb-[0px]">
          {t('businessAccountDetailHeading')}
        </h1>
      </div>
      <div className="max-w-[450px] m-[0_auto]">
        <div className="business-details-description text-[#545454]">
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
                validate={required}
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
                  validate={required}
                />
                <CustomSelect
                  name="shop-state"
                  options={states}
                  label="State"
                  placeholder="Select"
                  customOnChange={(option) => {
                    change('shop-state', option?.value);
                  }}
                  showInitials
                />
              </div>
              <CustomZIPInput
                name="zip-code"
                label="ZIP Code"
                change={change}
                value={zipCode}
              />
            </div>
            <div className="btn-container">
              <SubmitButton
                type="button"
                className="create-business-account__form-button-btn"
                disabled={
                  errors ||
                  !state ||
                  !zipCode ||
                  zipValidation(zipCode) !== undefined
                }
                onClick={() => {
                  navigate('/BusinessAccount/CreatePassword');
                }}
              >
                {t('businessAccountDetailNextBtn')}
              </SubmitButton>
            </div>
          </form>
        </div>
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
