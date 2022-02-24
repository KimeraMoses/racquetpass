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

export function StringType({ t, setStep, hybrid, setHybrid }) {
  const handleChange = (hybrid) => {
    setHybrid(hybrid);
  };
  return (
    <>
      <div className="string-type">
        <div>
          <div className="string-type__header">
            <div className="string-type__header">
              <Heading customClass="string-type__header-heading">
                {t('configStringHead')}
              </Heading>
            </div>
            <HeadingButton close onClick={() => setStep(3)} />
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
            <CustomSwitch handleChange={handleChange} checked={hybrid} />
          </div>
        </div>
        <div className="string-type__buttons">
          <StepButton
            outlined
            className="string-type__buttons-btn"
            onClick={() => setStep(3)}
          >
            {t('odrBack')}
          </StepButton>
          <StepButton
            className="string-type__buttons-btn"
            onClick={() => setStep(5)}
          >
            {t('configButtonRacquet')}
          </StepButton>
        </div>
      </div>
    </>
  );
}
