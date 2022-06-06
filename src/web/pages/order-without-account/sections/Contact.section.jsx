import { Field } from 'redux-form';
// Custom Components
import { Heading, Description, BackButton, CustomInput } from 'web/components';

// Styles
import './Contact.styles.scss';

export function Contact({ t, setStep }) {
  return (
    <>
      <div className="contact-section">
        <div>
          <div className="contact-section__heading flex items-center justify-start gap-[16px]">
            <BackButton onClick={() => setStep(5)} />
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
      </div>
    </>
  );
}
