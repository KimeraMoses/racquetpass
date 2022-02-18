import './HeadingButton.styles.scss';

export function HeadingButton({ close, text }) {
  return (
    <div className={`heading-button ${text ? 'heading-button-text' : ''}`}>
      <button className="heading-button__btn">
        {close ? <img src="/img/button/close.png" /> : <></>}
        {text ? text : <></>}
      </button>
    </div>
  );
}
