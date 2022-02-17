import { useState } from 'react';
import { withNamespaces } from 'react-i18next';
import { reduxForm } from 'redux-form';
import { StepButton, SubmitButton } from 'web/components';
import {
  ScanSection,
  ScanSuccess,
  ScanDetails,
  SelectShop,
  ShopSearchResults,
  FindShop,
  Contact,
  VerifyPhone,
  AboutRacquet,
  BrandSearchResults,
  SelectString,
} from './sections';

import './order.styles.scss';

let OrderPage = ({ t, handleSubmit }) => {
  const [step, setStep] = useState(1);

  const innerBarCN = `order-page__progress-bar-inner-step${step}`;
  return (
    <div className="order-page">
      <form onSubmit={handleSubmit} className="order-page__form">
        {/* Progress Bar */}
        <div>
          <div className="order-page__progress-bar">
            <div
              className={`order-page__progress-bar-inner ${innerBarCN}`}
            ></div>
          </div>

          {/* <ScanSection t={t} /> */}
          {/* <ScanSuccess t={t} /> */}
          {/* <ScanDetails t={t} /> */}
          {/* <SelectShop t={t} /> */}
          {/* <ShopSearchResults t={t} /> */}
          {/* <FindShop t={t} /> */}
          {/* <Contact t={t} /> */}
          {/* <VerifyPhone t={t} /> */}
          {/* <AboutRacquet t={t} /> */}
          {/* <BrandSearchResults t={t} /> */}
          <SelectString t={t} />
        </div>
        <div className="order-page__button-container">
          <StepButton
            onClick={() => {
              setStep((step) => step - 1);
            }}
            disabled={step === 1}
            outlined
          >
            Go Back
          </StepButton>{' '}
          <StepButton
            onClick={() => {
              setStep((step) => step + 1);
            }}
            disabled={step === 8}
          >
            Next
          </StepButton>
          {/* <SubmitButton>Submit Form</SubmitButton> */}
        </div>
      </form>
    </div>
  );
};

const onSubmit = (values, dispatch) => {
  // dispatch(    // your submit action //      );
  console.log(values);
};

OrderPage = reduxForm({
  // a unique name for the form
  form: 'contact',
  onSubmit,
})(OrderPage);

export default withNamespaces()(OrderPage);
