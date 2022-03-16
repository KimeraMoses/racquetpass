import { Fragment } from 'react';
import {
  HeadingButton,
  Heading,
  SetupPaymentCard,
  AdminPaymentCard,
} from 'web/components';
import './AdminPayment.styles.scss';

const payments = [
  {
    title: `Joe's Tennis Pro`,
    text: 'JoesTennisPro@gmail.com',
  },
  {
    title: `Joe's Tennis Pro`,
    text: 'JoesTennisPro@gmail.com',
  },
  {
    title: `Joe's Tennis Pro`,
    text: 'JoesTennisPro@gmail.com',
  },
];

export function AdminPayment({ t, setCurrentScreen }) {
  return (
    <>
      <div className="payments">
        <div className="payments__header">
          <HeadingButton
            drawer
            onClick={() => {
              setCurrentScreen('default');
            }}
          />
          <Heading>{t('adminPayments')}</Heading>
        </div>
        <div className="payments__content">
          <div className="payments__content-heading-txt">
            {t('adminRecievePayment')}
          </div>
          <div className="payments__content-setup-card">
            <SetupPaymentCard
              t={t}
              onClick={() => {
                setCurrentScreen('setup');
              }}
            />
          </div>
          <div className="payments__content-desc">{t('adminText')}</div>
          <div className="payments__content-issue-heading">
            {t('adminIssue')}
          </div>
          <div className="payments__content-cards">
            {payments.map((payment, index) => (
              <Fragment key={index}>
                <AdminPaymentCard
                  string={payment}
                  t={t}
                  onClick={() => {
                    setCurrentScreen('remove');
                  }}
                />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
