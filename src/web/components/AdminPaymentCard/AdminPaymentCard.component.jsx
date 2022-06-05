import './AdminPayment.styles.scss';

export function AdminPaymentCard({ t, onClick = () => {} }) {
  return (
    <>
      <div className="admin-payment">
        <div className="admin-payment__container">
          <div className="admin-payment__container-divider"></div>
          <div className="admin-payment__container-content">
            <div className="admin-payment__container-content-left">
              <div className="admin-payment__container-content-left-shop">
                <img src="/img/inventory/shop.png" alt="shop" />
              </div>
              <div
                className="admin-payment__container-content-left-text"
                onClick={onClick}
              >
                <div className="admin-payment__container-content-left-text-heading">
                  {t('adminRequestTitle')}
                </div>
                <div className="admin-payment__container-content-left-text-txt">
                  {t('adminRequestMail')}
                </div>
              </div>
            </div>
            <div className="admin-payment__container-content-img">
              <img src="/img/admin/info-circle.png" alt="info" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
