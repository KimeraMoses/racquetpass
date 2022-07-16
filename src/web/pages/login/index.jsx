import { useState } from "react";
import { reduxForm, Field, reset } from "redux-form";
import { useNavigate } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { Link } from "react-router-dom";
import { BackButton, Heading, CustomInput, SubmitButton } from "web/components";
import "./Login.styles.scss";
import { Description } from "web/components/atoms/Description.atom";
import { useSelector } from "react-redux";
import { login } from "web/store/Actions/authActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

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

// function useQuery() {
//   const { search } = useLocation();
//   return useMemo(() => new URLSearchParams(search), [search]);
// }

let Login = ({ t, handleSubmit }) => {
  const [loading, setIsLoading] = useState(false);
  // const query = useQuery();
  // const missingQR = query.get("missingQR");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordFieldType, setPasswordFieldType] = useState("password");

  const values = useSelector((state) => state?.form?.login?.values);
  const errors = useSelector((state) => state?.form?.login?.syncErrors);
  const formSubmitHandler = async (values) => {
    setIsLoading(true);
    try {
      await dispatch(login(values.email, values.password));
      dispatch(reset("login"));
      setIsLoading(false);
      navigate("/tasks");
      toast.success("You have logged in successfuly");
    } catch (err) {
      setIsLoading(false);
      if (window.navigator.onLine) {
        return toast.error("Failed to login, Wrong email or Password!");
      }
      toast.error("Failed to login, Please check your internet!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(formSubmitHandler)} className="signin">
        <div>
          <div className="signin__header">
            <div className="signin__header-heading">
              <BackButton
                onClick={() => {
                  navigate("/BusinessAccount/Create");
                }}
              />
              <Heading>{t("racquetLogIn")}</Heading>
            </div>
            <div className="signin__button">
              <button
                className="signin__button-btn"
                type="button"
                onClick={() => {
                  navigate("/BusinessAccount/Create");
                }}
              >
                {t("racquetLogInBtn")}
              </button>
            </div>
          </div>
          <div className="max-w-[450px] m-[0_auto]">
            <div className="signin__form">
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
                component={CustomInput}
                switchPasswordShow={() => {
                  if (passwordFieldType === "password") {
                    setPasswordFieldType("text");
                  } else {
                    setPasswordFieldType("password");
                  }
                }}
                type={passwordFieldType}
                isPasswordField
              />
            </div>
            <div className="signin__form-buttons">
              <SubmitButton
                type="submit"
                disabled={errors || !values?.password || loading}
                // onClick={() => {
                //   navigate("/tasks");
                // }}
                className="signin__form-buttons-btn"
              >
                {loading ? "Logging In..." : "Log In"}
              </SubmitButton>
              <Link to="/forgot" className="signin__form-buttons-link">
                {t("odrForgetPass")}
              </Link>
            </div>
            <div className="signin__account-text">
              <Description>{t("alreadyHaveAccount")}</Description>
              <Link to="/BusinessAccount/Create">&nbsp;{t("signUpNow")}</Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

// const onSubmit = (values, dispatch) => {
//   // dispatch(    // your submit action //      );
//   console.log(values);
// };

Login = reduxForm({
  // a unique name for the form
  form: "login",
  // onSubmit,
})(Login);

export default withNamespaces()(Login);
