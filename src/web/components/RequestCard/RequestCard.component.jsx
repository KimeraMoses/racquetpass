import './RequestCard.styles.scss';

export function RequestCard({ t }) {
  return (
    <>
      <div className="request-card">
        <div className="request-card__container">
          <div className="request-card__container-divider"></div>
          <div className="request-card__container-content">
            <div className="request-card__container-content-text">
              <div className="request-card__container-content-text-heading">
                {t('adminRequestTitle')}
              </div>
              <div className="request-card__container-content-text-txt">
                {t('adminRequestMail')}
              </div>
            </div>
            <div className="request-card__container-content-imgs">
              <img src="/img/admin/tick.png" alt="tick" />
              <img src="/img/admin/cross.png" alt="cross" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
