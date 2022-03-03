import { useState } from 'react';
import { withNamespaces } from 'react-i18next';
import { reduxForm } from 'redux-form';
import { useNavigate } from 'react-router-dom';
import { StepButton } from 'web/components';
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
  const [continueWithAccount, setContinueWithAccount] = useState(false);
  const [scan, setScan] = useState({ current: 'found' });
  const [shop, setShop] = useState({ current: 'initial' });
  const [strings, setStrings] = useState({ current: 'initial' });
  const [mainCross, setMainCross] = useState({ current: 'initial' });
  const [main, setMain] = useState(false);
  const [cross, setCross] = useState(false);
  const [done, setDone] = useState(false);

  const navigate = useNavigate();

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

  const setStringsCurrent = (current) => {
    if (current) {
      setStrings({ current });
    }
  };

  const forward = () => {
    if (step === 4 && !continueWithAccount) {
      setStep(8);
    } else {
      setStep((step) => step + 1);
    }
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
        return (
          <ScanSuccess
            t={t}
            backward={backward}
            setStep={setStep}
            setContinueWithAccount={setContinueWithAccount}
          />
        );
      case 'notFound':
        return (
          <ScanNotFound
            t={t}
            backward={backward}
            setStep={setStep}
            setContinueWithAccount={setContinueWithAccount}
          />
        );
      default:
        return <>Check current scan</>;
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
        return (
          <ShopSearchResults
            t={t}
            setShopCurrent={setShopCurrent}
            forward={forward}
            change={change}
          />
        );
      case 'find':
        return (
          <GiveShopInfo
            t={t}
            setShopCurrent={setShopCurrent}
            setStep={setStep}
          />
        );
      default:
        return <>Check current shop</>;
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
            setStep={setStep}
            step={step}
          />
        );
      case 'search':
        return (
          <BrandSearchResults
            t={t}
            main={main}
            cross={cross}
            setStringsCurrent={setStringsCurrent}
            change={change}
            strings={strings}
            mainCross={mainCross}
            setMainCross={setMainCross}
          />
        );
      default:
        return <>Check current string</>;
    }
  };
  console.log(mainCross, strings);
  const getCurrentMainCross = () => {
    switch (mainCross.current) {
      case 'initial':
        return (
          <SelectStringWithMainCross
            t={t}
            backward={backward}
            setStep={setStep}
            setMainCross={setMainCross}
            setMain={setMain}
            setCross={setCross}
            step={step}
          />
        );
      case 'search':
        return (
          <BrandSearchResults
            t={t}
            main={main}
            cross={cross}
            setStringsCurrent={setStringsCurrent}
            change={change}
            strings={strings}
            mainCross={mainCross}
            setMainCross={setMainCross}
          />
        );
      default:
        return <>Check current main cross</>;
    }
  };

  const getActiveSection = () => {
    switch (step) {
      case 1:
        return getCurrentScanScreen();
      case 2:
        return getCurrentShopScreen();
      case 3:
        return <Contact t={t} backward={backward} />;
      case 4:
        return <VerifyPhone t={t} backward={backward} />;
      case 5:
        return getCurrentStringsScreen();
      case 6:
        return getCurrentMainCross();
      case 7:
        return <AboutRacquet t={t} backward={backward} />;
      case 8:
        return <ReviewOrder t={t} backward={backward} />;
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
        mainCross.current === 'search' ||
        (step === 1 && scan.current === 'found') ||
        (step === 1 && scan.current === 'notFound') ||
        step === 8 ? (
          <></>
        ) : (
          <div className="order-page__button-container">
            <StepButton
              onClick={step === 5 || step === 6 ? () => setStep(4) : backward}
              disabled={step === 1 && scan.current === 'initial'}
              outlined
              type="button"
            >
              Go Back
            </StepButton>{' '}
            <StepButton
              onClick={forward}
              disabled={scan.current === 'initial' || step === 2}
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
              if (!continueWithAccount) {
                navigate('/');
              } else {
                setDone(true);
                forward();
              }
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
