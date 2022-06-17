import { Link } from 'react-router-dom';
import './CustomInput.styles.scss';

export const CustomInput = (props) => {
  const { touched, error } = props?.meta
    ? props?.meta
    : { touched: false, error: false };
  return (
    <div className="custom-input">
      <div className="custom-input__header">
        {props?.noLabel ? (
          <></>
        ) : (
          <div className="custom-input__header-label">{props?.label}</div>
        )}
        {props?.link ? (
          <>
            <div className="custom-input__header-link">
              <Link to="#" className="custom-input__header-link-lnk">
                {props?.link}
              </Link>
            </div>
          </>
        ) : (
          <></>
        )}
        {touched && error && (
          <div className="custom-input__header-error">{error}</div>
        )}
        {props?.isPasswordField && (
          <button
            className="custom-input__header-show"
            type="button"
            onClick={() => {
              props?.switchPasswordShow();
            }}
          >
            {props?.type === 'password' ? 'Show' : 'Hide'}
          </button>
        )}
      </div>
      <input
        {...props?.input}
        placeholder={props?.placeholder ? props?.placeholder : props?.label}
        className={`custom-input__input ${
          touched && error ? 'custom-input__input-error' : ''
        }`}
        onClick={props?.onClick}
        type={props?.type}
        onBlur={(e) => {
          if (props?.input) {
            props.input.onBlur(e);
          }
          if (props?.customOnBlur) {
            props?.customOnBlur(e);
          }
        }}
        value={props?.value ? props?.value : props?.input?.value}
        onChange={(e) => {
          props?.input?.onChange(e);
          if (props?.customOnChange) {
            props?.customOnChange(e);
          }
        }}
        ref={(input) => {
          if (props?.setFieldToBeFocused) {
            props.setFieldToBeFocused(input);
          }
        }}
        style={
          props?.icon
            ? {
                background: `url(${props.icon}) no-repeat scroll 7px 7px`,
                paddingLeft: '45px',
                backgroundPosition: '11px 50%',
              }
            : {}
        }
      />
      {/* {props.meta.error && props.meta.touched && (
        <div className="custom-input__error">{props.meta.error}</div>
      )} */}
    </div>
  );
};
