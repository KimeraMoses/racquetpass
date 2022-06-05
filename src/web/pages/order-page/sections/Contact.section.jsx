import { Field } from 'redux-form';
// Custom Components
import {
  Heading,
  SubHeading,
  Description,
  HeadingButton,
  CustomInput,
} from 'web/components';
import { BackButton } from 'web/components/Buttons/BackButton.component';

// Styles
import './Contact.styles.scss';

export function Contact({ t, backward }) {
  return (
    <>
      <div className="contact-section-odr">
        <div className="contact-section-odr__heading">
          <BackButton onClick={backward} />
          <Heading customClass="contact-section-odr__heading-text">
            {t('odrStayHeading')}
          </Heading>
          {/* <HeadingButton close onClick={backward} /> */}
        </div>
        <div className="contact-section-odr__text-container">
          <Description customClass="contact-section-odr__text-container-text">
            {t('odrStayDesc')}
          </Description>
        </div>
        <div className="contact-section-odr__form-container">
          <Field
            name="first-name"
            label="First Name"
            type="text"
            component={CustomInput}
          />
          <Field
            name="last-name"
            label="Last Name"
            type="text"
            component={CustomInput}
          />
          <Field
            name="phone-number"
            label="Phone Number"
            type="text"
            component={CustomInput}
          />
          <Description>{t('selectStringContact')}</Description>
        </div>
      </div>
    </>
  );
}
