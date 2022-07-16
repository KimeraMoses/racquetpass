import CurrencyInput from 'react-currency-input-field';
import './CustomCurrencyInput.styles.scss';

export const CustomCurrencyInput = (props) => {
  return (
    <div className="custom-input-money-amount">
      <div className="custom-input-money-amount__header">
        {props?.noLabel ? (
          <></>
        ) : (
          <div className="custom-input-money-amount__header-label">
            {props?.label}
          </div>
        )}
      </div>
      <CurrencyInput
        id="input-example"
        prefix="$"
        name={props?.name}
        placeholder={props?.placeholder ? props?.placeholder : props?.label}
        value={props?.value}
        decimalsLimit={2}
        decimalScale={2}
        onBlur={props?.onBlur}
        onValueChange={(value, name) => {
          if (props?.customOnChange) {
            props?.customOnChange(value);
          }
          console.log(value, name);
        }}
      />
    </div>
  );
};
