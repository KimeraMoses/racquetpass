
import './BackButton.styles.scss';

export function BackButton() {
  return (
    <div className="back-button">
      <button className="back-button__btn">
        <img src="/img/button/arrow-left.png" alt="left" />
      </button>
    </div>
  );
}
