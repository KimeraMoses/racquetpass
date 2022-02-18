// Custom Components
import {
  Heading,
  SubHeading,
  Description,
  HeadingButton,
} from 'web/components';

// Styles
import './ScanSection.styles.scss';

export function ScanSection({ t }) {
  return (
    <>
      <div className="scan-section">
        <div className="scan-section__heading">
          <Heading>{t('odrHeading')}</Heading>
          <HeadingButton close />
        </div>
        <div className="scan-section__text-container">
          <SubHeading>{t('odrHT')}</SubHeading>
          <Description customClass="scan-section__text-container-text">
            {t('odrDesc')}
          </Description>
        </div>
        <div className="scan-section__image-continer">
          <img src="img/orderpage/card.png" alt="scan image" />
        </div>
      </div>
    </>
  );
}
