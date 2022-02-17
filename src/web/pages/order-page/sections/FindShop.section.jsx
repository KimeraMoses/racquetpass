import { Field } from 'redux-form';

// Custom Components
import {
  Heading,
  SubHeading,
  Description,
  BackButton,
  CustomInput,
} from 'web/components';

// Styles
import './FindShop.styles.scss';

export function FindShop({ t }) {
  return (
    <>
      <div className="find-shop-section">
        <div className="find-shop-section__heading">
          <BackButton />
          <Heading customClass="phone-section__heading-text">
            {t('odrShop')}
          </Heading>
        </div>
        <div className="find-shop-section__text-container">
          <Description customClass="find-shop-section__text-container-text">
            {t('odrShopText')}
          </Description>
        </div>
        <div className="find-shop-section__form-container">
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
        <Description customClass="find-shop-section__form-text">
          {t('odrMsg')}
        </Description>
      </div>
    </>
  );
}
