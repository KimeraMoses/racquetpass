import './Button.styles.scss';

export const Button = ({ isDark, children }) => {
  return (
    <div className="button-container">
      <button
        className={`button
      ${isDark ? 'button-dark' : 'button-light'}
      `}
      >
        {children}
      </button>
    </div>
  );
};
