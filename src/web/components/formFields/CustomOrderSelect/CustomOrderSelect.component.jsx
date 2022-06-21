import { Link } from 'react-router-dom';
import './CustomOrderSelect.styles.scss';

export const CustomOrderSelect = (props) => {
  return (
    <div
      className={`custom-order-select ${
        props?.placeholderBold ? 'custom-order-select-bold' : ''
      }`}
    >
      {props.noLabel ? (
        <></>
      ) : (
        <div className="custom-order-select__label">{props.label}</div>
      )}
      <div className="custom-order-select__container">
        <input
          {...props.input}
          placeholder={props.placeholder ? props.placeholder : props.label}
          className="custom-order-select__input"
          onClick={props.onSelectClick}
          style={
            props.icon
              ? {
                  background: `url(${props.icon}) no-repeat scroll 7px 7px`,
                  paddingLeft: '45px',
                  backgroundPosition: '11px 50%',
                }
              : {}
          }
          value={props.value}
        />
        <Link to="#" onClick={props.onSelectClick}>
          {props.link}
        </Link>
      </div>
      {props.meta &&
        props.meta.error &&
        props.meta.touched(
          <div className="custom-order-select__error">{props.meta.error}</div>
        )}
    </div>
  );
};
