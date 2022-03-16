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
      style={close ? { height: '48px', width: '48px' } : { height, width }}
    >
      <button
        className="heading-button__btn"
        type="button"
        onClick={onClick}
        style={close ? { height: '48px', width: '48px' } : { height, width }}
      >
        {close ? <img src="/img/button/close.png" onClick={onClick} /> : <></>}
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
