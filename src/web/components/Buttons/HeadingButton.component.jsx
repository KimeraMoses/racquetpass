import './HeadingButton.styles.scss';

export function HeadingButton({ close, text, onClick }) {
  return (
    <div className={`heading-button ${text ? 'heading-button-text' : ''}`}>
      <button className="heading-button__btn" onClick={onClick}>
        {close ? <img src="/img/button/close.png" /> : <></>}
        {text ? text : <></>}
      </button>
    </div>
  );
}
