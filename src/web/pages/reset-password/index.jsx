import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';
import { useSelector } from 'react-redux';
import { Heading, CustomInput, SubmitButton } from 'web/components';

import './index.styles.scss';
import { BackButton } from 'web/components/Buttons/BackButton.component';

const length = new RegExp('^(?=.{8,})');
const lowerCase = new RegExp('^(?=.*[a-z])');
const upperCase = new RegExp('^(?=.*[A-Z])');
const number = new RegExp('^(?=.*[0-9])');
const strongStrenght = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
);
const mediumStrength = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})'
);

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

let ResetPassword = ({ t, back }) => {
  const [passwordFieldType, setPasswordFieldType] = useState('password');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordConditions, setPasswordConditions] = useState({
    moreThanEight: false,
    oneLowerCase: false,
    oneUpperCase: false,
    oneNumber: false,
    noTextFromNameEmail: false,
  });
  const [passwordStrenght, setPasswordStrenght] = useState('weak');

  const query = useQuery();
  const comingFrom = query.get('comingFrom');

  const firstName = useSelector(
    (state) => state?.form?.signup?.values?.firstName
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
    // Check Strenght
    if (strongStrenght.test(password)) {
      setPasswordStrenght('strong');
    } else if (mediumStrength.test(password)) {
      setPasswordStrenght('medium');
    } else {
      setPasswordStrenght('weak');
    }
  }, [password]);

  const renderBullet = (condition) => {
    if (condition) {
      return (
        <img
          src="/img/bullets/dark.png"
          alt="tick"
          style={{ height: '24px', width: '24px' }}
        />
      );
    } else {
      return (
        <img
          src="/img/bullets/light.png"
          alt="tick"
          style={{ height: '24px', width: '24px' }}
        />
      );
    }
  };
  return (
    <>
      <div className="reset-password">
        <div>
          <div className="reset-password__header">
            <div className="reset-password__header-heading">
              {comingFrom === 'shop' ? (
                <BackButton
                  onClick={() => {
                    navigate('/inventory?active=proshop');
                  }}
                />
              ) : (
                <></>
              )}
              <Heading>Reset Password</Heading>
            </div>
          </div>
          {/* <div>
            <Description customClass="reset-password__desc">
              {t('accPasstxt')}
            </Description>
          </div> */}
          <div className="reset-password__input-password">
            <Field
              name="password"
              label="Password"
              placeholder="Password"
              type={passwordFieldType}
              component={CustomInput}
              switchPasswordShow={() => {
                if (passwordFieldType === 'password') {
                  setPasswordFieldType('text');
                } else {
                  setPasswordFieldType('password');
                }
              }}
              isPasswordField
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <div
              className={`reset-password__input-password-strength ${
                passwordStrenght === 'weak'
                  ? 'reset-password__input-password-strength-weak'
                  : ''
              } ${
                passwordStrenght === 'medium'
                  ? 'reset-password__input-password-strength-medium'
                  : ''
              } ${
                passwordStrenght === 'strong'
                  ? 'reset-password__input-password-strength-strong'
                  : ''
              }`}
            >
              {passwordStrenght === 'strong'
                ? 'Strong'
                : passwordStrenght === 'medium'
                ? 'Medium'
                : 'Weak'}
            </div> */}
          </div>
          {/* <div className="reset-password__progress">
            <div
              className={`reset-password__progress-inner ${
                passwordStrenght === 'weak'
                  ? 'reset-password__progress-inner-weak'
                  : ''
              } ${
                passwordStrenght === 'medium'
                  ? 'reset-password__progress-inner-medium'
                  : ''
              } ${
                passwordStrenght === 'strong'
                  ? 'reset-password__progress-inner-strong'
                  : ''
              }`}
            ></div>
          </div> */}
          <div className="reset-password__password-list">
            {/* <Description>{t('accPassRecommend')}</Description> */}
            <ul className="reset-password__password-list-recommend">
              <li>
                {renderBullet(passwordConditions.moreThanEight)}
                <p
                  style={
                    !passwordConditions.moreThanEight
                      ? { color: '#a6a6a6' }
                      : {}
                  }
                >
                  {t('accPassitem1')}
                </p>
              </li>
              <li>
                {renderBullet(passwordConditions.oneLowerCase)}
                <p
                  style={
                    !passwordConditions.oneLowerCase ? { color: '#a6a6a6' } : {}
                  }
                >
                  {t('accPassitem2')}
                </p>
              </li>
              <li>
                {renderBullet(passwordConditions.oneUpperCase)}
                <p
                  style={
                    !passwordConditions.oneUpperCase ? { color: '#a6a6a6' } : {}
                  }
                >
                  {t('accPassitem3')}
                </p>
              </li>
              <li>
                {renderBullet(passwordConditions.oneNumber)}
                <p
                  style={
                    !passwordConditions.oneNumber ? { color: '#a6a6a6' } : {}
                  }
                >
                  {t('accPassitem4')}
                </p>
              </li>
              <li>
                {renderBullet(passwordConditions.noTextFromNameEmail)}
                <p
                  style={
                    !passwordConditions.noTextFromNameEmail
                      ? { color: '#a6a6a6' }
                      : {}
                  }
                >
                  {t('accPassitem5')}
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div className="mt-[40px]">
            <SubmitButton
              onClick={() => navigate('/login')}
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
              Reset Password
            </SubmitButton>
          </div>
        </div>
      </div>
    </>
  );
};

const onSubmit = (values, dispatch) => {
  // dispatch(    // your submit action //      );
  console.log(values);
};

ResetPassword = reduxForm({
  // a unique name for the form
  form: 'create-business-account-4',
  onSubmit,
})(ResetPassword);

export default withNamespaces()(ResetPassword);
