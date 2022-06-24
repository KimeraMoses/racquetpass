import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';
import { createRef, useEffect, useState } from 'react';
import { Step1, Step2, Step3, Step4 } from './sections';
import './Survey.styles.scss';

export const Survey = ({ show, setShow, onExit }) => {
  let targetRef = createRef();

  useEffect(() => {
    const targetEl = targetRef?.current;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') !== -1) {
      if (ua.indexOf('chrome') > -1) {
        if (show) {
          window.scrollTo(0, 0);
          document.body.style.overflow = 'hidden';
          return () => {
            document.body.style.overflow = 'auto';
          };
        }
      } else {
        if (show) {
          window.scrollTo(0, 0);
          document.body.style.overflow = 'hidden';
          disableBodyScroll(targetEl);
          return () => {
            document.body.style.overflow = 'auto';
            enableBodyScroll(targetEl);
            clearAllBodyScrollLocks();
          };
        }
      }
    }
  }, [show, targetRef]);

  const [step, setStep] = useState(1);

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
