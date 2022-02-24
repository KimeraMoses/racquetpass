import { useState } from 'react';
import { withNamespaces } from 'react-i18next';
import { reduxForm } from 'redux-form';
import { StepButton, SubmitButton } from 'web/components';
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
  const [step, setStep] = useState(6);
  const innerBarCN = `without-account__progress-bar-inner-step${step}`;
  return (
    <div className="without-account">
      <div className="without-account__sections">
        <div className="without-account__progress">
          {step === 1 || step === 2 ? (
            <></>
          ) : (
            <div className="without-account__progress-bar">
              <div
                className={`without-account__progress-bar-inner ${innerBarCN}`}
              ></div>
            </div>
          )}
        </div>
        {/* <RacquetFound t={t} /> */}
        {/* <RacquetNotFound t={t} /> */}
        {/* <SelectShop t={t} /> */}
        {/* <Contact t={t} /> */}
        {/* <VerifyPhone t={t} /> */}
        <ReviewOrder t={t} />
      </div>
      {step === 1 || step === 2 || step === 6 ? (
        <></>
      ) : (
        <div className="order-page__button-container">
          <StepButton
            // onClick={backward}
            // disabled={step === 1 && scan.current === 'initial'}
            outlined
            type="button"
          >
            Go Back
          </StepButton>{' '}
          <StepButton
            // onClick={forward}
            // disabled={scan.current === 'initial'}
            type="button"
          >
            Next
          </StepButton>
        </div>
      )}
      {step === 6 && (
        <StepButton
          type="submit"
          className="without-account__submit-btn"
          // onClick={() => {
          //   setDone(true);
          //   forward();
          // }}
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
  form: '',
  onSubmit,
})(OrderWithoutAccount);

export default withNamespaces()(OrderWithoutAccount);
