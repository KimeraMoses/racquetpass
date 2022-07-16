import { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import { Heading, Description, CustomInput } from 'web/components';
import { BackButton } from 'web/components/Buttons/BackButton.component';

// Styles
import './VerifyPhone.styles.scss';

const required = (value) => (value ? undefined : 'Required');
export function VerifyPhone({ t, backward, change }) {
  const [verification, setVerification] = useState('');
  const [touchedCode, setTouchedCode] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  return (
    <>
      <div className="phone-section max-w-[450px] m-[0_auto]">
        <div className="phone-section__heading flex justify-start gap-[12px]">
          <BackButton onClick={backward} />
          <Heading customClass="phone-section__heading-text">
            {t('odrPhonHeading')}
          </Heading>
        </div>
        <div className="phone-section__form-container">
          <CustomInput
            CustomInputClass="phone-section__form-container-input"
            type="number"
            value={verification}
            customOnChange={(e) => {
              if (e.target.value?.length > 6) {
              } else {
                setVerification(e?.target?.value);
                change('verification-code', e?.target?.value);
                setErrorCode('');
              }
            }}
            customOnBlur={(e) => {
              setTouchedCode(true);
              if (!e?.target?.value) {
                setErrorCode('This value is required!');
              } else {
                setVerification(e?.target?.value);
                setErrorCode('');
                change('verification-code', e?.target?.value);
              }
            }}
            label="Verification Code"
            name="verfication-code-new"
            pattern="\d*"
            placeholder="- - - - - -"
            validate={required}
            meta={{ touched: touchedCode, error: errorCode }}
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
