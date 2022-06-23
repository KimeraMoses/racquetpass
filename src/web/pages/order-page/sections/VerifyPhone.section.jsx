import { Link } from 'react-router-dom';
import { Field } from 'redux-form';

// Custom Components
import { Heading, Description, CustomInput } from 'web/components';
import { BackButton } from 'web/components/Buttons/BackButton.component';

// Styles
import './VerifyPhone.styles.scss';

const required = (value) => (value ? undefined : 'Required');
export function VerifyPhone({ t, backward }) {
  return (
    <>
      <div className="phone-section max-w-[430px] m-[0_auto]">
        <div className="phone-section__heading flex justify-start gap-[12px]">
          <BackButton onClick={backward} />
          <Heading customClass="phone-section__heading-text">
            {t('odrPhonHeading')}
          </Heading>
        </div>
        <div className="phone-section__form-container">
          <Field
            CustomInputClass="phone-section__form-container-input"
            name="verfication-code"
            label="Verification Code"
            placeholder="- - - - - -"
            type="number"
            component={CustomInput}
            validate={required}
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
