import { useEffect, useState } from 'react';
import { withNamespaces } from 'react-i18next';
import { reduxForm } from 'redux-form';
import { useNavigate } from 'react-router-dom';
import { StepButton, Progress } from 'web/components';
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
  ReviewOrder,
  Done,
} from './sections';

import './order.styles.scss';

let OrderPage = ({ t, handleSubmit, change }) => {
  const [step, setStep] = useState(0);
  const [steps, setSteps] = useState({
    active: '',
    content: ['QR', 'Strings', 'Contact', 'Review'],
  });
  const [scan, setScan] = useState({ current: 'initial' });
  const [shop, setShop] = useState({ current: 'search' });
  const [strings, setStrings] = useState({ current: 'initial' });
  const [mainCross, setMainCross] = useState({ current: 'initial' });
  const [main, setMain] = useState(false);
  const [cross, setCross] = useState(false);
  const [done, setDone] = useState(false);

  const navigate = useNavigate();

  console.log(steps);

  useEffect(() => {
    switch (step) {
      case 1:
        setSteps((s) => {
          return { ...s, active: 'QR' };
        });
        break;
      case 2:
        setSteps((s) => {
          return { ...s, active: 'Strings' };
        });
        break;
      case 3:
        setSteps((s) => {
          return { ...s, active: 'Strings' };
        });
        break;
      case 4:
        setSteps((s) => {
          return { ...s, active: 'Contact' };
        });
        break;
      case 5:
        setSteps((s) => {
          return { ...s, active: 'Contact' };
        });
        break;
      case 6:
        setSteps((s) => {
          return { ...s, active: 'Review' };
        });
        break;
      case 7:
        setSteps((s) => {
          return { ...s, active: 'Review' };
        });
        break;
      default:
        setSteps((steps) => steps);
    }
  }, [step]);

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
    if (step === 2) {
      setStep(4);
    } else {
      setStep((step) => step + 1);
    }
  };

  const backward = () => {
    if (step === 1 && scan.current !== 'initial') {
      setScan({ current: 'initial' });
    } else if (step === 0) {
      navigate('/');
    } else {
      setStep((step) => step - 1);
    }
  };

  const getCurrentScanScreen = () => {
    switch (scan.current) {
      case 'initial':
        return <ScanSection t={t} change={change} scanForward={scanForward} />;
      case 'found':
        return <ScanSuccess t={t} backward={backward} setStep={setStep} />;
      case 'notFound':
        return <ScanNotFound t={t} backward={backward} setStep={setStep} />;
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
      case 0:
        return getCurrentShopScreen();
      case 1:
        return getCurrentScanScreen();
      case 2:
        return getCurrentStringsScreen();
      case 3:
        return getCurrentMainCross();
      case 4:
        return <Contact t={t} backward={backward} />;
      case 5:
        return <VerifyPhone t={t} backward={backward} />;
      case 6:
        return <ReviewOrder t={t} backward={backward} />;
      case 7:
        return <Done t={t} />;
      default:
        return <>Undetected Step</>;
    }
  };
  return (
    <>
      {step === 7 || step === 0 ? <></> : <Progress steps={steps} />}
      <div className={`order-page ${done ? 'order-page-done' : ''} ${step === 0 ? 'order-page-zero' : ''}`}>
        <form onSubmit={handleSubmit} className="order-page__form">
          <div>{getActiveSection()}</div>
          {done ||
          shop.current === 'find' ||
          mainCross.current === 'search' ||
          step === 6 ? (
            <></>
          ) : (
            <div className="order-page__button-container">
              <StepButton
                onClick={step === 5 || step === 6 ? () => setStep(4) : backward}
                outlined
                type="button"
              >
                {t('odrBack')}
              </StepButton>{' '}
              <StepButton
                onClick={forward}
                disabled={scan.current === 'initial' || step === 0}
                type="button"
              >
                {t('odrNext')}
              </StepButton>
            </div>
          )}
          {step === 6 && (
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
    </>
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
