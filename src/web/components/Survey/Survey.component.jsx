import { useEffect, useState } from 'react';
import { Step1, Step2, Step3, Step4 } from './sections';
import './Survey.styles.scss';

export const Survey = ({ show, setShow, onExit }) => {
  useEffect(() => {
    if (show) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [show]);

  const [step, setStep] = useState(1);
  const [hasRating, setHasRating] = useState(false);
  const next = () => {
    setStep((prev) => prev + 1);
  };
  const back = () => {
    if (step === 4 && hasRating) {
      setStep(2);
      setHasRating(false);
    } else {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <div className={`survey ${show ? 'survey-show' : ''}`}>
      <div className="survey__inner">
        {step === 1 && <Step1 next={next} />}
        {step === 2 && (
          <Step2 next={next} setStep={setStep} setHasRating={setHasRating} />
        )}
        {step === 3 && <Step3 next={next} back={back} />}
        {step === 4 && <Step4 back={back} onExit={onExit} setShow={setShow} />}
      </div>
    </div>
  );
};
