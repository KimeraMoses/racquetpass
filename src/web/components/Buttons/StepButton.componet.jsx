import './StepButton.styles.scss';

export const StepButton = ({
  outlined,
  children,
  type,
  onClick,
  disabled,
  className,
  danger,
}) => {
  return (
    <div className="button-container">
      <button
        className={`button-step
      ${outlined ? 'button-unfilled' : 'button-filled'}
      ${danger ? 'button-danger' : 'button-unfilled'}
      ${className ? className : ''}
      `}
        disabled={disabled}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};
