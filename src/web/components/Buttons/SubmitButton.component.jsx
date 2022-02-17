import './SubmitButton.styles.scss';

export const SubmitButton = ({ children }) => {
  return (
    <div className="submit-button">
      <button className="submit-button__btn">{children}</button>
    </div>
  );
};
