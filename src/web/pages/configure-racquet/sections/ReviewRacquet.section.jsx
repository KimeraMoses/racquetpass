import { Link } from 'react-router-dom';

import {
  BackButton,
  Heading,
  SubHeading,
  Description,
  StepButton,
  SubmitButton,
} from 'web/components';

import './ReviewRacquet.styles.scss';

export function ReviewRacquet({ t }) {
  return (
    <>
      <div className="review">
        <div>
          <div className="review__header">
            <BackButton back />
            <Heading>{t('orderOpenedBrandTitle')}</Heading>
          </div>
          <div className="review__racquet">
            <img src="/img/orderWithoutAccount/racquet.png" alt="racquet" />
            <div className="review__racquet-details">
              <div>
                <Description customClass="review__racquet-details-heading">
                  {t('orderOpenedBrand')}
                </Description>
                <SubHeading customClass="review__racquet-details-text">
                  {t('orderOpenedBrandTitle')}
                </SubHeading>
              </div>
              <div className="review__racquet-details-button">
                <StepButton
                  outlined
                  className="review__racquet-details-button-btn"
                >
                  {t('viewOrderEdit')}
                </StepButton>
              </div>
            </div>
          </div>
          <div className="review__racquet-info">
            <div className="review__racquet-info-details">
              <Description customClass="review__racquet-info-details-heading">
                {t('orderScannedBrandLabel')}
              </Description>
              <SubHeading customClass="review__racquet-info-details-text">
                {t('orderScannedBrandName')}
              </SubHeading>
            </div>
            <div className="review__racquet-info-details">
              <Description customClass="review__racquet-info-details-heading">
                {t('orderScannedModelLabel')}
              </Description>
              <SubHeading customClass="review__racquet-info-details-text">
                {t('orderScannedModelName')}
              </SubHeading>
            </div>
            <div className="review__racquet-info-details">
              <Description customClass="review__racquet-info-details-heading">
                {t('orderScannedStringLabel')}
              </Description>
              <SubHeading customClass="review__racquet-info-details-text">
                {t('orderScannedStringName')}
              </SubHeading>
            </div>
            <div className="review__racquet-info-details">
              <Description customClass="review__racquet-info-details-heading">
                {t('createOrderDateLabel')}
              </Description>
              <SubHeading customClass="review__racquet-info-details-text">
                {t('createOrderDate')}
              </SubHeading>
            </div>
          </div>
          <div className="review__link">
            <Link to="#" className="review__link-text">
              {t('createOrderDelete')}
            </Link>
          </div>
        </div>
        <div className="review__button">
          <SubmitButton>{t('orderScannedComplete')}</SubmitButton>
        </div>
      </div>
    </>
  );
}
