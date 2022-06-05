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
      <div className="scan-details-sc">
        <div>
          {/* <BackButton /> */}
          <div className="scan-details-sc__heading">
            <BackButton onClick={backward} />
            <Heading>{t('scanSuccessHeading')}</Heading>
          </div>

          <div className="scan-details-sc__card-continer">
            <div className="scan-details-sc__card-continer-content">
              <div className="scan-details-sc__card-continer-content-racquet">
                <div className="scan-details-sc__card-continer-content-racquet-inner">
                  <img
                    src="img/orders/bg-success.png"
                    alt="racquet"
                    className="scan-details-sc__card-continer-content-racquet-img"
                  />
                  <div className="scan-details-sc__card-continer-content-racquet-text">
                    <SubHeading>{t('scanSuccessTennis')}</SubHeading>
                    <Description>{t('scanSuccessRacName')}</Description>
                  </div>
                </div>
              </div>
              <div className="scan-details-sc__card-continer-content-inner-card">
                <div className="scan-details-sc__card-continer-content-inner-card-txt">
                  <div className='scan-details-sc__card-continer-content-inner-card-txt-box"'>
                    <SubHeading>{t('scanSuccessMains')}</SubHeading>
                    <Description>{t('scanSuccessMainsTxt')}</Description>
                  </div>
                  <div className='scan-details-sc__card-continer-content-inner-card-txt-box"'>
                    <SubHeading>{t('scanSuccessCrosses')}</SubHeading>
                    <Description>{t('scanSuccessCrossesTxt')}</Description>
                  </div>
                  <div className='scan-details-sc__card-continer-content-inner-card-txt-box"'>
                    <SubHeading>{t('scanSuccessOwner')}</SubHeading>
                    <Description>{t('scanSuccessOwnerName')}</Description>
                  </div>
                </div>
                <div className="scan-details-sc__card-continer-content-inner-card-txt">
                  <div className='scan-details-sc__card-continer-content-inner-card-txt-box"'>
                    <SubHeading>{t('odrTension')}</SubHeading>
                    <Description>42 lbs</Description>
                  </div>
                  <div className='scan-details-sc__card-continer-content-inner-card-txt-box"'>
                    <SubHeading>{t('odrTension')}</SubHeading>
                    <Description>56 lbs</Description>
                  </div>
                </div>
              </div>
              <div>
                {/* <Description customClass="scan-details-sc__card-continer-content-success">
                  {t('odrsuccess')}
                </Description> */}
              </div>
            </div>
          </div>
          <button
            className="scan-details-sc__card-continer-content-rescan"
            onClick={backward}
          >
            {t('ordRescan')}
          </button>
        </div>
      </div>
    </>
  );
}
