import "./InfoButton.styles.scss";

export function InfoButton({ onClick }) {
  return (
    <div className="info-button">
      <button className="info-button__btn" type="button" onClick={onClick}>
        <img src="/img/button/info.png" alt="" />
      </button>
    </div>
  );
}
