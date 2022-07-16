import "./PaymentButton.styles.scss";

export const PaymentButton = ({
  children,
  isDark,
  className,
  handleClick,
  active,
  style,
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
    >
      {children}
    </button>
  );
};
