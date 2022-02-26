import { Link } from 'react-router-dom';

// Custom Components
import {
  Heading,
  SubHeading,
  Description,
  HeadingButton,
} from 'web/components';
import { StepButton } from 'web/components/Buttons/StepButton.componet';

// Styles
import './ScanNotFound.styles.scss';

export function ScanNotFound({ t, backward, setContinueWithAccount, setStep }) {
  return (
    <>
      <div className="scan-success">
        <div>
          <div className="scan-success__heading">
            <Heading>{t('odrHeading')}</Heading>
            <HeadingButton close onClick={backward} />
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
              <button
                onClick={backward}
                className="scan-success__card-continer-content-rescan"
              >
                {t('ordRescan')}
              </button>
            </div>
          </div>
        </div>
        <div className="scan-success__button-container">
          <StepButton
            type="submit"
            className="scan-success__button-container-btn"
            onClick={() => {
              setContinueWithAccount(true);
              setStep(2);
            }}
          >
            Continue with account creation
          </StepButton>
          <StepButton
            outlined
            className="scan-success__button-container-btn"
            onClick={() => {
              setContinueWithAccount(false);
              setStep(2);
            }}
          >
            Continue without account creation
          </StepButton>
        </div>
      </div>
    </>
  );
}
