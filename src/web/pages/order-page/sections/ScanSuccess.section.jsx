import { Link } from 'react-router-dom';

// Custom Components
import {
  Heading,
  SubHeading,
  Description,
  HeadingButton,
} from 'web/components';

// Styles
import './ScanSuccess.styles.scss';

export function ScanSuccess({ t }) {
  return (
    <>
      <div className="scan-success">
        <div className="scan-success__heading">
          <Heading>{t('odrHeading')}</Heading>
          <HeadingButton close />
        </div>
        <div className="scan-succcess__text-container">
          <Description customClass="scan-success__text-container-text">
            {t('odrAttachQR')}
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
            <Link to="#" className="scan-success__card-continer-content-rescan">
              {t('ordRescan')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
