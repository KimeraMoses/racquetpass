import './SetupPaymentCard.styles.scss';

export function SetupPaymentCard({ t, onClick = () => {} }) {
  return (
    <div className="setup" onClick={onClick}>
      <div className="setup__heading">{t('adminSetupPayment')}</div>
      <div className="setup__arrow">
        <img src="img/admin/arrow-left.png" alt="arrow" />
      </div>
    </div>
  );
}
