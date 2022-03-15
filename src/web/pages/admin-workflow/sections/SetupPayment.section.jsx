import { BackButton, Heading, StepButton } from 'web/components';
import './SetupPayment.styles.scss';

export function SetupPayment({ t }) {
  return (
    <>
      <div className="set-bank">
        <div className="set-bank__header">
          <BackButton />
          <Heading>{t('adminBankHeading')}</Heading>
        </div>
        <div className="set-bank__button">
          <StepButton>Setup Bank Account</StepButton>
        </div>
      </div>
    </>
  );
}
