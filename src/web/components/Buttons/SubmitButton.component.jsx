import './SubmitButton.styles.scss';

export const SubmitButton = ({
  children,
  className,
  type,
  disabled,
  onClick,
  outlined,
}) => {
  return (
    <div className="submit-button">
      <button
        className={`submit-button__btn
         ${outlined ? 'button-unfilled' : 'button-filled'}
         ${className ? className : ''}
         `}
        disabled={disabled}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </div>
  );
};
