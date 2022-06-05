// Custom Components
import {
  Heading,
  SubHeading,
  Description,
  BackButton,
  StepButton,
} from 'web/components';

// Styles
import './ScanSuccess.styles.scss';

export function ScanSuccess({ t, backward }) {
  return (
    <>
      <div className="scan-details">
        <div>
          {/* <BackButton /> */}
          <div className="scan-details__heading">
            <BackButton />
            <Heading>{t('scanSuccessHeading')}</Heading>
          </div>
          <div className="scan-details__text-container">
            <Description customClass="scan-details__text-container-text">
              {t('orderQRtxt')}
            </Description>
          </div>
          <div className="scan-details__card-continer">
            {/* <div className="scan-details__card-continer-divider"></div> */}
            <div className="scan-details__card-continer-content">
              <div className="scan-details__card-continer-content-racquet">
                <div className="scan-details__card-continer-content-racquet-inner">
                  <img
                    src="img/homepage/racquet.png"
                    alt="racquet"
                    className="scan-details__card-continer-content-racquet-img"
                  />
                  <div className="">
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
              <div>
                {/* <Description customClass="scan-details__card-continer-content-success">
                  {t('odrsuccess')}
                </Description> */}
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
        <div className="scan-details__btn">
          <StepButton>Next</StepButton>
        </div>
      </div>
    </>
  );
}
