import { Heading, BackButton, SubmitButton } from 'web/components';
import './Choose.styles.scss';

export const Choose = ({ t, setCurrentScreen }) => {
  return (
    <div className="choose">
      <div className="choose__header">
        <BackButton
          onClick={() => {
            setCurrentScreen('payment');
          }}
        />
        <Heading>Setup RacquetPass Payment</Heading>
      </div>

      <div className="choose__buttons">
        <SubmitButton onClick={() => setCurrentScreen('addCard')}>
          Setup Credit Card
        </SubmitButton>
        <SubmitButton onClick={() => setCurrentScreen('addBank')}>
          Setup Bank Account
        </SubmitButton>
      </div>
    </div>
  );
};
