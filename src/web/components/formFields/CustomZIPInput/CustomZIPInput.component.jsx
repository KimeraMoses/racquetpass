import { useState } from 'react';
import { CustomInput } from '../CustomInput/CustomInput.component';

// ZIP Validation
const zipValidation = (value) => {
  if (value?.length < 3 || value?.length > 7) {
    return 'Please enter value between 3 and 7 digits';
  } else {
    return undefined;
  }
};

export const CustomZIPInput = ({
  name,
  label,
  value,
  change,
  optional,
  placeholder,
}) => {
  const [touched, setTouched] = useState(false);
  console.log(value);
  console.log(zipValidation(value));
  return (
    <CustomInput
      name={name}
      label={label}
      value={value}
      type="number"
      pattern="\d*"
      placeholder={placeholder ? placeholder : label}
      customOnBlur={(e) => {
        setTouched(true);
      }}
      meta={{
        touched:
          touched ||
          (value?.length && (value?.length < 3 || value?.length > 7)),
        error:
          !optional && !value
            ? 'Field is required'
            : zipValidation(value) !== undefined
            ? zipValidation(value)
            : '',
      }}
      customOnChange={(e) => {
        const value = e?.target?.value;
        if (value?.length > 7) {
          return;
        } else {
          change('zip-code', value);
        }
      }}
    />
  );
};
