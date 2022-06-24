import { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import { Heading, Description, CustomInput } from 'web/components';
import { BackButton } from 'web/components/Buttons/BackButton.component';
import { SubmitButton } from 'web/components/Buttons/SubmitButton.component';

// Styles
import './VerifyResend.styles.scss';

const required = (value) => (value ? undefined : 'Required');
export function VerifyResend({ t, setStep, change }) {
  const [verification, setVerification] = useState('');
  const [touchedCode, setTouchedCode] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  return (
    <>
      <div className="verify-resend-section max-w-[450px] m-[0_auto]">
        <div className="verify-resend-section__heading flex justify-start gap-[12px]">
          <BackButton onClick={() => setStep(9)} />
          <Heading customClass="verify-resend-section__heading-text">
            {t('odrPhonHeading')}
          </Heading>
        </div>

        <p className="font-[Poppins] text-[18px] text-[#545454] mt-[12px]">
          After you verify your phone number, we'll send you a text with your
          order details.
        </p>

        <div className="verify-resend-section__form-container">
          <CustomInput
            CustomInputClass="phone-section__form-container-input"
            type="number"
            value={verification}
            customOnChange={(e) => {
              if (e.target.value?.length > 6) {
              } else {
                setVerification(e?.target?.value);
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
                change('verification-code-new', e?.target?.value);
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
        <div className="verify-resend-section__text-container">
          <Description customClass="verify-resend-section__text-container-text">
            {t('odrphnDesc')}
          </Description>
          <Link to="#" className="verify-resend-section__text-container-rescan">
            {t('odrResendCode')}
          </Link>
        </div>
        <div>
          <SubmitButton
            type="button"
            className="mt-[45px]"
            disabled={!verification || errorCode}
            onClick={() => setStep(7)}
          >
            Verify and Resend Text
          </SubmitButton>
        </div>
      </div>
    </>
  );
}
