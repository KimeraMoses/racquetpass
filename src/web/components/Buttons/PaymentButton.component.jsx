import "./PaymentButton.styles.scss";

export const PaymentButton = ({
  children,
  isDark,
  className,
  handleClick,
  active,
  style,
  disabled,
}) => {
  return (
    <button
      className={`payment-button ${isDark ? "payment-button-dark" : ""} ${
        className ? className : ""
      }
      ${active ? "payment-button-active" : ""}
      `}
      onClick={handleClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
