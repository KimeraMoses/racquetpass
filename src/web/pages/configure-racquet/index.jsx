import { useState } from 'react';
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
import { Modal } from 'web/components/index';

function ConfigureRacquet({ t, handleSubmit, change }) {
  const [step, setStep] = useState(1);
  const [hybrid, setHybrid] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => {
    setShowModal(!showModal);
  };

  const innerBarCN = `configure-racquet__progress-bar-inner-step${step}`;
  return (
    <>
      <form onSubmit={handleSubmit} className="configure-racquet">
        <Modal showModal={showModal} handleShow={handleShow} />
        {step === 3 || step === 4 ? (
          <div className="configure-racquet__progress-bar">
            <div
              className={`configure-racquet__progress-bar-inner ${innerBarCN}`}
            ></div>
          </div>
        ) : (
          <></>
        )}
        {step === 1 ? <Locker t={t} setStep={setStep} /> : <></>}
        {step === 2 ? <Scan t={t} setStep={setStep} change={change} /> : <></>}
        {step === 3 ? <AboutRacquet t={t} setStep={setStep} /> : <></>}
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
            setStep={setStep}
          />
        ) : (
          <></>
        )}
        {step === 5 ? <ReviewRacquet t={t} /> : <></>}
        {/* <EditRacquetInfo t={t} /> */}
        {/* <EditStringInfo t={t} /> */}
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
