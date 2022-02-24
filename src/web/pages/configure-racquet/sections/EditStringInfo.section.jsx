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

export function EditStringInfo({ t }) {
  return (
    <>
      <div className="edit">
        <div className="edit__header">
          <div className="edit__header-heading">
            <Heading>{t('editRacquetInfo')}</Heading>
          </div>
          <HeadingButton close />
        </div>
        <div className="edit__info-buttons">Two Buttons</div>
        {/* <div className="select-string__main-info"> */}
        <div className="edit__info-select">
          <CustomOrderSelect label="String Type" link="Select" />
          <Field
            name="tension"
            label="Tension"
            type="text"
            link="Change Units"
            component={CustomInput}
          />
        </div>
        <div className="edit__swtich">
          <Description customClass="edit__swtich-text">
            {t('stringDetailsHybrid')}
          </Description>
          <Field name="hybrid" component={CustomSwitch} />
        </div>
        <div className="edit__button">
          <SubmitButton>{t('stringDetailsSave')}</SubmitButton>
        </div>
      </div>
    </>
  );
}
