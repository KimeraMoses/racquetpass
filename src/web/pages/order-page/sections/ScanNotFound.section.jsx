// Custom Components
import { Heading, SubHeading, Description } from 'web/components';

// Styles
import './ScanNotFound.styles.scss';

export function ScanNotFound({ t, backward }) {
  return (
    <>
      <div className="scan-success">
        <div>
          <div className="scan-success__heading">
            <Heading>{t('orderQRText')}</Heading>
          </div>
          <div className="scan-succcess__text-container">
            <Description customClass="scan-success__text-container-text">
              {t('orderQRtxt')}
            </Description>
          </div>
          <div className="scan-success__card-continer">
            <div className="scan-success__card-continer-divider"></div>
            <div className="scan-success__card-continer-content">
              <SubHeading customClass="scan-success__card-continer-content-heading">
                {t('odrdetailHeading')}
              </SubHeading>
              <Description customClass="scan-success__card-continer-content-text">
                {t('odrdetailsDesc')}
              </Description>
              <Description customClass="scan-success__card-continer-content-success">
                {t('odrsuccess')}
              </Description>
              <button
                onClick={backward}
                className="scan-success__card-continer-content-rescan"
              >
                {t('ordRescan')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
