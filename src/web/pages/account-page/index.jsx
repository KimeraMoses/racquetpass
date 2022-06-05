import { reduxForm } from 'redux-form';
import { useNavigate } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import { SelectAccount, AccountDetails, CreatePassword } from './sections';

import './accountPage.styles.scss';
import { useState } from 'react';

let CreateAccount = ({ t, handleSubmit, change }) => {
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const nextStep = () => {
    setStep((step) => step + 1);
  };

  const prevStep = () => {
    setStep((step) => step - 1);
  };

  const firstStepBack = () => {
    navigate('/');
  };

  const moveToLogin = () => {
    navigate('/login');
  };

  const getActiveScreen = () => {
    switch (step) {
      case 1:
        return (
          <SelectAccount
            t={t}
            back={firstStepBack}
            forward={nextStep}
            change={change}
            moveToLogin={moveToLogin}
          />
        );
      case 2:
        return (
          <AccountDetails
            t={t}
            forward={nextStep}
            back={prevStep}
            moveToLogin={moveToLogin}
          />
        );
      case 3:
        return <CreatePassword t={t} back={prevStep} />;
      default:
        return <>Step not detected</>;
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="create-account">
        {getActiveScreen()}
      </form>
    </>
  );
};

const onSubmit = (values, dispatch) => {
  // dispatch(    // your submit action //      );
  console.log(values);
};

CreateAccount = reduxForm({
  // a unique name for the form
  form: 'signup',
  onSubmit,
})(CreateAccount);

export default withNamespaces()(CreateAccount);
