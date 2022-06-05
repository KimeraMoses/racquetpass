import { Field, reduxForm } from 'redux-form';
import {
  Heading,
  HeadingButton,
  CustomInput,
  StepButton,
} from 'web/components';
import './BankForm.styles.scss';

export function BankForm({ t, setCurrentScreen }) {
  return (
    <>
      <div className="bank-form">
        <div>
          <div className="bank-form__header">
            <Heading>{t('adminAddBank')}</Heading>
            <HeadingButton close onClick={() => setCurrentScreen('setup')} />
          </div>
          <div className="bank-form__content">
            <Field
              name="routingnumber"
              label="Routing Number"
              type="text"
              component={CustomInput}
            />
            <Field
              name="accountnumber"
              label="Account Number"
              type="text"
              component={CustomInput}
            />
            <Field
              name="confirmaccountnumber"
              label="Conform Account Number"
              type="text"
              component={CustomInput}
            />
          </div>
        </div>
        <div className="bank-form__button">
          <StepButton>Add Card</StepButton>
        </div>
      </div>
    </>
  );
}

const onSubmit = (values, dispatch) => {
  // dispatch(    // your submit action //      );
  console.log(values);
};

BankForm = reduxForm({
  // a unique name for the form
  form: 'bankform',
  onSubmit,
})(BankForm);
