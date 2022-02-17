import './Button.styles.scss';

export const Button = ({ isDark, children }) => {
  return (
    <div className="buttonContainer">
      <button
        className={`button
      ${isDark ? 'buttonDark' : 'buttonLight'}
      `}
      >
        {children}
      </button>
    </div>
  );
};
