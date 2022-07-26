import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// Custom Components
import { Heading, Description, CustomInput } from "web/components";
import { BackButton } from "web/components/Buttons/BackButton.component";
import { sendVerificationCode } from "web/store/Actions/shopActions";

// Styles
import "./VerifyPhone.styles.scss";

const required = (value) => (value ? undefined : "Required");
export function VerifyPhone({ t, backward, change, setStep }) {
  const [verification, setVerification] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [touchedCode, setTouchedCode] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const values = useSelector((state) => state?.form?.signup?.values);
  let isVerifiedObj = JSON.parse(localStorage.getItem("_rpe_"));
  const dispatch = useDispatch();

  if (isVerifiedObj?.e === values?.email && isVerifiedObj?.isV) {
    setStep(6);
  }

  const sendCodeVericationHandler = async () => {
    //Logic for sending code here
    setIsLoading(true);
    if (isVerifiedObj?.e === values?.email && isVerifiedObj?.isV) {
      return setIsLoading(false);
    } else {
      try {
        await dispatch(sendVerificationCode(values.email));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className="phone-section max-w-[450px] m-[0_auto]">
        <div className="phone-section__heading flex justify-start gap-[12px]">
          <BackButton onClick={backward} />
          <Heading customClass="phone-section__heading-text">
            {/* {t("odrPhonHeading")} */}
            Verify your email Address
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
                change("verification-code", e?.target?.value);
                setErrorCode("");
              }
            }}
            customOnBlur={(e) => {
              setTouchedCode(true);
              if (!e?.target?.value) {
                setErrorCode("This value is required!");
              } else {
                setVerification(e?.target?.value);
                setErrorCode("");
                change("verification-code", e?.target?.value);
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
            {/* {t("odrphnDesc")} */}
            Please enter the 6 digit verification code that RacquetPass sent to
            your email
          </Description>
          <p
            className="phone-section__text-container-rescan cursor-pointer"
            onClick={sendCodeVericationHandler}
          >
            {isLoading ? "Sending..." : t("odrResendCode")}
          </p>
        </div>
      </div>
    </>
  );
}
