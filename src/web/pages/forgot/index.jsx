import { reduxForm, Field } from "redux-form";
import { useNavigate } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { BackButton, Heading, CustomInput, SubmitButton } from "web/components";
import "./index.styles.scss";
import { useSelector } from "react-redux";
import Recaptcha from "web/components/Google-Recaptcha/Recaptcha";
import { useRef } from "react";

const required = (value) => (value ? undefined : "Email is required");
const email = (value) => {
  if (
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
      value
    )
  ) {
    return undefined;
  } else {
    return "Please enter a valid email";
  }
};

let Forgot = ({ t, handleSubmit }) => {
  const refRecaptcha = useRef(null);
  const navigate = useNavigate();
  const errors = useSelector((state) => state?.form?.["forgot"]?.syncErrors);
  return (
    <form onSubmit={handleSubmit} className="forgot">
      <div className="forgot__header">
        <div className="forgot__header-heading">
          <BackButton
            onClick={() => {
              navigate("/login");
            }}
          />
          <Heading>Forgot Password?</Heading>
        </div>
      </div>
      <div className="max-w-[450px] m-[0_auto]">
        <div className="text-[#3c3c3c] text-[18px] mt-[20px]">
          Don't worry! Just enter your email address and we'll send you a link
          to reset your password.
        </div>
        <div className="forgot__form">
          <Field
            name="email"
            label="Email Address"
            type="email"
            component={CustomInput}
            validate={[required, email]}
          />
        </div>
        <Recaptcha refRecaptcha={refRecaptcha} />
        <div className="forgot__form-buttons">
          <SubmitButton
            type="submit"
            disabled={errors}
            onClick={() => navigate("/login")}
            className="forgot__form-buttons-btn"
          >
            Email me a recovery link
          </SubmitButton>
        </div>
      </div>
    </form>
  );
};

const onSubmit = (values, dispatch) => {
  // dispatch(    // your submit action //      );
  console.log(values);
};

Forgot = reduxForm({
  // a unique name for the form
  form: "forgot",
  onSubmit,
})(Forgot);

export default withNamespaces()(Forgot);
