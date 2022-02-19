import {
  AccountButton,
  SubHeading,
  BackButton,
  Heading,
  CustomInput,
  SubmitButton,
} from 'web/components';
import { Field } from 'redux-form';
import './AccountDetails.styles.scss';
import { Description } from 'web/components/atoms/Description.atom';

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
          <div className="account-details__form-button">
            <SubmitButton
              type="submit"
              className="account-details__form-button-btn"
            >
              {t('odrCreateBtn')}
            </SubmitButton>
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
          <div className="account-details__buttons">
            <AccountButton facebook />
            <AccountButton google />
            <AccountButton apple />
          </div>
        </div>
        <div>
          <div className="account-details__statement">
            <Description customClass="account-details__statement-txt">
              {t('odrPivacyText')}
              <span className="account-details__statement-txt-bold">
                {t('odrTermsBold')}
              </span>
              &nbsp;
              {t('odrPrivacyAnd')}
              &nbsp;
              <span className="account-details__statement-txt-bold">
                {t('odrPrivacyBold')}
              </span>
            </Description>
          </div>
        </div>
      </div>
    </>
  );
}
