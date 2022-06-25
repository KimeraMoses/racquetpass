import { useState, useMemo } from 'react';
import { reduxForm, Field } from 'redux-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BackButton, Heading, CustomInput, SubmitButton } from 'web/components';
import './Login.styles.scss';
import { Description } from 'web/components/atoms/Description.atom';
import { useSelector } from 'react-redux';

const required = (value) => (value ? undefined : 'Email is required');
const email = (value) => {
  if (
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
      value
    )
  ) {
    return undefined;
  } else {
    return 'Please enter a valid email';
  }
};

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function Login({ t, handleSubmit }) {
  const query = useQuery();
  const missingQR = query.get('missingQR');

  const navigate = useNavigate();
  const [passwordFieldType, setPasswordFieldType] = useState('password');

  const values = useSelector((state) => state?.form?.login?.values);

  return (
    <>
      <form onSubmit={handleSubmit} className="signin">
        <div>
          <div className="signin__header">
            <div className="signin__header-heading">
              <BackButton
                onClick={() => {
                  navigate('/BusinessAccount/Create');
                }}
              />
              <Heading>{t('racquetLogIn')}</Heading>
            </div>
            <div className="signin__button">
              <button
                className="signin__button-btn"
                type="button"
                onClick={() => {
                  navigate('/BusinessAccount/Create');
                }}
              >
                {t('racquetLogInBtn')}
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
                  if (passwordFieldType === 'password') {
                    setPasswordFieldType('text');
                  } else {
                    setPasswordFieldType('password');
                  }
                }}
                type={passwordFieldType}
                isPasswordField
              />
            </div>
            <div className="signin__form-buttons">
              <SubmitButton
                type="submit"
                disabled={!values?.email || !values?.password}
                onClick={() => {
                  navigate('/tasks');
                }}
                className="signin__form-buttons-btn"
              >
                Log In
              </SubmitButton>
              <Link to="/forgot" className="signin__form-buttons-link">
                {t('odrForgetPass')}
              </Link>
            </div>
            <div className="signin__account-text">
              <Description>{t('alreadyHaveAccount')}</Description>
              <Link to="/BusinessAccount/Create">&nbsp;{t('signUpNow')}</Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

const onSubmit = (values, dispatch) => {
  // dispatch(    // your submit action //      );
  console.log(values);
};

Login = reduxForm({
  // a unique name for the form
  form: 'login',
  onSubmit,
})(Login);

export default withNamespaces()(Login);
