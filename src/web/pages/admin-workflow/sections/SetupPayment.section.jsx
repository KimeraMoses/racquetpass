import { BackButton, Heading, StepButton } from 'web/components';
import './SetupPayment.styles.scss';

export function SetupPayment({ t, setCurrentScreen }) {
  return (
    <>
      <div className="set-bank">
        <div className="set-bank__header">
          <BackButton onClick={() => setCurrentScreen('payment')} />
          <Heading>{t('adminBankHeading')}</Heading>
        </div>
        <div className="set-bank__button">
          <StepButton onClick={() => setCurrentScreen('addaccount')}>
            Setup Bank Account
          </StepButton>
        </div>
      </div>
    </>
  );
}
