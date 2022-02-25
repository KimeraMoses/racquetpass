import './PaymentCard.styles.scss';

export const PaymentCard = ({ cardType, title, ending, lastUsed, onClick }) => {
  let img;
  switch (cardType) {
    case 'visa':
      img = '/img/cards/visa.png';
      break;
    case 'mastercard':
      img = '/img/cards/mastercard.png';
      break;
    case 'american':
      img = '/img/cards/american.png';
      break;
    case 'paypal':
      img = '/img/cards/paypal.png';
      break;
    default:
      img = '/img/cards/visa.png';
      break;
  }
  return (
    <div className="payment-card" onClick={onClick}>
      <div className="payment-card__left">
        <div className="payment-card__left-image">
          <img src={img} alt={cardType} />
        </div>
        <div className="payment-card__left-text">
          <div className="payment-card__left-text-heading">{title}</div>
          <div className="payment-card__left-text-desc">
            {`Ends with ${ending}`}
          </div>
        </div>
      </div>
      <div className="payment-card__right">
        {lastUsed ? (
          <div className="payment-card__right-last">{lastUsed}</div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
