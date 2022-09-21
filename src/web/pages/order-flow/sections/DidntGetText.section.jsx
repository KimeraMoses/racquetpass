import { useSelector } from "react-redux";
// Custom Components
import { Heading, Description, CustomPhoneInput } from "web/components";
import { BackButton } from "web/components/Buttons/BackButton.component";
import { SubmitButton } from "web/components/Buttons/SubmitButton.component";
import { withNamespaces } from "react-i18next";
import { useNavigate } from "react-router-dom";
// Styles
import "./DidntGetText.styles.scss";
import { reduxForm } from "redux-form";
import {
  resendConfirmation,
  sendVerificationCode,
} from "web/store/Actions/shopActions";
import { useDispatch } from "react-redux";
import { useState } from "react";

// const phone = "(123) 456-7890";

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
    return "Please enter a valid phone number.";
  }
};

function DidntGetText({ t, change, setStep }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const order = useSelector((state) => state?.shop?.order);
  const phoneNumber = useSelector(
    (state) => state?.form?.text?.values?.["phone-number"]
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //RESEND VERIFICATION CODE
  const sendTextHandler = async () => {
    setIsLoading(true);
    try {
      await dispatch(resendConfirmation(order?.id));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  //RESEND VERIFICATION CODE
  const sendCodeVericationHandler = async () => {
    setIsSending(true);
    try {
      await dispatch(
        sendVerificationCode(phoneNumber, navigate, null, "resend")
      );
      localStorage.setItem("_rnc_", phoneNumber);
      setIsSending(false);
    } catch (error) {
      setIsSending(false);
    }
  };

  return (
    <>
      <div className="didnt-get-text max-w-[450px] m-[0_auto]">
        <div className="didnt-get-text__heading">
          <BackButton
            onClick={() => {
              navigate("/order/done");
            }}
          />
          <Heading customClass="didnt-get-text__heading-text">
            Didn't get a text?
          </Heading>
        </div>
        <div className="didnt-get-text__text-container">
          <Description customClass="didnt-get-text__text-container-text">
            We sent a text to{" "}
            <span className="text-[#304FFE]">
              {order?.delivery_address?.phone_number}
            </span>
            , but something might've gone wrong.
          </Description>
          <div className="mt-[20px]">
            <SubmitButton
              type="button"
              disabled={isLoading}
              outlined
              onClick={sendTextHandler}
            >
              {isLoading ? "Sending..." : "Resend Text"}
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
              order?.delivery_address?.phone_number === phoneNumber ||
              isSending ||
              !phoneNumber ||
              phoneValidation(phoneNumber) !== undefined
            }
            onClick={sendCodeVericationHandler}
          >
            {isSending ? "Sending code..." : "Update Phone Number"}
          </SubmitButton>
        </div>
      </div>
    </>
  );
}
DidntGetText = reduxForm({
  form: "text",
  // onSubmit,
})(DidntGetText);

export default withNamespaces()(DidntGetText);
