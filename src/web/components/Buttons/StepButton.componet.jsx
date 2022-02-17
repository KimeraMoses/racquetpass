import './StepButton.styles.scss';

export const StepButton = ({ outlined, children }) => {
  return (
    <div className="button-container">
      <button
        className={`button-step
      ${outlined ? 'button-unfilled' : 'button-filled'}
      `}
      >
        {children}
      </button>
    </div>
  );
};
