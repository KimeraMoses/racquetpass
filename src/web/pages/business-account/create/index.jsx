import React from 'react';
import { withNamespaces } from 'react-i18next';
// import { MenuButton } from 'web/components';
// import { CustomButton } from 'web/components';
import { Description } from 'web/components/atoms/Description.atom';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import './index.styles.scss';
// import { AccountButton } from 'web/components/Buttons/AccountButton.component';
// import { SubHeading } from 'web/components/atoms/SubHeading.atom';
import { SubmitButton } from 'web/components/Buttons/SubmitButton.component';
import { CustomInput, CustomPhoneInput } from 'web/components/formFields/index';
import { Heading } from 'web/components/atoms/Heading.atom';
import { BackButton } from 'web/components/Buttons/BackButton.component';
import { useNavigate } from '../../../../../node_modules/react-router-dom/index';
import { useSelector } from 'react-redux';

const required = (value) => (value ? undefined : 'This field is required');
// Phone Validation
const formats = '(999) 999-9999|(999)999-9999|999-999-9999|9999999999';
const r = RegExp(
  '^(' + formats.replace(/([()])/g, '\\$1').replace(/9/g, '\\d') + ')$'
);
const phoneValidation = (value) => {
  if (r.test(value) === true) {
    if (value.length < 9 || value.length > 14) {
      return 'Please enter value between 9 and 14';
    } else {
      return undefined;
    }
  } else {
    return 'Please enter a valid phone number.';
  }
};

let Create = ({ t, change }) => {
  const errors = useSelector(
    (state) => state?.form?.['create-business-account-1']?.syncErrors
  );
  const phoneNumber = useSelector(
    (state) =>
      state?.form?.['create-business-account-1']?.values?.['phone-number']
  );
  const navigate = useNavigate();
  return (
    <>
      <div className="create-business-account">
        <div>
          <div className="create-business-account__header-container">
            <div className="create-business-account__header-container-heading">
              <BackButton
                onClick={() => {
                  navigate('/');
                }}
              />
              <Heading>{t('odrCreateBtn')}</Heading>
            </div>
            <div className="create-business-account__button-container">
              <button
                className="create-business-account__button-container-btn"
                onClick={() => {
                  navigate('/login');
                }}
              >
                Log In
              </button>
            </div>
          </div>
          <div className="max-w-[450px] m-[0_auto]">
            <div className="text-[#545454] text-[18px]">
              We' re so excited for your business to join RacquetPass! Signing
              up will only take a few minutes.
            </div>
            <div className="create-business-account__form-container">
              <Field
                name="firstName"
                label="First Name"
                type="text"
                component={CustomInput}
                validate={required}
              />
              <Field
                name="lastName"
                label="Last Name"
                type="text"
                component={CustomInput}
                validate={required}
              />
              <CustomPhoneInput
                change={change}
                name="phone-number"
                label="Phone Number"
                value={phoneNumber}
              />
            </div>
            <div>
              <div className="create-business-account__statement">
                <Description customClass="create-business-account__statement-txt">
                  {t('odrPivacyText')}
                  <span className="create-business-account__statement-txt-bold">
                    {t('odrTermsBold')}
                  </span>
                  &nbsp;
                  {t('odrPrivacyAnd')}
                  &nbsp;
                  <span className="create-business-account__statement-txt-bold">
                    {t('odrPrivacyBold')}
                  </span>
                </Description>
              </div>
            </div>
            <div className="create-business-account__form-button">
              <SubmitButton
                type="button"
                className="create-business-account__form-button-btn"
                disabled={
                  errors ||
                  !phoneNumber ||
                  phoneValidation(phoneNumber) !== undefined
                }
                onClick={() => {
                  navigate('/BusinessAccount/BusinessDetails');
                }}
              >
                {t('odrCreateBtn')}
              </SubmitButton>
            </div>
            <div className="text-center text-[16px]">
              Have an account?{' '}
              <Link to="/login" className="text-[16px] text-[#304FFE]">
                Log in.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const onSubmit = (values, dispatch) => {
  // dispatch(    // your submit action //      );
  console.log(values);
};

Create = reduxForm({
  // a unique name for the form
  form: 'create-business-account-1',
  onSubmit,
})(Create);

export default withNamespaces()(Create);
