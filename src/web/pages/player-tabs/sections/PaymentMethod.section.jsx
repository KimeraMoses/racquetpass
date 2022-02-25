import { Heading, HeadingButton } from 'web/components';
import { PaymentCard } from 'web/components/index';
import './PaymentMethod.styles.scss';

export function PaymentMethod({ t, setCurrent }) {
  return (
    <>
      <div className="payment">
        <div className="payment__header">
          <HeadingButton drawer onClick={() => setCurrent('drawer')} />
          <Heading>{t('paymentHeading')}</Heading>
        </div>
        <div className="payment__cards">
          <PaymentCard
            cardType="visa"
            title="My tennis card"
            ending="5432"
            lastUsed="02 Dec 2021"
            onClick={() => setCurrent('cardDetails')}
          />
          <PaymentCard
            cardType="paypal"
            title="My Card"
            ending="1234"
            onClick={() => setCurrent('cardDetails')}
          />
        </div>
      </div>
    </>
  );
}
