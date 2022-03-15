import { Field } from 'redux-form';
// Custom Components
import {
  Heading,
  SubHeading,
  Description,
  HeadingButton,
  CustomInput,
} from 'web/components';

// Styles
import './Contact.styles.scss';

export function Contact({ t, backward }) {
  return (
    <>
      <div className="contact-section">
        <div>
          <div className="contact-section__heading">
            <Heading customClass="contact-section__heading-text">
              {t('odrStayHeading')}
            </Heading>
          </div>
          <div className="contact-section__text-container">
            <Description customClass="contact-section__text-container-text">
              {t('odrStayDesc')}
            </Description>
          </div>
          <div className="contact-section__form-container">
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
          </div>
        </div>
        <div className=" "></div>
      </div>
    </>
  );
}
