import { Field } from 'redux-form';

import {
  Heading,
  HeadingButton,
  SubmitButton,
  CustomInput,
  CustomOrderSelect,
  Description,
  CustomSwitch,
} from 'web/components';

import './EditStringInfo.styles.scss';

export function EditStringInfo({ t, setStrings, setStep }) {
  return (
    <>
      <div className="edit-strings">
        <div>
          <div className="edit-strings__header">
            <div className="edit-strings__header-heading">
              <Heading>{t('editRacquetInfo')}</Heading>
            </div>
            <HeadingButton close onClick={() => setStep(5)} />
          </div>

          <div
            className="edit-racquet__info-buttons"
            onClick={() => setStrings(false)}
          >
            <div className="edit-racquet__info-button">Basic Info</div>
            <div className="edit-racquet__info-button edit-racquet__info-button-active">
              Strings
            </div>
          </div>

          {/* <div className="select-string__main-info"> */}
          <div className="edit-strings__info-select">
            <CustomOrderSelect label="String Type" link="Select" />
            <Field
              name="tension"
              label="Tension"
              type="text"
              link="Change Units"
              component={CustomInput}
            />
          </div>
          <div className="edit-strings__swtich">
            <Description customClass="edit-strings__swtich-text">
              {t('stringDetailsHybrid')}
            </Description>
            <Field name="hybrid" component={CustomSwitch} />
          </div>
        </div>
        <div className="edit-strings__button">
          <SubmitButton onClick={() => setStep(5)}>
            {t('stringDetailsSave')}
          </SubmitButton>
        </div>
      </div>
    </>
  );
}
