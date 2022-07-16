import { Field } from "redux-form";
import { useSelector } from "react-redux";

import {
  AccountButton,
  SubHeading,
  BackButton,
  Heading,
  CustomInput,
  SubmitButton,
} from "web/components";
import "./AccountDetails.styles.scss";
import { Description } from "web/components/atoms/Description.atom";

const required = (value) => (value ? undefined : "This field is required");
// Phone Validation
const formats = "(999)999-9999|999-999-9999|9999999999";
const r = RegExp(
  "^(" + formats.replace(/([\(\)])/g, "\\$1").replace(/9/g, "\\d") + ")$"
);
const phoneNumber = (value) => {
  if (r.test(value) === true) {
    return undefined;
  } else {
    return "Please enter a valid phone number.";
  }
};

export let AccountDetails = ({ t, forward, back, moveToLogin }) => {
  const errors = useSelector((state) => state?.form?.signup?.syncErrors);

  return (
    <>
      <div className="account-details">
        <div>
          <div className="account-details__header-container">
            <div className="account-details__header-container-heading">
              <BackButton onClick={back} />
              <Heading>{t("odrCreateBtn")}</Heading>
            </div>
            <div className="account-details__button-container">
              <button
                className="account-details__button-container-btn"
                onClick={moveToLogin}
              >
                {t("homeSignin")}
              </button>
            </div>
          </div>
          <div className="account-details__form-container">
            <Field
              name="firstName"
              label="First Name"
              type="text"
              component={CustomInput}
              validate={required}
            />
            <Field
              name="lastName"
              label="Last Name"
              type="text"
              component={CustomInput}
              validate={required}
            />
            <Field
              name="phone-number"
              label="Phone Number"
              type="text"
              component={CustomInput}
              validate={[required, phoneNumber]}
            />
          </div>
          <div className="account-details__form-button">
            <SubmitButton
              type="button"
              className="account-details__form-button-btn"
              disabled={errors}
              onClick={() => {
                if (!errors) {
                  forward();
                }
              }}
            >
              {t("odrCreateBtn")}
            </SubmitButton>
          </div>
          <div className="account-details__option-container">
            <div className="account-details__option-container-line"></div>
            <div>
              <SubHeading customClass="account-details__option-container-txt">
                {t("odrCreateWith")}
              </SubHeading>
            </div>
            <div className="account-details__option-container-line"></div>
          </div>
          <div className="account-details__buttons">
            <AccountButton facebook />
            <AccountButton google />
            <AccountButton apple />
          </div>
        </div>
        <div>
          <div className="account-details__statement">
            <Description customClass="account-details__statement-txt">
              {t("odrPivacyText")}
              <span className="account-details__statement-txt-bold">
                {t("odrTermsBold")}
              </span>
              &nbsp;
              {t("odrPrivacyAnd")}
              &nbsp;
              <span className="account-details__statement-txt-bold">
                {t("odrPrivacyBold")}
              </span>
            </Description>
          </div>
        </div>
      </div>
    </>
  );
};
