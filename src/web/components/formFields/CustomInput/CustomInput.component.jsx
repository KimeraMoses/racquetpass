import { Link } from 'react-router-dom';
import './CustomInput.styles.scss';

export const CustomInput = (props) => {
  const { visited, error } = props?.meta
    ? props?.meta
    : { visited: false, error: false };
  return (
    <div className="custom-input">
      <div className="custom-input__header">
        {props.noLabel ? (
          <></>
        ) : (
          <div className="custom-input__header-label">{props.label}</div>
        )}
        {props.link ? (
          <>
            <div className="custom-input__header-link">
              <Link to="#" className="custom-input__header-link-lnk">
                {props.link}
              </Link>
            </div>
          </>
        ) : (
          <></>
        )}
        {visited && error && (
          <div className="custom-input__header-error">{error}</div>
        )}
        {props.isPasswordField && (
          <button
            className="custom-input__header-show"
            type="button"
            onClick={() => {
              props.switchPasswordShow();
            }}
          >
            {props.type === 'password' ? 'Show' : 'Hide'}
          </button>
        )}
      </div>
      <input
        {...props.input}
        placeholder={props.placeholder ? props.placeholder : props.label}
        className={`custom-input__input ${
          visited && error ? 'custom-input__input-error' : ''
        }`}
        onBlur={props.onBlur}
        onClick={props.onClick}
        type={props.type}
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
      />
      {/* {props.meta.error && props.meta.visited && (
        <div className="custom-input__error">{props.meta.error}</div>
      )} */}
    </div>
  );
};
