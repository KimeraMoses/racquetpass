import { useEffect, useState } from 'react';
import { reduxForm } from 'redux-form';
import { useNavigate } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

import {
  Locker,
  Scan,
  AboutRacquet,
  StringDetails,
  StringType,
  EditRacquetInfo,
  EditStringInfo,
  ReviewRacquet,
} from './sections';

import './configure-racquet.styles.scss';
import { Modal, Progress } from 'web/components/index';
import { StepButton } from 'web/components/Buttons/StepButton.componet';

function ConfigureRacquet({ t, handleSubmit, change }) {
  const [step, setStep] = useState(1);
  const [steps, setSteps] = useState({
    active: '',
    content: ['Basic Info', 'Strings'],
  });
  const [hybrid, setHybrid] = useState(false);
  const [strings, setStrings] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => {
    setShowModal(!showModal);
  };

  console.log(step);

  useEffect(() => {
    switch (step) {
      case 3:
        setSteps((s) => {
          return { ...s, active: 'Basic Info' };
        });
        break;
      case 4:
        setSteps((s) => {
          return { ...s, active: 'Strings' };
        });
        break;
      default:
        setSteps((steps) => steps);
    }
  }, [step]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`configure-racquet ${
          step === 3 || step === 4 ? 'configure-racquet-steps' : ''
        }`}
      >
        <Modal showModal={showModal} handleShow={handleShow} />
        {step === 3 || step === 4 ? <Progress steps={steps} /> : <></>}
        {step === 1 ? <Locker t={t} setStep={setStep} /> : <></>}
        {step === 2 ? <Scan t={t} setStep={setStep} change={change} /> : <></>}
        {step === 3 ? (
          <AboutRacquet t={t} setStep={setStep} change={change} />
        ) : (
          <></>
        )}
        {step === 4 && !hybrid ? (
          <StringDetails
            t={t}
            hybrid={hybrid}
            setHybrid={setHybrid}
            handleShow={handleShow}
            setStep={setStep}
          />
        ) : (
          <></>
        )}
        {step === 4 && hybrid ? (
          <StringType
            t={t}
            hybrid={hybrid}
            setHybrid={setHybrid}
            handleShow={handleShow}
            setStep={setStep}
          />
        ) : (
          <></>
        )}
        {step === 5 ? <ReviewRacquet t={t} setStep={setStep} /> : <></>}
        {step === 6 && !strings ? (
          <EditRacquetInfo t={t} setStep={setStep} setStrings={setStrings} />
        ) : (
          <></>
        )}
        {step === 6 && strings ? (
          <EditStringInfo
            t={t}
            setStrings={setStrings}
            setStep={setStep}
            change={change}
          />
        ) : (
          <></>
        )}
        {step === 3 || step === 4 ? (
          <div className="configure-racquet__button-container">
            <StepButton
              onClick={() => {
                if (step === 3) {
                  setStep(1);
                } else {
                  setStep((step) => step - 1);
                }
              }}
              outlined
              type="button"
            >
              {t('odrBack')}
            </StepButton>{' '}
            <StepButton
              onClick={() => setStep((step) => step + 1)}
              type="button"
            >
              {step === 3 ? t('odrNext') : 'Create Racquet'}
            </StepButton>
          </div>
        ) : (
          <></>
        )}
      </form>
    </>
  );
}

const onSubmit = (values, dispatch) => {
  // dispatch(    // your submit action //      );
  console.log(values);
};

ConfigureRacquet = reduxForm({
  // a unique name for the form
  form: 'racquetDetails',
  onSubmit,
})(ConfigureRacquet);

export default withNamespaces()(ConfigureRacquet);
