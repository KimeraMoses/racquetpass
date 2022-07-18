import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { withNamespaces } from "react-i18next";

// Custom Components
import {
  Heading,
  Description,
  BackButton,
  CustomInput,
  CustomButton,
} from "web/components";

import "./index.styles.scss";
import { useSelector } from "react-redux";
import Recaptcha from "web/components/Google-Recaptcha/Recaptcha";

const required = (value) => (value ? undefined : "This field is required");

let VerifyPhone = ({ t }) => {
  const refRecaptcha = useRef(null);
  const errors = useSelector(
    (state) => state?.form?.["create-business-account-2"]?.syncErrors
  );
  const navigate = useNavigate();
  return (
    <div className="verify-phone-container">
      <div className="phone-section">
        <div className="phone-section__heading">
          <BackButton
            onClick={() => {
              navigate("/BusinessAccount/create");
            }}
          />
          <Heading customClass="phone-section__heading-text">
            {t("odrPhonHeading")}
          </Heading>
        </div>
        <div className="phone-section__form-container">
          <Field
            CustomInputClass="phone-section__form-container-input"
            name="verfication-code"
            label="Varification Code"
            placeholder="112233"
            type="number"
            component={CustomInput}
            validate={required}
          />
        </div>
        <div className="phone-section__text-container">
          <Description customClass="phone-section__text-container-text">
            {t("odrphnDesc")}
          </Description>
          <Link to="#" className="phone-section__text-container-rescan">
            {t("odrResendCode")}
          </Link>
        </div>
      </div>
      <div className="btn-container">
        <CustomButton size="lg" btn="primary" disabled={errors}>
          <Link to="/BusinessAccount/BusinessDetails">
            {t("verifyBusinessAccountPhoneNextBtn")}
          </Link>
        </CustomButton>
      </div>
      <Recaptcha refRecaptcha={refRecaptcha} />
    </div>
  );
};

const onSubmit = (values, dispatch) => {
  // dispatch(    // your submit action //      );
  console.log(values);
};

VerifyPhone = reduxForm({
  // a unique name for the form
  form: "create-business-account-2",
  onSubmit,
})(VerifyPhone);

export default withNamespaces()(VerifyPhone);
