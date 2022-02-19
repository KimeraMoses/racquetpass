import './CustomInput.styles.scss';

export const CustomInput = (props) => {
  console.log(props);
  return (
    <div className="custom-input">
      {props.noLabel ? (
        <></>
      ) : (
        <div className="custom-input__label">{props.label}</div>
      )}
      <input
        {...props.input}
        placeholder={props.placeholder ? props.placeholder : props.label}
        className="custom-input__input"
        onBlur={props.onBlur}
        onClick={props.onClick}
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
      {props.meta &&
        props.meta.error &&
        props.meta.touched(
          <div className="custom-input__error">{props.meta.error}</div>
        )}
    </div>
  );
};
