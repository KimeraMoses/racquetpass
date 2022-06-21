// Custom Components
import { Heading, Description, BackButton } from 'web/components';

// Styles
import './ScanNotFound.styles.scss';

export function ScanNotFound({ t, backward }) {
  return (
    <>
      <div className="scan-details">
        <div>
          <div className="scan-details__heading">
            <BackButton onClick={backward} />
            <Heading>{t('scanSuccessHeading')}</Heading>
          </div>
          <div className="scan-details__text-container">
            <Description customClass="scan-details__text-container-text">
              {t('orderQRtxt')}
            </Description>
          </div>
          <div className="scan-details__card-continer">
            <div className="scan-details__card-continer-content">
              <div className="scan-details__card-continer-content-racquet">
                <div className="scan-details__card-continer-content-racquet-inner">
                  <img
                    src="img/orders/bg.png"
                    alt="racquet"
                    className="scan-details__card-continer-content-racquet-img"
                  />
                  <div className="scan-details__card-continer-content-racquet-text">
                    <Description>{t('scanSuccessRacDesc')}</Description>
                  </div>
                </div>
              </div>
              <div className="scan-details__card-continer-content-inner-card">
                <div className="scan-details__card-continer-content-inner-card-txt">
                  <Description>
                    It looks like this is the first time this racquet has been
                    scanned.
                  </Description>
                </div>
              </div>
            </div>
          </div>
          <button
            className="scan-details__card-continer-content-rescan"
            onClick={backward}
          >
            {t('ordRescan')}
          </button>
        </div>
      </div>
    </>
  );
}
