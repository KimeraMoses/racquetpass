import {
  PaymentButton,
  SubHeading,
  BackButton,
  Heading,
  CustomInput,
} from 'web/components';
import { Field } from 'redux-form';
import './AccountDetail.styles.scss';
import { Description } from 'web/components/atoms/Description.atom';
// import { } from 'web/components/atoms/SubHeading.atom';
// import {  } from 'web/components/Buttons/PaymentButton.component';

export function AccountDetails({ t }) {
  return (
    <>
      <div className="account-details">
        <div>
          <div className="account-details__header-container">
            <div className="account-details__header-container-heading">
              <BackButton />
              <Heading>{t('odrCreateBtn')}</Heading>
            </div>
            <div className="account-details__button-container">
              <button className="account-details__button-container-btn">
                {t('homeSignin')}
              </button>
            </div>
          </div>
          <div className="account-details__form-container">
            <Field
              name="first-name"
              label="First Name"
              type="text"
              component={CustomInput}
            />
            <Field
              name="last-name"
              label="Last Name"
              type="text"
              component={CustomInput}
            />
            <Field
              name="phone-number"
              label="Phone Number"
              type="text"
              component={CustomInput}
            />
          </div>
          <div className="account-details__option-container">
            <div className="account-details__option-container-line"></div>
            <div>
              <SubHeading customClass="account-details__option-container-txt">
                {t('odrCreateWith')}
              </SubHeading>
            </div>
            <div className="account-details__option-container-line"></div>
          </div>
          <div className="account-details__btn-container">
            <PaymentButton isDark>
              Continue With Apple &nbsp;{' '}
              <img src="/img/button/apple.png" alt="apple-pay" />
            </PaymentButton>
            <PaymentButton isDark>
              Continue With Apple &nbsp;{' '}
              <img src="/img/button/apple.png" alt="apple-pay" />
            </PaymentButton>
            <PaymentButton isDark>
              Continue With Apple &nbsp;{' '}
              <img src="/img/button/apple.png" alt="apple-pay" />
            </PaymentButton>
          </div>
        </div>
        <div>
          <div className="account-details__statement-container">
            <Description customClass="account-details__statement-container-txt">
              {t('odrPivacyText')}
              <span className="account-details__statement-container-txt-bold">
                {t('odrTermsBold')}
              </span>
            </Description>
          </div>
        </div>
      </div>
    </>
  );
}
