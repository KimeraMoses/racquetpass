import { React } from 'react';
import './CustomInput.styles.scss';

export const CustomInput = (props) => {
  return (
    <div className="custom-input">
      <div className="custom-input__label">{props.label}</div>
      <input
        {...props.input}
        placeholder={props.label}
        type="text"
        className="custom-input__input"
      />
      {props.meta &&
        props.meta.error &&
        props.meta.touched(
          <div className="custom-input__error">{props.meta.error}</div>
        )}
    </div>
  );
};
