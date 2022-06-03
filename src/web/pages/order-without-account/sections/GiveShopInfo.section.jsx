import { Field } from 'redux-form';

// Custom Components
import { Heading, Description, BackButton, CustomInput } from 'web/components';
import { StepButton } from 'web/components/Buttons/StepButton.componet';

// Styles
import './GiveShopInfo.styles.scss';

export function GiveShopInfo({ t, setShopCurrent, setStep }) {
  return (
    <>
      <div className="find-shop-section-wqr">
        <div>
          <div className="find-shop-section-wqr__heading">
            <BackButton onClick={() => setStep(3)} />
            <Heading customClass="phone-section__heading-text">
              {t('odrShop')}
            </Heading>
          </div>
          <div className="find-shop-section-wqr__text-container">
            <Description customClass="find-shop-section-wqr__text-container-text">
              {t('odrShopText')}
            </Description>
          </div>
          <div className="find-shop-section-wqr__form-container">
            <Field
              name="shop-name"
              label="Shop Name"
              type="text"
              component={CustomInput}
            />
            <Field
              name="phone-number"
              label="Phone Number"
              type="text"
              component={CustomInput}
            />
          </div>
          <Description customClass="find-shop-section-wqr__form-text">
            {t('odrMsg')}
          </Description>
        </div>
        <div className="find-shop-section-wqr__button">
          <StepButton
            className="find-shop-section-wqr__button-btn"
            onClick={() => {
              setStep(3);
            }}
          >
            Submit Form
          </StepButton>
        </div>
      </div>
    </>
  );
}
