import { useRef } from 'react';
import { Link } from 'react-router-dom';
import './CustomInputNumber.styles.scss';

export const CustomInputNumber = (props) => {
  // const [value, setValue] = useState(100);

  // Ref to Number Input
  const inputEl = useRef(null);
  const stepUp = () => {
    // inputEl.current.stepUp();
    // setValue((value) => value + 1);
  };
  const stepDown = () => {
    // inputEl.current.stepDown();
    // setValue((value) => value - 1);
  };

  // const handleChange = () => {
  //   setValue(value);
  // };
  return (
    <div className="custom-input-number">
      {props?.noLabel ? (
        <></>
      ) : (
        <div className="custom-input-number__label">
          <p>{props?.label}</p>
          <Link to={props?.link.path}>{props?.link?.text}</Link>
        </div>
      )}
      <div
        className="custom-input-number__container"
        onClick={() => inputEl?.current?.focus()}
      >
        <div className="custom-input-number__container-value">
          <input
            {...props?.input}
            value={props?.value || props?.input?.value}
            onChange={props?.onChange || props?.input?.onChange}
            onBlur={() => {}}
            placeholder={props?.placeholder ? props?.placeholder : props?.label}
            className="custom-input-number__input"
            ref={inputEl}
            pattern={props?.pattern}
            type="number"
            style={
              props.icon
                ? {
                    background: `url(${props?.icon}) no-repeat scroll 7px 7px`,
                    paddingLeft: '45px',
                    backgroundPosition: '11px 50%',
                  }
                : {}
            }
            readOnly={props?.readOnly}
          />
          <div className="custom-input-number__postfix">lbs</div>
        </div>
        {!props?.showSteps ? (
          <></>
        ) : (
          <div className="custom-input-number__buttons">
            <button type="button" onClick={() => stepUp()}>
              <img src="/img/button/arrow-up.png" alt="arrow-up" />
            </button>
            <button
              type="button"
              onClick={() => stepDown()}
              // disabled={value <= 0}
            >
              <img src="/img/button/arrow-down.png" alt="arrow-down" />
            </button>
          </div>
        )}
      </div>
      {props?.meta &&
        props?.meta?.error &&
        props?.meta?.touched(
          <div className="custom-select__error">{props?.meta?.error}</div>
        )}
    </div>
  );
};
