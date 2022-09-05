import { useState } from "react";
import { Link } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";
import "./CustomCurrencyInput.styles.scss";

export const CustomCurrencyInput = (props) => {
  console.log(props?.meta);
  const [touched, setTouched] = useState(false);
  return (
    <div className="custom-input-money-amount">
      <div className="custom-input-money-amount__header">
        {props?.noLabel ? (
          <></>
        ) : (
          <>
            <div className="custom-input-money-amount__header-label">
              {props?.label}
            </div>
            {props?.link ? (
              <div
                onClick={props?.link?.onClick}
                className="custom-input-money-amount__header-switch"
              >
                {props?.link?.text}
              </div>
            ) : (
              <></>
            )}
          </>
        )}
        {touched && props?.required && (
          <div className="custom-input__header-error">{props?.error}</div>
        )}
      </div>
      <CurrencyInput
        id="input-example"
        prefix={!props?.link?.isPercentage ? "$" : null}
        suffix={props?.link?.isPercentage ? "%" : null}
        name={props?.name}
        placeholder={props?.placeholder ? props?.placeholder : props?.label}
        value={props?.value}
        decimalsLimit={2}
        decimalScale={2}
        onBlur={(e) => {
          if (e?.target?.value) {
            setTouched(false);
            props?.change(props?.name, e?.target?.value);
          } else {
            setTouched(true);
          }
        }}
        onValueChange={(value, name) => {
          setTouched(false);
          if (props?.customOnChange) {
            props?.customOnChange(value);
          }
        }}
      />
    </div>
  );
};
