import { Field } from 'redux-form';

// Custom Components
import { Heading, Description, CloseButton, CustomInput } from 'web/components';

// Styles
import './AboutRacquet.styles.scss';

export function AboutRacquet({ t }) {
  return (
    <>
      <div className="about-section">
        <div className="about-section__heading">
          <Heading customClass="about-section__heading-text">
            {t('odrAboutHeading')}
          </Heading>
          <CloseButton />
        </div>
        <div className="about-section__text-container">
          <Description customClass="about-section__text-container-text">
            {t('odrAboutDesc')}
          </Description>
        </div>
        <div className="about-section__form-container">
          <Field
            name="brand"
            label="Brand (Optional)"
            placeholder="Brand"
            type="text"
            component={CustomInput}
          />
          <Field
            name="model"
            label="Model (Optional)"
            type="text"
            component={CustomInput}
          />
        </div>
      </div>
    </>
  );
}
