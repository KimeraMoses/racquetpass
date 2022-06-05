import { useEffect, useState } from 'react';
import { Field } from 'redux-form';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { useNavigate, Link } from 'react-router-dom';
// Custom Components
import {
  Heading,
  SubHeading,
  Description,
  HeadingButton,
} from 'web/components';

// Styles
import './ScanSection.styles.scss';
import { BackButton } from 'web/components/Buttons/BackButton.component';

export function ScanSection({
  t,
  scanForward,
  change,
  setCurrentScreen,
  backward,
}) {
  const [qrCode, setQrCode] = useState('');
  const [qrScanner, setQrScanner] = useState(false);
  const [raquetFound, setRacquetFound] = useState(true);
  useEffect(() => {
    if (qrCode) {
      change('raquet-details-from-qr', qrCode);
      // TODO: Update logic with RaquetWith with Backend
      scanForward(raquetFound);
    }
  }, [qrCode, change, raquetFound, scanForward]);

  const navigate = useNavigate();
  return (
    <>
      <div className="scan-section">
        <div className="scan-section__heading">
          <BackButton onClick={backward} />
          <Heading>{t('scanQRHeading')}</Heading>
        </div>
        <div className="scan-section__text-container">
          <Description customClass="scan-section__text-container-text">
            {t('scanQRText')}
          </Description>
        </div>
        <div className="scan-section__link">
          <Link to="#" className="scan-section__link-txt">
            {t('scanQRLinkTxt')}
          </Link>
        </div>
        <div className="scan-section__image-container">
          {qrScanner ? (
            <>
              <BarcodeScannerComponent
                width={500}
                height={500}
                onUpdate={(err, result) => {
                  if (result) {
                    setQrCode(result.text);
                    setQrScanner(false);
                  } else setQrCode('');
                }}
              />
              <Field
                name="raquet-details-from-qr"
                style={{ visibility: 'hidden' }}
                component="input"
              />
            </>
          ) : (
            <>
              <div></div>
              <img src="img/orderpage/card.png" alt="scan image" />
              <div className="scan-section__image-container-button">
                <button
                  className="scan-section__image-container-button-btn"
                  onClick={() => {
                    setQrScanner((qrScanner) => !qrScanner);
                  }}
                >
                  Scan
                </button>
              </div>
            </>
          )}
        </div>
        <div className="scan-section__description">
          <Description>{t('scanQRDesc')}</Description>
        </div>
      </div>
    </>
  );
}
