import './SubmitButton.styles.scss';

export const SubmitButton = ({
  children,
  className,
  type,
  disabled,
  onClick,
}) => {
  return (
    <div className="submit-button">
      <button
        className={`submit-button__btn ${className}`}
        disabled={disabled}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </div>
  );
};
