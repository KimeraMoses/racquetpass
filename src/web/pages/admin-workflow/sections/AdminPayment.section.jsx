import {
  HeadingButton,
  Heading,
  SetupPaymentCard,
  AdminPaymentCard,
} from 'web/components';
import './AdminPayment.styles.scss';

export function AdminPayment({ t }) {
  return (
    <>
      <div className="payments">
        <div className="payments__header">
          <HeadingButton drawer />
          <Heading>{t('adminPayments')}</Heading>
        </div>
        <div className="payments__content">
          <div className="payments__content-heading-txt">
            {t('adminRecievePayment')}
          </div>
          <div className="payments__content-setup-card">
            <SetupPaymentCard t={t} />
          </div>
          <div className="payments__content-desc">{t('adminText')}</div>
          <div className="payments__content-issue-heading">
            {t('adminIssue')}
          </div>
          <div className="payments__content-cards">
            <AdminPaymentCard t={t} />
            <AdminPaymentCard t={t} />
          </div>
        </div>
      </div>
    </>
  );
}
