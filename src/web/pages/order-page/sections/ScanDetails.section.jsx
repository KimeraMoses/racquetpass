import { Link } from 'react-router-dom';

// Custom Components
import {
  Heading,
  SubHeading,
  Description,
  HeadingButton,
} from 'web/components';

// Styles
import './ScanDetails.styles.scss';

export function ScanDetails({ t }) {
  return (
    <>
      <div className="scan-details">
        <div className="scan-details__heading">
          <Heading>{t('odrHeading')}</Heading>
          <HeadingButton close />
        </div>
        <div className="scan-details__text-container">
          <Description customClass="scan-details__text-container-text">
            {t('odrAttachQR')}
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
              <Link
                to="#"
                className="scan-details__card-continer-content-rescan"
              >
                {t('ordRescan')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
