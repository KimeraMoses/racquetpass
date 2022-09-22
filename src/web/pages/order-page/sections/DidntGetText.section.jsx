import { useSelector } from "react-redux";
// Custom Components
import { Heading, Description, CustomPhoneInput } from "web/components";
import { BackButton } from "web/components/Buttons/BackButton.component";
import { SubmitButton } from "web/components/Buttons/SubmitButton.component";

// Styles
import "./DidntGetText.styles.scss";

const phone = "(123) 456-7890";

// Phone Validation
const formats = "(999) 999-9999|(999)999-9999|999-999-9999|9999999999";
const r = RegExp(
  "^(" + formats.replace(/([()])/g, "\\$1").replace(/9/g, "\\d") + ")$"
);
const phoneValidation = (value) => {
  if (r.test(value) === true) {
    if (value.length < 9 || value.length > 14) {
      return "Please enter value between 9 and 14";
    } else {
      return undefined;
    }
  } else {
    return "Please enter a valid phone number";
  }
};

export function DidntGetText({
  t,
  backward,
  change,
  backFromReview,
  setStep,
  setBackFromReview,
}) {
  const phoneNumber = useSelector(
    (state) => state?.form?.signup?.values?.["phone-number"]
  );
  return (
    <>
      <div className="didnt-get-text max-w-[450px] m-[0_auto]">
        <div className="didnt-get-text__heading">
          <BackButton
            onClick={() => {
              setStep(7);
            }}
          />
          <Heading customClass="didnt-get-text__heading-text">
            Didn't get a text?
          </Heading>
        </div>
        <div className="didnt-get-text__text-container">
          <Description customClass="didnt-get-text__text-container-text">
            We sent a text to <span className="text-[#304FFE]">{phone}</span>,
            but something might've gone wrong.
          </Description>
          <div className="mt-[20px]">
            <SubmitButton
              type="button"
              outlined
              onClick={() => {
                setStep(7);
              }}
            >
              Resend Text
            </SubmitButton>
          </div>
        </div>
        <Heading customClass="didnt-get-text__heading-text mt-[60px]">
          Not your number?
        </Heading>
        <Description customClass="didnt-get-text__text-container-text mt-[14px]">
          Enter your preferred number below and we'll send the text again.
        </Description>
        <div className="didnt-get-text__form-container">
          <CustomPhoneInput
            change={change}
            name="phone-number"
            label="Phone Number"
            value={phoneNumber}
          />
          <SubmitButton
            type="button"
            disabled={
              !phoneNumber || phoneValidation(phoneNumber) !== undefined
            }
            onClick={() => setStep(10)}
          >
            Update Phone Number
          </SubmitButton>
        </div>
      </div>
    </>
  );
}
