import { Link } from 'react-router-dom';

// Custom Components
import { Heading, SubHeading, Description, SubmitButton } from 'web/components';

// Styles
import './RacquetFound.styles.scss';

export function RacquetFound({ t }) {
  return (
    <>
      <div className="scan-details">
        <div>
          <div className="scan-details__heading">
            <Heading>{t('orderScannedHeading')}</Heading>
          </div>
          <div className="scan-details__card">
            <div className="scan-details__card-divider"></div>
            <div className="scan-details__card-content">
              <SubHeading customClass="scan-details__card-content-heading">
                {t('odrdetailHeading')}
              </SubHeading>
              <div>
                <img src="/img/orderWithoutAccount/racquet.png" alt="racquet" />
              </div>
              <div className="scan-details__card-content-inner-card">
                <SubHeading customClass="scan-details__card-content-inner-card-heading">
                  {t('odrBrnd')}
                </SubHeading>
                <SubHeading customClass="scan-details__card-content-inner-card-text">
                  {t('odrBrndDesc')}
                </SubHeading>
                <SubHeading customClass="scan-details__card-content-inner-card-heading">
                  {t('ordModel')}
                </SubHeading>
                <SubHeading customClass="scan-details__card-content-inner-card-text">
                  {t('ordModelDesc')}
                </SubHeading>
                <SubHeading customClass="scan-details__card-content-inner-card-heading">
                  {t('odrString')}
                </SubHeading>
                <SubHeading customClass="scan-details__card-content-inner-card-text">
                  {t('odrStirngDesc')}
                </SubHeading>
              </div>
              <div>
                <Description customClass="scan-details__card-content-success">
                  {t('odrsuccess')}
                </Description>
                <button
                  className="scan-details__card-content-rescan"
                  // onClick={backward}
                >
                  {t('ordRescan')}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="scan-details__buttons">
          <SubmitButton>{t('orderScannedComplete')}</SubmitButton>
          <SubmitButton outlined>{t('orderScannedComplete')}</SubmitButton>
        </div>
      </div>
    </>
  );
}
