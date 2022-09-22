import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { Field, reduxForm } from "redux-form";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { BackButton, Heading, CustomInput, SubmitButton } from "web/components";

import "./index.styles.scss";
import { createNewBusiness } from "../../../store/Actions/businessActions";
import Recaptcha from "web/components/Google-Recaptcha/Recaptcha";

const length = new RegExp("^(?=.{8,})");
const lowerCase = new RegExp("^(?=.*[a-z])");
const upperCase = new RegExp("^(?=.*[A-Z])");
const number = new RegExp("^(?=.*[0-9])");

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

let CreatePassword = ({ t, back }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordFieldType, setPasswordFieldType] = useState("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refRecaptcha = useRef(null);
  const [password, setPassword] = useState("");
  const [passwordConditions, setPasswordConditions] = useState({
    moreThanEight: false,
    oneLowerCase: false,
    oneUpperCase: false,
    oneNumber: false,
    noTextFromNameEmail: false,
  });

  const values = useSelector(
    (state) => state?.form?.["create-business-account-4"]?.values
  );
  const firstName = useSelector(
    (state) => state?.form?.["create-business-account-4"]?.values?.firstName
  );
  const lastName = useSelector(
    (state) => state?.form?.["create-business-account-4"]?.values?.lastName
  );

  console.log(firstName, lastName);

  useEffect(() => {
    // Check if 8 Characters Long
    if (length.test(password)) {
      setPasswordConditions((passwordConditions) => {
        return {
          ...passwordConditions,
          moreThanEight: true,
        };
      });
    } else {
      setPasswordConditions((passwordConditions) => {
        return {
          ...passwordConditions,
          moreThanEight: false,
        };
      });
    }
    // Check if one lower case exists
    if (lowerCase.test(password)) {
      setPasswordConditions((passwordConditions) => {
        return {
          ...passwordConditions,
          oneLowerCase: true,
        };
      });
    } else {
      setPasswordConditions((passwordConditions) => {
        return {
          ...passwordConditions,
          oneLowerCase: false,
        };
      });
    }
    // Check if one upper case
    if (upperCase.test(password)) {
      setPasswordConditions((passwordConditions) => {
        return {
          ...passwordConditions,
          oneUpperCase: true,
        };
      });
    } else {
      setPasswordConditions((passwordConditions) => {
        return {
          ...passwordConditions,
          oneUpperCase: false,
        };
      });
    }
    // Check if one number present
    if (number.test(password)) {
      setPasswordConditions((passwordConditions) => {
        return {
          ...passwordConditions,
          oneNumber: true,
        };
      });
    } else {
      setPasswordConditions((passwordConditions) => {
        return {
          ...passwordConditions,
          oneNumber: false,
        };
      });
    }
    // Check if Name exist in password
    if (
      password?.toLowerCase().indexOf(firstName?.toLowerCase()) === -1 &&
      password?.toLowerCase().indexOf(lastName?.toLowerCase()) === -1 &&
      password?.toLowerCase().indexOf(values?.email?.toLowerCase()) === -1
    ) {
      setPasswordConditions((passwordConditions) => {
        return {
          ...passwordConditions,
          noTextFromNameEmail: true,
        };
      });
    } else {
      setPasswordConditions((passwordConditions) => {
        return {
          ...passwordConditions,
          noTextFromNameEmail: false,
        };
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, firstName, lastName]);

  const renderBullet = (condition) => {
    if (condition) {
      return (
        <img
          src="/img/bullets/dark.png"
          alt="tick"
          style={{ height: "24px", width: "24px" }}
        />
      );
    } else {
      return (
        <img
          src="/img/bullets/light.png"
          alt="tick"
          style={{ height: "24px", width: "24px" }}
        />
      );
    }
  };

  const formSubmitHandler = async () => {
    setIsLoading(true);
    try {
      await dispatch(
        createNewBusiness(
          values.firstName,
          values.lastName,
          values["phone-number"],
          values["street-address"],
          values.shopName,
          values["apt-suite"],
          values.city,
          "country",
          values["shop-state"],
          values["zip-code"],
          values.email,
          values.password,
          navigate
        )
      );

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (!window.navigator.onLine) {
        return toast.error(
          "Failed to create business, Please check your internet!"
        );
      }
    }
  };

  return (
    <>
      <div className="create-business-password">
        <div>
          <div className="create-business-password__header">
            <div className="create-business-password__header-heading">
              <BackButton
                onClick={() => navigate("/BusinessAccount/BusinessDetails")}
              />
              <Heading>{t("accPassword")}</Heading>
            </div>
          </div>
          <div className="max-w-[450px] m-[0_auto]">
            <div className="create-business-password__input-password">
              <Field
                name="email"
                label="Email Address"
                type="email"
                component={CustomInput}
                validate={[required, email]}
              />

              <Field
                name="password"
                label="Password"
                placeholder="Password"
                type={passwordFieldType}
                component={CustomInput}
                switchPasswordShow={() => {
                  if (passwordFieldType === "password") {
                    setPasswordFieldType("text");
                  } else {
                    setPasswordFieldType("password");
                  }
                }}
                isPasswordField
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="create-business-password__password-list">
              <ul className="create-business-password__password-list-recommend">
                <li>
                  {renderBullet(passwordConditions.moreThanEight)}
                  <p
                    style={
                      !passwordConditions.moreThanEight
                        ? { color: "#a6a6a6" }
                        : {}
                    }
                  >
                    {t("accPassitem1")}
                  </p>
                </li>
                <li>
                  {renderBullet(passwordConditions.oneLowerCase)}
                  <p
                    style={
                      !passwordConditions.oneLowerCase
                        ? { color: "#a6a6a6" }
                        : {}
                    }
                  >
                    {t("accPassitem2")}
                  </p>
                </li>
                <li>
                  {renderBullet(passwordConditions.oneUpperCase)}
                  <p
                    style={
                      !passwordConditions.oneUpperCase
                        ? { color: "#a6a6a6" }
                        : {}
                    }
                  >
                    {t("accPassitem3")}
                  </p>
                </li>
                <li>
                  {renderBullet(passwordConditions.oneNumber)}
                  <p
                    style={
                      !passwordConditions.oneNumber ? { color: "#a6a6a6" } : {}
                    }
                  >
                    {t("accPassitem4")}
                  </p>
                </li>
                <li>
                  {renderBullet(passwordConditions.noTextFromNameEmail)}
                  <p
                    style={
                      !passwordConditions.noTextFromNameEmail
                        ? { color: "#a6a6a6" }
                        : {}
                    }
                  >
                    {t("accPassitem5")}
                  </p>
                </li>
              </ul>
              <Recaptcha refRecaptcha={refRecaptcha} />

              <div className="mt-[40px]">
                <SubmitButton
                  onClick={formSubmitHandler}
                  type="submit"
                  disabled={
                    !passwordConditions.moreThanEight ||
                    !passwordConditions.oneLowerCase ||
                    !passwordConditions.oneUpperCase ||
                    !passwordConditions.oneNumber ||
                    !passwordConditions.noTextFromNameEmail ||
                    isLoading
                  }
                  className="account-details__form-button-btn"
                >
                  {isLoading ? "Creating..." : "Create Account"}
                </SubmitButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

CreatePassword = reduxForm({
  // a unique name for the form
  form: "create-business-account-4",
})(CreatePassword);

export default withNamespaces()(CreatePassword);
