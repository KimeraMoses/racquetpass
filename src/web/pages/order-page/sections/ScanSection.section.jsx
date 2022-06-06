import { useEffect, useState } from 'react';
import { Field } from 'redux-form';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { Link } from 'react-router-dom';
// Custom Components
import { Heading, Description, Modal } from 'web/components';

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
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => {
    setShowModal((prev) => {
      return !prev;
    });
  };
  useEffect(() => {
    if (qrCode) {
      change('raquet-details-from-qr', qrCode);
      // TODO: Update logic with RaquetWith with Backend
      scanForward(raquetFound);
    }
  }, [qrCode, change, raquetFound, scanForward]);

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
          <Modal
            showModal={showModal}
            handleShow={handleShow}
            heading="Don't have a QR sticker?"
            text={
              <div className="mt-[13px]">
                <p className="text-[14px] text-[rgba(51,_51,_51,_0.8)]">
                  You can get QR stickers at any pro shop or club that uses
                  RacquetPass.
                </p>
                <p className="mt-[8px]">
                  You can attach the sticker anywhere on your racquet - a good
                  place is on the inside of the throat.
                </p>
              </div>
            }
          />
          <Link
            onClick={() => setShowModal(true)}
            to="#"
            className="scan-section__link-txt"
          >
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
              <img src="img/orderpage/card.png" alt="scan" />
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
