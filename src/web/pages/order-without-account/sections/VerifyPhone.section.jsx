import { Link } from 'react-router-dom';
import { Field } from 'redux-form';

// Custom Components
import { Heading, Description, CustomInput } from 'web/components';
import { BackButton } from 'web/components/Buttons/BackButton.component';

// Styles
import './VerifyPhone.styles.scss';

export function VerifyPhone({ t, setStep }) {
  return (
    <>
      <div className="phone-section">
        <div className="phone-section__heading flex justify-start items-center gap-[16px]">
          <BackButton onClick={() => setStep(7)} />
          <Heading customClass="phone-section__heading-text">
            {t('odrPhonHeading')}
          </Heading>
        </div>
        <div className="phone-section__form-container">
          <Field
            CustomInputClass="phone-section__form-container-input"
            name="verfication-code"
            label="Varification Code"
            placeholder="112233"
            type="number"
            component={CustomInput}
          />
        </div>
        <div className="phone-section__text-container">
          <Description customClass="phone-section__text-container-text">
            {t('odrphnDesc')}
          </Description>
          <Link to="#" className="phone-section__text-container-rescan">
            {t('odrResendCode')}
          </Link>
        </div>
      </div>
    </>
  );
}
