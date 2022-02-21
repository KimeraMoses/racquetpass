import { useState } from 'react';
import './PaymentButton.styles.scss';

export const PaymentButton = ({
  children,
  isDark,
  className,
  handleClick,
  active,
}) => {
  return (
    <button
      className={`payment-button ${isDark ? 'payment-button-dark' : ''} ${
        className ? className : ''
      }
      ${active ? 'payment-button-active' : ''}
      `}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
