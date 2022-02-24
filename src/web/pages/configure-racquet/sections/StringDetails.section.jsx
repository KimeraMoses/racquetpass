import { Field } from 'redux-form';

import {
  Heading,
  HeadingButton,
  Description,
  SubHeading,
  CustomInput,
  InfoButton,
  CustomSwitch,
  StepButton,
} from 'web/components';

import './StringDetails.styles.scss';

export function StringDetails({ t }) {
  return (
    <>
      <div className="string">
        <div>
          <div className="string__header">
            <div className="string__header-heading">
              <Heading>{t('configStringHeading')}</Heading>
            </div>
            <HeadingButton close />
          </div>
          <div className="string__info">
            <SubHeading>{t('configMains')}</SubHeading>

            <InfoButton />
          </div>
          <div className="string__form">
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
              component={CustomInput}
            />
          </div>
          <div className="string__swtich">
            <Description customClass="string__swtich-text">
              {t('configStringSwitch')}
            </Description>
            <Field name="hybrid" component={CustomSwitch} />
          </div>
        </div>
        <div className="string__buttons">
          <StepButton outlined className="string__buttons-btn">
            {t('odrBack')}
          </StepButton>
          <StepButton className="string__buttons-btn">
            {t('configButtonRacquet')}
          </StepButton>
        </div>
      </div>
    </>
  );
}
