import {
  HeadingButton,
  OrderCard,
  Heading,
  SubmitButton,
} from 'web/components';
import './OrderDetails.styles.scss';

const orders = {
  liveOrders: [
    {
      title: 'Ole Reliable',
      description: 'Pickup at Jimmy’s Pro Shop',
      status: 'Ready for pickup',
    },
  ],
  pastOrdersThisYear: [
    {
      title: 'Big Red',
      description: 'Jan 1 - Jan 5',
      price: '$37.58',
      shop: `Jimmy's Pro Shop`,
      status: 'previous',
    },
  ],
  pastOrdersPreviousYear: [
    {
      title: 'Big Red',
      description: 'Dec 10 - Dec 12',
      price: '$37.58',
      status: 'previous',
    },
    {
      title: 'Big Red',
      description: 'Dec 20 - Dec 25',
      price: '$37.58',
      status: 'previous',
    },
    {
      title: 'Big Red',
      description: 'Dec 10 - Dec 12',
      price: '$37.58',
      status: 'previous',
    },
    {
      title: 'Big Red',
      description: 'Dec 20 - Dec 25',
      price: '$37.58',
      status: 'previous',
    },
    {
      title: 'Big Red',
      description: 'Dec 20 - Dec 25',
      price: '$37.58',
      status: 'previous',
    },
    {
      title: 'Big Red',
      description: 'Dec 20 - Dec 25',
      price: '$37.58',
      status: 'previous',
    },
  ],
};

export function OrderDetails({ t }) {
  return (
    <>
      <div className="orders">
        <div className="orders__header">
          <HeadingButton drawer />
          <Heading>{t('orderDetailHeading')}</Heading>
        </div>
        <div className="orders__live">
          <div className="orders__live-heading">{t('orderLiveOrder')}</div>
          <div className="orders__live-cards">
            {orders.liveOrders.map((order) => {
              return <OrderCard {...order} />;
            })}
          </div>
        </div>

        <div className="orders__past">
          <div className="orders__past-heading">{t('orderPastYear')}</div>
          <div className="orders__past-cards">
            {orders.pastOrdersThisYear.map((order) => {
              return <OrderCard {...order} />;
            })}
          </div>
        </div>

        <div className="orders__past">
          <div className="orders__past-heading">{t('orderPrevYear')}</div>
          <div className="orders__past-cards">
            {orders.pastOrdersPreviousYear.map((order) => {
              return <OrderCard {...order} />;
            })}
          </div>
        </div>
        <div className="orders__button">
          <SubmitButton className="orders__button-btn">
            {t('orderButtonText')}
          </SubmitButton>
        </div>
      </div>
    </>
  );
}
