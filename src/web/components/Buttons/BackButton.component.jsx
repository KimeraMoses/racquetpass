import './BackButton.styles.scss';

export function BackButton({ onClick }) {
  return (
    <div className="back-button">
      <button className="back-button__btn" onClick={onClick}>
        <img src="/img/button/arrow-left.png" alt="left" />
      </button>
    </div>
  );
}
