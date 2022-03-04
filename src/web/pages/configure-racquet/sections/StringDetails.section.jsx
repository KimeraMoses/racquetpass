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

export function StringDetails({ t, hybrid, setHybrid, handleShow }) {
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
          </div>
          <div className="string__info">
            <SubHeading>{t('configMains')}</SubHeading>
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
              {t('odrHybrid')}
            </Description>
            <div className="string__swtich-right">
              <CustomSwitch handleChange={handleChange} checked={hybrid} />
              <InfoButton onClick={handleShow} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
