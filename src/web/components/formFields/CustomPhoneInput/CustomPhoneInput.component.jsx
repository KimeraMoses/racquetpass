import { useState } from 'react';
import { CustomInput } from '../CustomInput/CustomInput.component';

// Phone Validation
const formats = '(999) 999-9999|(999)999-9999|999-999-9999|9999999999';
const r = RegExp(
  '^(' + formats.replace(/([()])/g, '\\$1').replace(/9/g, '\\d') + ')$'
);
const phoneValidation = (value) => {
  if (r.test(value) === true) {
    return undefined;
  } else {
    return 'Please enter a valid phone number.';
  }
};

export const CustomPhoneInput = ({ name, label, value, change }) => {
  const [touched, setTouched] = useState(false);
  return (
    <CustomInput
      name={name}
      label={label}
      value={value}
      type="tel"
      pattern="\d*"
      placeholder="(323) 323-3323"
      customOnBlur={(e) => {
        setTouched(true);
      }}
      meta={{
        touched,
        error: !value
          ? 'Field is required'
          : phoneValidation(value) !== undefined
          ? phoneValidation(value)
          : '',
      }}
      customOnChange={(e) => {
        const value = e?.target?.value;
        if (value && value?.length === 10 && !isNaN(Number(value))) {
          const formattedNumber = `(${value.substring(
            0,
            3
          )}) ${value?.substring(3, 6)}-${value?.substring(6, 10)}`;
          change(name, formattedNumber);
        } else {
          change(name, value);
        }
      }}
    />
  );
};
