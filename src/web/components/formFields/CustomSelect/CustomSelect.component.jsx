import { useState } from 'react';
import Select from 'react-select';
import './CustomSelect.styles.scss';

export const CustomSelect = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const { visited, error } = props?.meta
    ? props?.meta
    : { visited: false, error: false };
  return (
    <div className="custom-select">
      <div className="custom-select__header">
        {props?.noLabel ? (
          <></>
        ) : (
          <div className="custom-select__header-label">{props.label}</div>
        )}
        {visited && error && (
          <div className="custom-select__header-error">{error}</div>
        )}
      </div>
      <Select
        {...props.input}
        options={props.options}
        placeholder={props.placeholder ? props.placeholder : props.label}
        value={props?.value || selectedOption}
        onBlur={() => {}}
        onChange={(option) => {
          if (props?.showInitials) {
            setSelectedOption({ label: option?.value, value: option?.value });
          } else {
            setSelectedOption(option);
          }
          if (props?.customOnChange) {
            props?.customOnChange(option);
          }
        }}
        isSearchable={false}
        className="custom-select__select"
      />
    </div>
  );
};
