import './AccountButton.styles.scss';

export const AccountButton = ({
  facebook,
  google,
  apple,
  children,
  handleClick = () => {},
}) => {
  const text = facebook ? 'Facebook' : apple ? 'Apple' : 'Google';
  return (
    <button
      className={`account-btn ${facebook && 'account-btn-fb'} ${
        google && 'account-btn-google'
      } ${apple && 'account-btn-apple'}`}
      onClick={handleClick}
    >
      <div className="account-btn__placeholder"></div>
      <div className="account-btn__text">Create with&nbsp;{text}</div>
      <div className="account-btn__icon">
        {facebook && (
          <img src="/img/button/facebook-icon.png" alt="login-with-facebook" />
        )}
        {google && (
          <img src="/img/button/google-icon.png" alt="login-with-google" />
        )}
        {apple && (
          <img src="/img/button/apple-icon.png" alt="login-with-apple" />
        )}
      </div>
      {children}
    </button>
  );
};
