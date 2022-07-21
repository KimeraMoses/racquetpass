import "./Button.styles.scss";

export const Button = ({ isDark, children, onClick, className, disabled }) => {
  return (
    <div className={`button-container ${className}`}>
      <button
        disabled={disabled}
        onClick={onClick}
        className={`button
      ${isDark ? "button-dark" : "button-light"}
      `}
      >
        {children}
      </button>
    </div>
  );
};
