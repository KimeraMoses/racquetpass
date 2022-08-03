import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from "body-scroll-lock";
import { reduxForm } from "redux-form";
import { createRef, useEffect, useState } from "react";
import { Step1, Step2, Step3, Step4 } from "./sections";
import "./Survey.styles.scss";

let Survey = ({ show, setShow, onExit, change }) => {
  let targetRef = createRef();

  useEffect(() => {
    const targetEl = targetRef?.current;
    if (show) {
      window.scrollTo(0, 0);
      disableBodyScroll(targetEl);
      return () => {
        enableBodyScroll(targetEl);
        clearAllBodyScrollLocks();
      };
    }
  }, [show, targetRef]);

  const [step, setStep] = useState(1);

  return (
    <div className={`survey ${show ? "survey-show" : ""}`} ref={targetRef}>
      <div className="survey__inner">
        {step === 1 && <Step1 setStep={setStep} />}
        {step === 2 && <Step2 setStep={setStep} change={change} />}
        {step === 3 && (
          <Step3
            setStep={setStep}
            onExit={onExit}
            setShow={setShow}
            change={change}
          />
        )}
        {step === 4 && (
          <Step4
            back={() => setStep(2)}
            onExit={onExit}
            setShow={setShow}
            change={change}
          />
        )}
      </div>
    </div>
  );
};

Survey = reduxForm({
  form: "survey",
})(Survey);

export default Survey;
