import './HeadingButton.styles.scss';

export function HeadingButton({
  drawer,
  close,
  text,
  onClick,
  add,
  height,
  width,
}) {
  return (
    <div
      className={`heading-button ${text ? 'heading-button-text' : ''} ${
        add ? 'heading-button-add' : ''
      }`}
      style={{ height, width }}
    >
      <button
        className="heading-button__btn"
        onClick={onClick}
        style={{ height, width }}
      >
        {close ? <img src="/img/button/close.png" /> : <></>}
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
