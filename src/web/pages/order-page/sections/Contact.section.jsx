import { useSelector } from "react-redux";
import { Field } from "redux-form";
// Custom Components
import {
  Heading,
  Description,
  CustomInput,
  CustomPhoneInput,
} from "web/components";
import { BackButton } from "web/components/Buttons/BackButton.component";

// Styles
import "./Contact.styles.scss";

const required = (value) => (value ? undefined : "Required");

export function Contact({
  t,
  change,
  backFromReview,
  setStep,
  setBackFromReview,
}) {
  const phoneNumber = useSelector(
    (state) => state?.form?.signup?.values?.["phone-number"]
  );
  const values = useSelector((state) => state?.form?.signup?.values);

  return (
    <>
      <div className="contact-section-odr max-w-[450px] m-[0_auto]">
        <div className="contact-section-odr__heading">
          <BackButton
            onClick={() => {
              if (backFromReview) {
                setStep(6);
                setBackFromReview(false);
              } else {
                setStep(values?.brand?.string_id ? 2 : 3);
              }
            }}
          />
          <Heading customClass="contact-section-odr__heading-text">
            {backFromReview ? "Edit Contact Info" : t("odrStayHeading")}
          </Heading>
        </div>
        {backFromReview ? (
          <></>
        ) : (
          <div className="contact-section-odr__text-container">
            <Description customClass="contact-section-odr__text-container-text">
              {t("odrStayDesc")}
            </Description>
          </div>
        )}
        <div className="contact-section-odr__form-container">
          <Field
            name="first-name"
            label="First Name"
            type="text"
            validate={required}
            component={CustomInput}
          />
          <Field
            name="last-name"
            label="Last Name"
            type="text"
            validate={required}
            component={CustomInput}
          />
          <CustomPhoneInput
            change={change}
            name="phone-number"
            label="Phone Number"
            value={phoneNumber}
          />
          <Description>{t("selectStringContact")}</Description>
        </div>
      </div>
    </>
  );
}
