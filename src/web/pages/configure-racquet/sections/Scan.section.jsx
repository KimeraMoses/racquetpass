import { useEffect, useState } from 'react';
import { Field } from 'redux-form';
import { useNavigate } from 'react-router-dom';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
// Custom Components
import {
  Heading,
  SubHeading,
  Description,
  HeadingButton,
} from 'web/components';

// Styles
import './Scan.styles.scss';

export function Scan({ t, setStep, change }) {
  const [qrCode, setQrCode] = useState('');
  const [qrScanner, setQrScanner] = useState(false);
  useEffect(() => {
    if (qrCode) {
      change('raquet-details-from-qr', qrCode);
      // TODO: Update logic with RaquetWith with Backend
      setStep(3);
    }
  }, [qrCode]);

  const navigate = useNavigate();
  return (
    <>
      <div className="scan-configure">
        <div className="scan-configure__heading">
          <Heading>{t('odrHeading')}</Heading>
          <HeadingButton
            close
            onClick={() => navigate('/player-tabs?configBack=true')}
          />
        </div>
        <div className="scan-configure__text-container">
          <SubHeading>{t('odrHT')}</SubHeading>
          <Description customClass="scan-configure__text-container-text">
            {t('odrDesc')}
          </Description>
        </div>
        <div className="scan-configure__image-container">
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
              <div className="scan-configure__image-container-button">
                <button
                  className="scan-configure__image-container-button-btn"
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
