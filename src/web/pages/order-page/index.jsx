import { useState } from 'react';
import { withNamespaces } from 'react-i18next';
import { reduxForm } from 'redux-form';
import { ScanSection } from './sections/ScanSection.section';

import './order.styles.scss';

let OrderPage = ({ t, handleSubmit }) => {
  const [step, setStep] = useState(1);

  const innerBarCN = `order-page__progress-bar-inner-step${step}`;
  return (
    <div className="order-page">
      <form onSubmit={handleSubmit}>
        {/* Progress Bar */}
        <div className="order-page__progress-bar">
          <div className={`order-page__progress-bar-inner ${innerBarCN}`}></div>
        </div>
        <ScanSection t={t} />
        <button
          onClick={() => {
            setStep((step) => step - 1);
          }}
          disabled={step === 1}
        >
          Prev
        </button>
        <button
          onClick={() => {
            setStep((step) => step + 1);
          }}
          disabled={step === 8}
        >
          Next
        </button>
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
