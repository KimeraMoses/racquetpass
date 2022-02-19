import { Field } from 'redux-form';
import {
  SubHeading,
  BackButton,
  Heading,
  CustomInput,
  SubmitButton,
  Description,
  CustomOrderSelect,
} from 'web/components';

import './CreatePassword.styles.scss';

export function CreatePassword({ t }) {
  return (
    <>
      <div className="create-password">
        <div>
          <div className="create-password__header">
            <div className="create-password__header-heading">
              <BackButton />
              <Heading>{t('accPassword')}</Heading>
            </div>
          </div>
          <div>
            <Description customClass="create-password__desc">
              {t('accPasstxt')}
            </Description>
          </div>
          <div className="create-password__input-password">
            {/* <Field
              name="password"
              label="Password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
              type="number"
              link={{ text: 'Change Units', path: '#' }}
              component={CustomInput}
            /> */}
            <CustomOrderSelect label="String Type" link="normal" />
          </div>
          <div className="create-password__password-list">
            <Description>{t('accPassRecommend')}</Description>
          </div>
        </div>

        <div>
          <div className="account-details__form-button">
            <SubmitButton
              type="submit"
              className="account-details__form-button-btn"
            >
              {t('odrCreateBtn')}
            </SubmitButton>
          </div>
        </div>
      </div>
    </>
  );
}
