import { Field } from 'redux-form';

// Custom Components
import {
  Heading,
  Description,
  HeadingButton,
  CustomInput,
} from 'web/components';
import { SearchCard } from 'web/components/index';

// Styles
import './ReviewOrder.styles.scss';

export function ReviewOrder({ t }) {
  return (
    <>
      <div className="review-order">
        <div className="review-order__heading">
          <Heading customClass="review-order__heading-text">
            {t('odrReviewHeading')}
          </Heading>
          <HeadingButton close />
        </div>
        <div className="review-order__text-container">
          <Description customClass="review-order__text-container-text">
            {t('odrReviewDesc')}
          </Description>
        </div>
        <div className="review-order__shop">
          <div className="review-order__shop-heading">
            <Heading customClass="review-order__shop-heading-text">
              {t('odrReviewShop')}
            </Heading>
            <HeadingButton text="Choose" />
          </div>
          <div className="review-order__shop-card">
            <SearchCard
              shop={{
                name: 'Jimmy’s Shop',
                address: '123 Main Street, Seattle, Washington',
              }}
            />
          </div>
        </div>
        <div className="review-order__raquet">
          <div className="review-order__raquet-heading">
            <Heading customClass="review-order__shop-heading-text">
              {t('odrRacquet')}
            </Heading>
            <HeadingButton text="Choose" />
          </div>
          <div className="review-order__shop-card">
            <SearchCard
              raquet={{
                name: 'No Name',
                model: 'Model not specified',
                qrConnected: true,
              }}
            />
          </div>
        </div>
        <div className="review-order__raquet">
          <div className="review-order__raquet-heading">
            <Heading customClass="review-order__shop-heading-text">
              {t('odrSummary')}
            </Heading>
            <HeadingButton text="Edit String Settings" />
          </div>
          <div className="review-order__shop-card">
            <SearchCard
              raquet={{
                name: 'No Name',
                model: 'Model not specified',
                qrConnected: true,
              }}
            />
          </div>
        </div>
        {/* <div className="review-order__form-container">
          <Field
            name="brand"
            label="Brand (Optional)"
            placeholder="Brand"
            type="text"
            component={CustomInput}
          />
          <Field
            name="model"
            label="Model (Optional)"
            type="text"
            component={CustomInput}
          />
        </div> */}
      </div>
    </>
  );
}
