import './StepButton.styles.scss';

export const StepButton = ({ outlined, children, type, onClick, disabled, className }) => {
  return (
    <div className="button-container">
      <button
        className={`button-step
      ${outlined ? 'button-unfilled' : 'button-filled'}
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
