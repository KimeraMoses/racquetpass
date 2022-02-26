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
import './ScanSuccess.styles.scss';

export function ScanSuccess({ t, backward, setContinueWithAccount, setStep }) {
  return (
    <>
      <div className="scan-details">
        <div>
          <div className="scan-details__heading">
            <Heading>{t('odrHeading')}</Heading>
            <HeadingButton close onClick={backward} />
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
                <button
                  className="scan-details__card-continer-content-rescan"
                  onClick={backward}
                >
                  {t('ordRescan')}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="scan-details__button-container">
          <StepButton
            className="scan-details__button-container-btn"
            onClick={() => {
              setStep(2);
              setContinueWithAccount(true);
            }}
          >
            Continue with account creation
          </StepButton>
          <StepButton
            outlined
            className="scan-details__button-container-btn"
            onClick={() => {
              setStep(2);
              setContinueWithAccount(false);
            }}
          >
            Continue without account creation
          </StepButton>
        </div>
      </div>
    </>
  );
}
