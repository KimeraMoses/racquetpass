import PropTypes from 'prop-types';
import './CustomButton.styles.scss';

export const CustomButton = ({ btn, disabled, size, children, ...props }) => {
  return (
    <div className="custom-button">
      <button
        {...props}
        disabled={disabled}
        className={`
				${size === 'sm' ? 'btn-sm' : ''}  ${size === 'lg' ? 'btn-lg' : ''}
				${btn === 'primary' ? 'btn-primary' : ''}  ${
          btn === 'secondary' ? 'btn-secondary' : ''
        }
				${btn === 'white' ? 'btn-white' : ''} ${btn === 'danger' ? 'btn-danger' : ''}
				${disabled ? 'btn-disabled' : ''}
			`}
      >
        {children}
      </button>
    </div>
  );
};

CustomButton.defaultProps = {
  disabled: false,
  size: 'sm',
};

CustomButton.propTypes = {
  btn: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
};
