import './SetupPaymentCard.styles.scss';

export function SetupPaymentCard({ t }) {
  return (
    <div className="setup">
      <div className="setup__heading">{t('adminSetupPayment')}</div>
      <div className="setup__arrow">
        <img src="img/admin/arrow-left.png" alt="arrow" />
      </div>
    </div>
  );
}
