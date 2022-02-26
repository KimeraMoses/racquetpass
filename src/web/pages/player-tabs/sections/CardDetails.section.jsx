import { BackButton, HeadingButton, Heading } from 'web/components';
import './CardDetails.styles.scss';

const cardDetails = {
  title: 'My tennis card',
  ending: '5432',
  expiry: '08/2026',
};

export function CardDetails({ t, setCurrent }) {
  const { title, ending, expiry } = cardDetails;
  return (
    <>
      <div className="card-detail">
        <div className="card-detail__header">
          <div className="card-detail__header-drawer-title">
            <BackButton onClick={() => setCurrent('payment')} />
            <Heading>{t('paymentDetailTitle')}</Heading>
          </div>
          <div className="card-detail__header-button ">
            <HeadingButton
              text={'Edit'}
              onClick={() => setCurrent('addCard')}
            />
          </div>
        </div>
        <div className="card-detail__image">
          <img src="/img/cards/visa.png" alt="visa" />
        </div>

        <div className="card-detail__text">
          <div className="card-detail__text-heading">
            {t('paymentCardHeading')}
          </div>
          <div className="card-detail__text-desc">{title}</div>
          <div className="card-detail__text-heading">{t('paymentCardEnd')}</div>
          <div className="card-detail__text-desc">{ending}</div>
          <div className="card-detail__text-heading">{expiry}</div>
          <div className="card-detail__text-desc">{t('paymentExpireDate')}</div>
        </div>
      </div>
    </>
  );
}
