import { Link } from 'react-router-dom';
import './CustomOrderSelect.styles.scss';

export const CustomOrderSelect = (props) => {
  return (
    <div className="custom-select">
      {props.noLabel ? (
        <></>
      ) : (
        <div className="custom-select__label">{props.label}</div>
      )}
      <div className="custom-select__container">
        <input
          {...props.input}
          placeholder={props.placeholder ? props.placeholder : props.label}
          className="custom-select__input"
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
        <Link to="#">Select</Link>
      </div>
      {props.meta &&
        props.meta.error &&
        props.meta.touched(
          <div className="custom-select__error">{props.meta.error}</div>
        )}
    </div>
  );
};
