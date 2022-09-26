import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { reduxForm } from "redux-form";
import { withNamespaces } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
// Custom Components
import { Heading, Description, CustomInput } from "web/components";
import { BackButton } from "web/components/Buttons/BackButton.component";
import {
  codeVerification,
  sendVerificationCode,
} from "web/store/Actions/shopActions";

// Styles
import "./VerifyPhone.styles.scss";
import { SubmitButton } from "web/components/Buttons/SubmitButton.component";
import { useEffect } from "react";
import { getOrderContact } from "web/store/Slices/shopSlice";

const required = (value) => (value ? undefined : "Required");

let VerifyPhone = ({ t, change }) => {
  const [verification, setVerification] = useState("");
  const backFromReview = useSelector((state) => state?.shop?.backFromPreview);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [touchedCode, setTouchedCode] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userContacts = useSelector((state) => state?.shop?.contacts);
  const orderId = useSelector((state) => state?.shop?.order?.id);
  const newPhone = JSON.parse(localStorage.getItem("_newPhone_"));

  const order = JSON.parse(localStorage.getItem("_rapo_"));

  useEffect(() => {
    //LOADING STORED STATE
    if (order?.contact && Object.keys(order?.contact).length !== 0) {
      const contactValues = {
        "first-name": order?.contact["first-name"],
        "last-name": order?.contact["last-name"],
        "phone-number": order?.contact["phone-number"],
      };

      dispatch(getOrderContact(contactValues));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //RESEND VERIFICATION CODE
  const sendCodeVericationHandler = async () => {
    setIsLoading(true);
    try {
      await dispatch(
        sendVerificationCode(
          currentPath === "reverify" || !!newPhone
            ? newPhone
            : userContacts && userContacts["phone-number"]
        )
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const codeverificationHandler = async () => {
    setIsVerifying(true);
    try {
      await dispatch(
        codeVerification(
          verification,
          newPhone,
          navigate,
          currentPath === "reverify" ? "resend" : null,
          orderId ? orderId : null
        )
      );
      setIsVerifying(false);
    } catch (error) {
      setIsVerifying(false);
    }
  };

  const currentPath = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  return (
    <>
      <div
        className={`phone-section max-w-[450px] m-[0_auto] ${
          currentPath === "reverify" ? "mt-[35px]" : ""
        }`}
      >
        <div className="phone-section__heading flex justify-start gap-[12px]">
          <BackButton
            onClick={() => {
              if (currentPath === "reverify") {
                return navigate("/order/resend-text");
              }
              navigate("/order-flow/contacts");
            }}
          />
          <Heading customClass="phone-section__heading-text">
            {t("odrPhonHeading")}
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
            // pattern="\d*"
            placeholder="- - - - - -"
            validate={required}
            meta={{ touched: touchedCode, error: errorCode }}
          />
        </div>
        <div className="phone-section__text-container">
          <Description customClass="phone-section__text-container-text">
            Please enter the 6 digit verification code that RacquetPass texted
            to{" "}
            {currentPath === "reverify" || !!newPhone
              ? newPhone
              : userContacts && userContacts["phone-number"]}
          </Description>
          <p
            className="phone-section__text-container-rescan cursor-pointer"
            onClick={sendCodeVericationHandler}
          >
            {isLoading ? "Sending..." : t("odrResendCode")}
          </p>
        </div>
      </div>
      <div className="order-page__button-container max-w-[450px] w-full mr-[auto] ml-[auto]">
        <SubmitButton
          onClick={codeverificationHandler}
          disabled={verification?.length < 6}
        >
          {isVerifying
            ? "Verifying..."
            : backFromReview
            ? "Update Contact Info"
            : "Verify"}
        </SubmitButton>
      </div>
    </>
  );
};

VerifyPhone = reduxForm({
  form: "vericode",
})(VerifyPhone);

export default withNamespaces()(VerifyPhone);
