import { BackButton, HeadingButton, Heading } from 'web/components';

import './CardDetails.styles.scss';
export function CardDetails({ t, title = 'My tennis card', ending = '5432' }) {
  return (
    <>
      <div className="card-detail">
        <div className="card-detail__header">
          <div className="card-detail__header-drawer-title">
            <BackButton />
            <Heading>{t('paymentDetailTitle')}</Heading>
          </div>
          <div className="card-detail__header-button ">
            <HeadingButton text={'Edit'} />
          </div>
        </div>
        <div className="card-detail__image">
          <img src="/img/cards/visa.png" alt="visa" />
        </div>

        <div className="card-detail__text">
          <div className="card-detail__text-heading">
            {t('paymentCardHeading')}
          </div>
          <div className="card-detail__text-desc">
            {/* {t('paymentDetailTitle')} */}
            {title}
          </div>
          <div className="card-detail__text-heading">{t('paymentCardEnd')}</div>
          <div className="card-detail__text-desc">
            {/* {t('paymentDetailTitle')} */}
            {ending}
          </div>
          <div className="card-detail__text-heading">
            {t('paymentCardExpire')}
          </div>
          <div className="card-detail__text-desc">{t('paymentExpireDate')}</div>
        </div>
      </div>
    </>
  );
}
