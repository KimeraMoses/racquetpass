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

const required = (value) => (value ? undefined : 'Required');
// Phone Validation
const formats = '(999)999-9999|999-999-9999|9999999999';
const r = RegExp(
  '^(' + formats.replace(/([\(\)])/g, '\\$1').replace(/9/g, '\\d') + ')$'
);
const phoneNumber = (value) => {
  if (r.test(value) === true) {
    return undefined;
  } else {
    return 'Please enter a valid phone number.';
  }
};

export function Contact({ t, backward, change }) {
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
            validate={required}
            component={CustomInput}
          />
          <Field
            name="last-name"
            label="Last Name"
            type="text"
            validate={required}
            component={CustomInput}
          />
          <Field
            name="phone-number"
            label="Phone Number"
            type="tel"
            placeholder="(323)323-3323"
            validate={[required, phoneNumber]}
            component={(props) => (
              <CustomInput
                {...props}
                customOnChange={(e) => {
                  const value = e?.target?.value;
                  if (value && value?.length === 10 && !isNaN(Number(value))) {
                    const formattedNumber = `(${value.substring(
                      0,
                      3
                    )})${value?.substring(3, 6)}-${value?.substring(6, 10)}`;
                    change('phone-number', formattedNumber);
                  } else {
                    change('phone-number', value);
                  }
                }}
              />
            )}
          />
          <Description>{t('selectStringContact')}</Description>
        </div>
      </div>
    </>
  );
}
