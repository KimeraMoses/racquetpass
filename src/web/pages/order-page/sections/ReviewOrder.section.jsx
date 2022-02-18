import { useState } from 'react';
import { Field } from 'redux-form';

// Custom Components
import {
  Heading,
  Description,
  HeadingButton,
  SummaryCard,
  PaymentButton,
  CustomInput,
} from 'web/components';
import { SearchCard } from 'web/components/index';

// Styles
import './ReviewOrder.styles.scss';

export function ReviewOrder({ t }) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive((active) => !active);
  };
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
        <div className="review-order__summary">
          <div className="review-order__summary-heading">
            <Heading customClass="review-order__summary-heading-text">
              {t('odrSummary')}
            </Heading>
            <HeadingButton text="Edit String Settings" />
          </div>
          <div className="review-order__summary-card">
            <SummaryCard />
          </div>
        </div>
        <div className="review-order__buttons">
          <PaymentButton isDark className="review-order__buttons-apple">
            Pay with &nbsp; <img src="/img/button/apple.png" alt="apple-pay" />
          </PaymentButton>
          <PaymentButton
            className="review-order__buttons-credit"
            handleClick={handleClick}
            active={active}
          >
            Pay with Credit Card
          </PaymentButton>
        </div>
        {active ? (
          <>
            <div className="review-order__credit-cards">
              <img src="/img/orderpage/cards.png" alt="list-of-cards" />
            </div>
            <div className="review-order__credit-card-input">
              <Field
                name="card-number"
                label="Card Number"
                placeholder="Card Number"
                type="text"
                component={CustomInput}
              />
            </div>
            <div className="review-order__credit-card-input">
              <Field
                name="expiration-date"
                label="Expiration Date"
                placeholder="MM/YY"
                type="text"
                component={CustomInput}
              />
            </div>
            <div className="review-order__credit-card-input">
              <Field
                name="security-code"
                label="Security Code"
                placeholder="Security Code (CVV)"
                type="text"
                component={CustomInput}
              />
            </div>
            <div className="review-order__credit-card-input">
              <Field
                name="zip-code"
                label="ZIP code"
                type="text"
                component={CustomInput}
              />
            </div>
            <div className="review-order__total-card">
              <div className="review-order__total-card-text">
                Replace Strings
              </div>
              <div className="review-order__total-card-price">$62.47</div>
            </div>
          </>
        ) : (
          <></>
        )}
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
