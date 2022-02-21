import './Button.styles.scss';

export const Button = ({ isDark, children, onClick }) => {
  return (
    <div className="button-container">
      <button
        onClick={onClick}
        className={`button
      ${isDark ? 'button-dark' : 'button-light'}
      `}
      >
        {children}
      </button>
    </div>
  );
};
