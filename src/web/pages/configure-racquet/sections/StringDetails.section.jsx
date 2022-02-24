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

export function StringDetails({ t, setStep, hybrid, setHybrid, handleShow }) {
  const handleChange = (value) => {
    setHybrid(value);
  };

  return (
    <>
      <div className="string">
        <div>
          <div className="string__header">
            <div className="string__header-heading">
              <Heading>{t('configStringHeading')}</Heading>
            </div>
            <HeadingButton close onClick={() => setStep(3)} />
          </div>
          <div className="string__info">
            <SubHeading>{t('configMains')}</SubHeading>

            <InfoButton onClick={handleShow} />
          </div>
          <div className="string__form">
            <Field
              name="stringType"
              label="String Type"
              type="text"
              component={CustomInput}
            />
            <Field
              name="stringTension"
              label="Tension"
              type="text"
              component={CustomInput}
            />
          </div>
          <div className="string__swtich">
            <Description customClass="string__swtich-text">
              {t('configStringSwitch')}
            </Description>
            <CustomSwitch handleChange={handleChange} checked={hybrid} />
          </div>
        </div>
        <div className="string__buttons">
          <StepButton
            outlined
            className="string__buttons-btn"
            onClick={() => setStep(3)}
          >
            {t('odrBack')}
          </StepButton>
          <StepButton
            className="string__buttons-btn"
            onClick={() => setStep(5)}
          >
            {t('configButtonRacquet')}
          </StepButton>
        </div>
      </div>
    </>
  );
}
