import './Button.styles.scss';

export const Button = ({ text, isDark }) => {
  return (
    <div className="buttonContainer">
      <button
        className={`button
      ${isDark ? 'buttonDark' : 'buttonLight'}
      `}
      >
        {text}
      </button>
    </div>
  );
};
