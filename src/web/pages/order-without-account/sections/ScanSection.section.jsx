import { useEffect, useState } from 'react';
import { Field } from 'redux-form';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { useNavigate, Link } from 'react-router-dom';
// Custom Components
import { Heading, Description } from 'web/components';

// Styles
import './ScanSection.styles.scss';

export function ScanSection({ t, setRacquetFound, setStep, change }) {
  const [qrCode, setQrCode] = useState('');
  const [qrScanner, setQrScanner] = useState(false);

  useEffect(() => {
    if (qrCode) {
      change('raquet-details-from-qr', qrCode);
      // TODO: setup with backend api if racquet not found
      setRacquetFound(true);
      setStep(2);
    }
  }, [qrCode, change, setStep, setRacquetFound]);

  const navigate = useNavigate();

  return (
    <>
      <div className="owa-scan-section">
        <div className="owa-scan-section__heading">
          <Heading>{t('orderQRText')}</Heading>
        </div>
        <div className="owa-scan-section__text-container">
          <Description customClass="owa-scan-section__text-container-text">
            {t('orderQRtxt')}
          </Description>
        </div>
        <div className="owa-scan-section__link">
          <Link to="#" className="owa-scan-section__link-txt">
            {t('orderLinktxt')}
          </Link>
        </div>
        <div className="owa-scan-section__image-container">
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
              <img src="img/orderpage/card.png" alt="scan" />
              <div className="owa-scan-section__image-container-button">
                <button
                  className="owa-scan-section__image-container-button-btn"
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
      </div>
    </>
  );
}
