import {
  Heading,
  HeadingButton,
  CustomInput,
  SubmitButton,
} from 'web/components';
import { Field } from 'redux-form';
import './AddCard.styles.scss';

const formFields = [
  { name: 'cardNumber', label: 'Card number', type: 'text' },
  { name: 'expiry', label: 'Expiration Date', type: 'text' },
  {
    name: 'cvv',
    label: 'Security Code',
    placeholder: 'Security Code (CVV)',
    type: 'text',
  },
  { name: 'zip', label: 'ZIP code', type: 'text' },
  { name: 'name', label: 'Name (optional)', placeholder: 'Name', type: 'text' },
];

export const AddCard = ({ t, setCurrentScreen }) => {
  return (
    <div className="add-credit">
      <div>
        <div className="add-credit__header">
          <Heading>Add Card</Heading>
          <HeadingButton
            close
            onClick={() => {
              setCurrentScreen('payment');
            }}
          />
        </div>

        <div className="add-credit__cards">
          <img src="img/orderpage/cards.png" alt="cards" />
        </div>

        <div className="add-credit__form">
          {formFields.map((field) => {
            return (
              <Field key={field?.name} {...field} component={CustomInput} />
            );
          })}
        </div>
      </div>

      <div className="add-credit__button">
        <SubmitButton
          onClick={() => {
            setCurrentScreen('payment');
          }}
        >
          Add Card
        </SubmitButton>
      </div>
    </div>
  );
};
