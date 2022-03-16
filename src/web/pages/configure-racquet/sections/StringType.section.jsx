import { Field } from 'redux-form';

import {
  Heading,
  HeadingButton,
  CustomInput,
  Description,
  CustomSwitch,
  InfoButton,
} from 'web/components';

import './StringType.styles.scss';

export function StringType({ t, setStep, hybrid, setHybrid, handleShow }) {
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
          </div>
          <div className="string-type__mains">
            <Heading>{t('odrMain')}</Heading>
          </div>
          <div className="string-type__form">
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
              link="Change Units"
              component={CustomInput}
            />
          </div>
          <div className="string-type__cross">
            <Heading>{t('odrcross')}</Heading>
          </div>
          <div className="string-type__form">
            <Field
              name="crossStringType"
              label="String Type"
              type="text"
              component={CustomInput}
            />
            <Field
              name="crossStringTension"
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
