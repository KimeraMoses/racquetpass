import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { Field, reduxForm } from "redux-form";
import { useDispatch, useSelector } from "react-redux";
import { Heading, CustomInput, SubmitButton } from "web/components";
import { toast } from "react-toastify";
import "./index.styles.scss";
import { BackButton } from "web/components/Buttons/BackButton.component";
import { resetPassword } from "web/store/Actions/authActions";

const length = new RegExp("^(?=.{8,})");
const lowerCase = new RegExp("^(?=.*[a-z])");
const upperCase = new RegExp("^(?=.*[A-Z])");
const number = new RegExp("^(?=.*[0-9])");

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

let ResetPassword = ({ t, back }) => {
  const [passwordFieldType, setPasswordFieldType] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resetToken } = useParams();
  const [password, setPassword] = useState("");
  const [passwordConditions, setPasswordConditions] = useState({
    moreThanEight: false,
    oneLowerCase: false,
    oneUpperCase: false,
    oneNumber: false,
    noTextFromNameEmail: false,
  });

  const query = useQuery();
  const comingFrom = query.get("comingFrom");

  const firstName = useSelector(
    (state) => state?.form?.signup?.values?.firstName
  );
  const newPassword = useSelector(
    (state) => state?.form["create-business-account-4"]?.values?.password
  );
  const lastName = useSelector(
    (state) => state?.form?.signup?.values?.lastName
  );

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
    if (password.includes(firstName) || password.includes(lastName)) {
      setPasswordConditions((passwordConditions) => {
        return {
          ...passwordConditions,
          noTextFromNameEmail: false,
        };
      });
    } else {
      setPasswordConditions((passwordConditions) => {
        return {
          ...passwordConditions,
          noTextFromNameEmail: true,
        };
      });
    }
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
      await dispatch(resetPassword(newPassword, resetToken));
      setIsLoading(false);
      navigate("/login");
    } catch (err) {
      setIsLoading(false);
      if (!window.navigator.onLine) {
        return toast.error(
          "Failed to generate reset password!, Please check your internet!"
        );
      }
    }
  };

  return (
    <>
      <div className="reset-password">
        <div>
          <div className="reset-password__header">
            <div className="reset-password__header-heading">
              {comingFrom === "shop" ? (
                <BackButton
                  onClick={() => {
                    navigate("/inventory?active=proshop");
                  }}
                />
              ) : (
                <></>
              )}
              <Heading>Reset Password</Heading>
            </div>
          </div>
          <div className="max-w-[450px] m-[0_auto]">
            <div className="reset-password__input-password">
              <Field
                name="password"
                label="New Password"
                placeholder="***********"
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
            <div className="reset-password__password-list">
              <ul className="reset-password__password-list-recommend">
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
            </div>
            <div>
              <div className="mt-[40px]">
                <SubmitButton
                  // onClick={() => {
                  //   if (comingFrom === "shop") {
                  //     navigate("/inventory?active=proshop");
                  //   } else {
                  //     navigate("/login");
                  //   }
                  // }}
                  onClick={formSubmitHandler}
                  type="submit"
                  disabled={
                    !passwordConditions.moreThanEight ||
                    !passwordConditions.oneLowerCase ||
                    !passwordConditions.oneUpperCase ||
                    !passwordConditions.oneNumber ||
                    !passwordConditions.noTextFromNameEmail
                  }
                  className="account-details__form-button-btn"
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </SubmitButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// const onSubmit = (values, dispatch) => {
//   // dispatch(    // your submit action //      );
//   console.log(values);
// };

ResetPassword = reduxForm({
  // a unique name for the form
  form: "create-business-account-4",
})(ResetPassword);

export default withNamespaces()(ResetPassword);
