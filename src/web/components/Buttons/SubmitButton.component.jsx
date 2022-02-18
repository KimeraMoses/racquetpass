import './SubmitButton.styles.scss';

export const SubmitButton = ({ children, className }) => {
  return (
    <div className="submit-button">
      <button className={`submit-button__btn ${className}`}>{children}</button>
    </div>
  );
};
