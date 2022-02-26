import { Link } from 'react-router-dom';
import { Field } from 'redux-form';

// Custom Components
import {
  Heading,
  SubHeading,
  Description,
  HeadingButton,
  CustomInput,
} from 'web/components';

// Styles
import './VerifyPhone.styles.scss';

export function VerifyPhone({ t, backward }) {
  return (
    <>
      <div className="phone-section">
        <div className="phone-section__heading">
          <Heading customClass="phone-section__heading-text">
            {t('odrPhonHeading')}
          </Heading>
          <HeadingButton close onClick={backward} />
        </div>
        <div className="phone-section__form-container">
          <Field
            CustomInputClass="phone-section__form-container-input"
            name="verfication-code"
            label="Varification Code"
            placeholder="112233"
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
