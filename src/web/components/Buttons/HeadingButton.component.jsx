import './HeadingButton.styles.scss';

export function HeadingButton({ drawer, close, text, onClick, add }) {
  return (
    <div
      className={`heading-button ${text ? 'heading-button-text' : ''} ${
        add ? 'heading-button-add' : ''
      }`}
    >
      <button className="heading-button__btn" onClick={onClick}>
        {close ? (
          <img src="/img/button/close.png" />
        ) : (
          <img src="/img/button/menu.png" />
        )}
        {text ? text : <></>}
        {drawer ? (
          <img src="/img/button/drawer.png" onClick={onClick} />
        ) : (
          <></>
        )}
        {add ? <img src="/img/button/add.png" onClick={onClick} /> : <></>}
      </button>
    </div>
  );
}
