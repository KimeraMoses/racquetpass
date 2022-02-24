import { useState } from 'react';
import { withNamespaces } from 'react-i18next';
import { reduxForm } from 'redux-form';
import { StepButton } from 'web/components';
import { useNavigate } from 'react-router-dom';

import {
  RacquetFound,
  RacquetNotFound,
  SelectShop,
  Contact,
  VerifyPhone,
  ReviewOrder,
} from './sections';

import './orderWithoutAccount.styles.scss';

let OrderWithoutAccount = ({ t }) => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const innerBarCN = `without-account__progress-bar-inner-step${step}`;
  const racquetFound = true;
  return (
    <div className="without-account">
      <div className="without-account__sections">
        <div className="without-account__progress">
          {step === 1 ? (
            <></>
          ) : (
            <div className="without-account__progress-bar">
              <div
                className={`without-account__progress-bar-inner ${innerBarCN}`}
              ></div>
            </div>
          )}
        </div>
        {step === 1 ? (
          racquetFound ? (
            <RacquetFound t={t} setStep={setStep} />
          ) : (
            <RacquetNotFound t={t} setStep={setStep} />
          )
        ) : (
          <></>
        )}
        {step === 2 ? <SelectShop t={t} setStep={setStep} /> : <></>}
        {step === 3 ? <Contact t={t} setStep={setStep} /> : <></>}
        {step === 4 ? <VerifyPhone t={t} setStep={setStep} /> : <></>}
        {step === 5 ? <ReviewOrder t={t} setStep={setStep} /> : <></>}
      </div>
      {step === 1 || step === 5 ? (
        <></>
      ) : (
        <div className="order-page__button-container">
          <StepButton
            onClick={() => setStep((step) => step - 1)}
            outlined
            type="button"
          >
            Go Back
          </StepButton>
          <StepButton
            onClick={() => setStep((step) => step + 1)}
            disabled={step === 6}
            type="button"
          >
            Next
          </StepButton>
        </div>
      )}
      {step === 5 && (
        <StepButton
          type="submit"
          className="without-account__submit-btn"
          onClick={() => {
            navigate('/');
          }}
        >
          Submit Order
        </StepButton>
      )}
    </div>
  );
};

const onSubmit = (values, dispatch) => {
  // dispatch(    // your submit action //      );
  console.log(values);
};

OrderWithoutAccount = reduxForm({
  // a unique name for the form
  form: 'order-without-account',
  onSubmit,
})(OrderWithoutAccount);

export default withNamespaces()(OrderWithoutAccount);
