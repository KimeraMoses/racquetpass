import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';
import { createRef, useEffect, useState } from 'react';
import { Step1, Step2, Step3, Step4 } from './sections';
import './Survey.styles.scss';

export const Survey = ({ show, setShow, onExit }) => {
  useEffect(() => {
    if (show) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
        clearAllBodyScrollLocks();
      };
    }
  }, [show]);

  const [step, setStep] = useState(1);

  let targetRef = createRef();
  useEffect(() => {
    if (show) {
      disableBodyScroll(targetRef?.current);
    } else {
      enableBodyScroll(targetRef?.current);
    }
  }, [show, targetRef]);

  return (
    <div className={`survey ${show ? 'survey-show' : ''}`} ref={targetRef}>
      <div className="survey__inner">
        {step === 1 && <Step1 next={() => setStep(2)} />}
        {step === 2 && <Step2 setStep={setStep} />}
        {step === 3 && (
          <Step3 back={() => setStep(2)} onExit={onExit} setShow={setShow} />
        )}
        {step === 4 && (
          <Step4 back={() => setStep(2)} onExit={onExit} setShow={setShow} />
        )}
      </div>
    </div>
  );
};
