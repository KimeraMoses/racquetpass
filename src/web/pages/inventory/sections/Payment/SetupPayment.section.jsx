import { Heading, HeadingButton, PaymentCard } from 'web/components';
import './SetupPayment.styles.scss';

const Card = ({
  heading,
  btnText,
  onClick,
  description,
  method,
  methodDetails,
  setCurrentScreen,
  setIsReceive,
}) => {
  // const screen = method === 'bank' ? 'addBank' : 'addCard';
  return (
    <div className="setup-payment__card">
      <div className="setup-payment__card-heading">
        <div className="setup-payment__card-heading-text">{heading}</div>
        {method ? (
          <div
            className="setup-payment__card-heading-btn"
            role="button"
            onClick={() => {
              if (heading === 'Receive Payment') {
                setCurrentScreen('choose');
                setIsReceive(true);
              } else {
                setCurrentScreen('choose');
                setIsReceive(false);
              }
            }}
          >
            Change
          </div>
        ) : (
          <></>
        )}
      </div>
      {method ? (
        <PaymentCard {...methodDetails} />
      ) : (
        <div
          className="setup-payment__card-button"
          role="button"
          onClick={onClick}
        >
          <div className="setup-payment__card-button-text">{btnText}</div>
          <div className="setup-payment__card-button-arrow">
            <img src="/img/arrow-left.png" alt="arrow left" />
          </div>
        </div>
      )}
      <div className="setup-payment__card-description">{description}</div>
    </div>
  );
};

export const SetupPayment = ({ t, setCurrentScreen, setIsReceive }) => {
  const cardData = [
    {
      heading: 'RacquetPass Payment',
      btnText: 'Setup this payment method',
      description: 'This will be used to pay RacquetPass.',
      onClick: () => {
        setCurrentScreen('choose');
        setIsReceive(false);
      },
      method: 'card',
      methodDetails: {
        cardType: 'visa',
        title: 'Visa Card',
        ending: '5432',
      },
      setIsReceive,
    },
    {
      heading: 'Receive Payment',
      btnText: 'Setup this payment method',
      description:
        'You will recieve money in this account when your customers place service orders.',
      onClick: () => {
        setCurrentScreen('choose');
        setIsReceive(true);
      },
      setIsReceive,
      // method: 'bank',
      // methodDetails: {
      //   title: 'Chase Banking',
      //   ending: 'Ends with 1234',
      // },
    },
  ];

  return (
    <div className="setup-payment">
      <div className="setup-payment__header">
        <HeadingButton drawer onClick={() => setCurrentScreen('default')} />
        <Heading>{t('paymentHeading')}</Heading>
      </div>

      {cardData.map((data) => {
        return (
          <Card
            key={data?.heading}
            {...data}
            setCurrentScreen={setCurrentScreen}
          />
        );
      })}
    </div>
  );
};
