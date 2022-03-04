// Custom Components
import { Heading, SubHeading, Description } from 'web/components';

// Styles
import './ScanSuccess.styles.scss';

export function ScanSuccess({ t, backward }) {
  return (
    <>
      <div className="scan-details">
        <div>
          <div className="scan-details__heading">
            <Heading>{t('orderQRText')}</Heading>
          </div>
          <div className="scan-details__text-container">
            <Description customClass="scan-details__text-container-text">
              {t('orderQRtxt')}
            </Description>
          </div>
          <div className="scan-details__card-continer">
            <div className="scan-details__card-continer-divider"></div>
            <div className="scan-details__card-continer-content">
              <SubHeading customClass="scan-details__card-continer-content-heading">
                {t('odrdetailHeading')}
              </SubHeading>
              <div className="scan-details__card-continer-content-inner-card">
                <SubHeading customClass="scan-details__card-continer-content-inner-card-heading">
                  {t('odrBrnd')}
                </SubHeading>
                <SubHeading customClass="scan-details__card-continer-content-inner-card-text">
                  {t('odrBrndDesc')}
                </SubHeading>
                <SubHeading customClass="scan-details__card-continer-content-inner-card-heading">
                  {t('ordModel')}
                </SubHeading>
                <SubHeading customClass="scan-details__card-continer-content-inner-card-text">
                  {t('ordModelDesc')}
                </SubHeading>
                <SubHeading customClass="scan-details__card-continer-content-inner-card-heading">
                  {t('odrString')}
                </SubHeading>
                <SubHeading customClass="scan-details__card-continer-content-inner-card-text">
                  {t('odrStirngDesc')}
                </SubHeading>
              </div>
              <div>
                <Description customClass="scan-details__card-continer-content-success">
                  {t('odrsuccess')}
                </Description>
                <button
                  className="scan-details__card-continer-content-rescan"
                  onClick={backward}
                >
                  {t('ordRescan')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
