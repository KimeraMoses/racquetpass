import { React } from 'react';
import './CloseButton.styles.scss';

export function CloseButton() {
  return (
    <div className="close-button">
      <button className="close-button__btn">
        <img src="/img/button/close.png" />
      </button>
    </div>
  );
}
