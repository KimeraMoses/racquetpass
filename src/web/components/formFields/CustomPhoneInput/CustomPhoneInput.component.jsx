import { Link } from 'react-router-dom';
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './CustomPhoneInput.styles.scss';

export const CustomPhoneInput = (props) => {
  const { touched, error } = props?.meta
    ? props?.meta
    : { touched: false, error: false };
  console.log(props.input);
  return (
    <div className="custom-phone-input">
      <div className="custom-phone-input__header">
        {props.noLabel ? (
          <></>
        ) : (
          <div className="custom-phone-input__header-label">{props.label}</div>
        )}
        {props.link ? (
          <>
            <div className="custom-phone-input__header-link">
              <Link to="#" className="custom-phone-input__header-link-lnk">
                {props.link}
              </Link>
            </div>
          </>
        ) : (
          <></>
        )}
        {touched && error && (
          <div className="custom-phone-input__header-error">{error}</div>
        )}
        {props.isPasswordField && (
          <button
            className="custom-phone-input__header-show"
            type="button"
            onClick={() => {
              props.switchPasswordShow();
            }}
          >
            {props.type === 'password' ? 'Show' : 'Hide'}
          </button>
        )}
      </div>
      <PhoneInput
        defaultCountry="US"
        international={false}
        placeholder="Enter phone number"
        {...props.input}
        className={`custom-phone-input__input ${
          (touched && error) || isValidPhoneNumber(props?.input?.value)
            ? 'custom-phone-input__input-error'
            : ''
        }`}
        // value={value}
        // onChange={setValue}
        // error={value ? (isValidPhoneNumber(value) ? undefined : 'Invalid phone number') : 'Phone number required'}
      />
      {/* <input
        {...props.input}
        placeholder={props.placeholder ? props.placeholder : props.label}
        className={`custom-phone-input__input ${
          touched && error ? 'custom-phone-input__input-error' : ''
        }`}
        onClick={props.onClick}
        type={props.type}
        onBlur={(e) => {
          props.input.onBlur(e);
          if (props?.customOnBlur) {
            props?.customOnBlur(e);
          }
        }}
        ref={(input) => {
          if (props.setFieldToBeFocused) {
            props.setFieldToBeFocused(input);
          }
        }}
        style={
          props.icon
            ? {
                background: `url(${props.icon}) no-repeat scroll 7px 7px`,
                paddingLeft: '45px',
                backgroundPosition: '11px 50%',
              }
            : {}
        }
      /> */}
      {/* {props.meta.error && props.meta.touched && (
        <div className="custom-phone-input__error">{props.meta.error}</div>
      )} */}
    </div>
  );
};
