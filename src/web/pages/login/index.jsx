import { reduxForm, Field } from 'redux-form';
import { withNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  AccountButton,
  SubHeading,
  BackButton,
  Heading,
  CustomInput,
  SubmitButton,
} from 'web/components';

import './Login.styles.scss';
function Login({ t }) {
  return (
    <>
      <div className="signin">
        <div>
          <div className="signin__header">
            <div className="signin__header-heading">
              <BackButton />
              <Heading>{t('homeSignin')}</Heading>
            </div>
            <div className="signin__button">
              <button className="signin__button-btn">
                {t('odrCreateBtn')}
              </button>
            </div>
          </div>
          <div className="signin__form">
            <Field
              name="email"
              label="Email Address"
              type="email"
              component={CustomInput}
            />
            <Field
              name="password"
              label="Password"
              type="text"
              component={CustomInput}
            />
          </div>
          <div className="signin__form-buttons">
            <SubmitButton type="submit" className="signin__form-buttons-btn">
              {t('homeSignin')}
            </SubmitButton>
            <Link to="#" className="signin__form-buttons-link">
              {t('odrForgetPass')}
            </Link>
          </div>
        </div>
        <div className="sign__placeholder"></div>
        <div>
          <div className="signin__option">
            <div className="signin__option-line"></div>
            <div>
              <SubHeading customClass="signin__option-txt">
                {t('odrCreateWith')}
              </SubHeading>
            </div>
            <div className="signin__option-line"></div>
          </div>
          <div className="signin__buttons">
            <AccountButton facebook />
            <AccountButton google />
            <AccountButton apple />
          </div>
        </div>
      </div>
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
