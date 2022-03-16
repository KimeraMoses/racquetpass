import { useNavigate } from 'react-router-dom';

// Custom Components
import { Heading, SubHeading, Description, SubmitButton } from 'web/components';

// Styles
import './RacquetNotFound.styles.scss';

export function RacquetNotFound({ t, setStep }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="racquet-not-found">
        <div>
          <div className="racquet-not-found__heading">
            <Heading>{t('orderScannedHeading')}</Heading>
          </div>
          <div className="racquet-not-found__card">
            <div className="racquet-not-found__card-divider"></div>
            <div className="racquet-not-found__card-content">
              <SubHeading customClass="racquet-not-found__card-content-heading">
                {t('orderScannedDetailTitle')}
              </SubHeading>
              <div className="racquet-not-found__card-content-inner-card">
                <Description>{t('odrdetailsDesc')}</Description>
              </div>
              <div>
                <Description customClass="racquet-not-found__card-content-success">
                  {t('odrsuccess')}
                </Description>
                <button
                  className="racquet-not-found__card-content-rescan"
                  // onClick={backward}
                >
                  {t('ordRescan')}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="racquet-not-found__buttons">
          <SubmitButton onClick={() => setStep(2)}>
            {t('orderScannedComplete')}
          </SubmitButton>
          <SubmitButton
            outlined
            onClick={() => navigate('/login?missingQR=true')}
          >
            {t('odrSigninEdit')}
          </SubmitButton>
        </div>
      </div>
    </>
  );
}
