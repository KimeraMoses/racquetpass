import { Field } from 'redux-form';

import {
  Heading,
  HeadingButton,
  CustomInput,
  Description,
  CustomSwitch,
  StepButton,
} from 'web/components';

import './StringType.styles.scss';

export function StringType({ t }) {
  return (
    <>
      <div className="string-type">
        {' '}
        <div className="string-type__header">
          <div className="string-type__header">
            <Heading customClass="string-type__header-heading">
              {t('configStringHead')}
            </Heading>
          </div>
          <HeadingButton close />
        </div>
        <div className="string-type__mains">
          <Heading>{t('odrMain')}</Heading>
        </div>
        <div className="string-type__form">
          <Field
            name="string-type"
            label="String Type"
            type="text"
            component={CustomInput}
          />
          <Field
            name="tension"
            label="Tension"
            type="text"
            link="Change Units"
            component={CustomInput}
          />
        </div>
        <div className="string-type__cross">
          <Heading>{t('odrcross')}</Heading>
        </div>
        <div className="string-type__form">
          <Field
            name="string-type"
            label="String Type"
            type="text"
            component={CustomInput}
          />
          <Field
            name="tension"
            label="Tension"
            type="text"
            link="Change Units"
            component={CustomInput}
          />
        </div>
        <div className="string-type__swtich">
          <Description customClass="string-type__swtich-text">
            {t('stringDetailsHybrid')}
          </Description>
          <Field name="hybrid" component={CustomSwitch} />
        </div>
        <div className="string-type__buttons">
          <StepButton outlined className="string-type__buttons-btn">
            {t('odrBack')}
          </StepButton>
          <StepButton className="string-type__buttons-btn">
            {t('configButtonRacquet')}
          </StepButton>
        </div>
      </div>
    </>
  );
}
