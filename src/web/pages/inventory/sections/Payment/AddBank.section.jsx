import {
  Heading,
  HeadingButton,
  CustomInput,
  SubmitButton,
} from 'web/components';
import { Field } from 'redux-form';
import './AddBank.styles.scss';

const formFields = [
  { name: 'routingNumber', label: 'Routing Number', type: 'text' },
  { name: 'accountNumber', label: 'Account Number', type: 'text' },
  {
    name: 'confirmAccountNumber',
    label: 'Confirm Account Number',
    type: 'text',
  },
];

export const AddBank = ({ t, setCurrentScreen }) => {
  return (
    <div className="add-bank">
      <div>
        <div className="add-bank__header">
          <Heading>Add Bank Details</Heading>
          <HeadingButton
            close
            onClick={() => {
              setCurrentScreen('payment');
            }}
          />
        </div>

        <div className="add-bank__form">
          {formFields.map((field) => {
            return (
              <Field key={field?.name} {...field} component={CustomInput} />
            );
          })}
        </div>
      </div>

      <div className="add-bank__button">
        <SubmitButton
          onClick={() => {
            setCurrentScreen('payment');
          }}
        >
          Add Bank Account
        </SubmitButton>
      </div>
    </div>
  );
};
