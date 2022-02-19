import { useState } from 'react';
import { withNamespaces } from 'react-i18next';
import { reduxForm } from 'redux-form';
import { StepButton, SubmitButton } from 'web/components';
import {
  ScanSection,
  ScanNotFound,
  ScanSuccess,
  SelectShop,
  ShopSearchResults,
  GiveShopInfo,
  Contact,
  VerifyPhone,
  SelectString,
  BrandSearchResults,
  SelectStringWithMainCross,
  AboutRacquet,
  ReviewOrder,
  Done,
} from './sections';

import './order.styles.scss';

let OrderPage = ({ t, handleSubmit, change }) => {
  const [step, setStep] = useState(5);
  // TODO: Change this to initial when done
  const [scan, setScan] = useState({ current: 'notFound' });
  const [shop, setShop] = useState({ current: 'initial' });
  const [strings, setStrings] = useState({ current: 'initial' });
  const [done, setDone] = useState(false);

  // Function to move search forward
  const scanForward = (scan) => {
    if (scan) {
      setScan({ current: 'found' });
    } else {
      setScan({ current: 'notFound' });
    }
  };

  const setShopCurrent = (current) => {
    if (current) {
      setShop({ current });
    }
  };

  const setScanCurrent = (current) => {
    if (current) {
      setScanCurrent({ current });
    }
  };

  const setStringsCurrent = (current) => {
    console.log('current');
    if (current) {
      setStrings({ current });
    }
  };

  const forward = () => {
    setStep((step) => step + 1);
  };

  const backward = () => {
    if (step === 1 && scan.current !== 'initial') {
      setScan({ current: 'initial' });
    } else {
      setStep((step) => step - 1);
    }
  };

  const getCurrentScanScreen = () => {
    switch (scan.current) {
      case 'initial':
        return <ScanSection t={t} change={change} scanForward={scanForward} />;
      case 'found':
        return <ScanSuccess t={t} backward={backward} />;
      case 'notFound':
        return <ScanNotFound t={t} backward={backward} />;
    }
  };

  const getCurrentShopScreen = () => {
    switch (shop.current) {
      case 'initial':
        return (
          <SelectShop
            t={t}
            setShopCurrent={setShopCurrent}
            backward={backward}
          />
        );
      case 'search':
        return <ShopSearchResults t={t} setShopCurrent={setShopCurrent} />;
      case 'find':
        return <GiveShopInfo t={t} setShopCurrent={setShopCurrent} />;
    }
  };

  const getCurrentStringsScreen = () => {
    switch (strings.current) {
      case 'initial':
        return (
          <SelectString
            t={t}
            setStringsCurrent={setStringsCurrent}
            backward={backward}
          />
        );
      case 'search':
        return (
          <BrandSearchResults t={t} setStringsCurrent={setStringsCurrent} />
        );
    }
  };

  const getActiveSection = () => {
    switch (step) {
      case 1:
        return getCurrentScanScreen();
      case 2:
        return getCurrentShopScreen();
      case 3:
        return <Contact t={t} />;
      case 4:
        return <VerifyPhone t={t} />;
      case 5:
        return getCurrentStringsScreen();
      case 6:
        return <SelectStringWithMainCross t={t} />;
      case 7:
        return <AboutRacquet t={t} />;
      case 8:
        return <ReviewOrder t={t} />;
      case 9:
        return <Done t={t} />;
      default:
        return <>Undetected Step</>;
    }
  };

  const innerBarCN = `order-page__progress-bar-inner-step${step}`;
  return (
    <div className={`order-page ${done ? 'order-page-done' : ''}`}>
      <form onSubmit={handleSubmit} className="order-page__form">
        <div>
          {/* Progress Bar */}
          {done ? (
            <></>
          ) : (
            <div className="order-page__progress-bar">
              <div
                className={`order-page__progress-bar-inner ${innerBarCN}`}
              ></div>
            </div>
          )}
          {getActiveSection()}
        </div>
        {done ||
        shop.current === 'search' ||
        shop.current === 'find' ||
        strings.current === 'search' ||
        step === 8 ? (
          <></>
        ) : (
          <div className="order-page__button-container">
            <StepButton
              onClick={backward}
              disabled={step === 1 && scan.current === 'initial'}
              outlined
              type="button"
            >
              Go Back
            </StepButton>{' '}
            <StepButton
              onClick={forward}
              disabled={scan.current === 'initial'}
              type="button"
            >
              Next
            </StepButton>
            {/* <SubmitButton>Submit Form</SubmitButton> */}
          </div>
        )}
        {step === 8 && (
          <StepButton
            type="submit"
            className="order-page__submit-btn"
            onClick={() => {
              setDone(true);
              forward();
            }}
          >
            Submit Order
          </StepButton>
        )}
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
  form: 'signup',
  onSubmit,
})(OrderPage);

export default withNamespaces()(OrderPage);
