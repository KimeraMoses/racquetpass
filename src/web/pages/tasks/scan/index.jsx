import { useEffect, useState } from 'react';
import { Field } from 'redux-form';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { useNavigate } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
// Custom Components
import { BackButton, Heading, Description } from 'web/components';

// Styles
import './index.styles.scss';

function Scan({ t, setCurrentScreen, backward }) {
  const [qrCode, setQrCode] = useState('');
  const [qrScanner, setQrScanner] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (qrCode) {
      // change('raquet-details-from-qr', qrCode);
      // TODO: Update logic with RaquetWith with Backend
      // scanForward(raquetFound);
      navigate('/Tasks/Scanned');
    }
  }, [qrCode]);

  return (
    <>
      <div className="scan-section-td">
        <div className="scan-section-td__heading">
          <BackButton onClick={() => navigate('/tasks')} />
          <Heading>Scan QR Code</Heading>
        </div>
        <div className="scan-section-td__image-container">
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
              {/* <Field
                name="raquet-details-from-qr"
                style={{ visibility: 'hidden' }}
                component="input"
              /> */}
            </>
          ) : (
            <>
              <div></div>
              <img src="/img/orderpage/card.png" alt="scan" />
              <div className="scan-section-td__image-container-button">
                <button
                  className="scan-section-td__image-container-button-btn"
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
        <div className="scan-section-td__description">
          <Description>
            To scan a QR code, move your camera so the QR code is in the frame
            and it will be automatically detected.
          </Description>
        </div>
      </div>
    </>
  );
}

export default withNamespaces()(Scan);
