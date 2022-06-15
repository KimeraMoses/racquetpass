// Custom Components
import {
  Heading,
  Description,
  HeadingButton,
  SummaryCard,
  PaymentButton,
  SubHeading,
} from 'web/components';
import { SearchCard, Survey } from 'web/components/index';

// Styles
import './ReviewOrder.styles.scss';
import { BackButton } from 'web/components/Buttons/BackButton.component';
import { useState } from 'react';

export function ReviewOrder({ t, setStep, setDone, setBackFromReview }) {
  const [showSurvey, setShowSurvey] = useState(false);
  return (
    <>
      <Survey
        show={showSurvey}
        setShow={setShowSurvey}
        onExit={() => {
          setStep(7);
          setDone(true);
        }}
      />
      <div className="review-order-odr">
        <div className="review-order-odr__heading">
          <BackButton onClick={() => setStep(5)} />
          <Heading customClass="review-order-odr__heading-text">
            {t('odrReviewHeading')}
          </Heading>
        </div>
        <div className="review-order-odr__text-container">
          <Description customClass="review-order-odr__text-container-text">
            {t('odrReviewDesc')}
          </Description>
        </div>
        <div className="review-order-odr__shop-heading">
          <Heading customClass="review-order-odr__shop-heading-text">
            {t('ShopContactHeading')}
          </Heading>
          <HeadingButton
            text="Edit"
            onClick={() => {
              setBackFromReview(true);
              setStep(4);
            }}
          />
        </div>
        <div className="review-order-odr__contact">
          <div className="review-order-odr__contact-details">
            <SubHeading>{t('reviewOdrName')}</SubHeading>
            <Description>{t('scanSuccessOwnerName')}</Description>
          </div>
          <div className="review-order-odr__contact-details">
            <SubHeading>{t('taskOpenedPlayerPhoneHeading')}</SubHeading>
            <Description>{t('taskOpenedPlayerPhone')}</Description>
          </div>
        </div>

        <div className="review-order-odr__shop">
          <div className="review-order-odr__shop-heading">
            <Heading customClass="review-order-odr__shop-heading-text">
              {t('odrReviewShop')}
            </Heading>
            <HeadingButton
              text="Change Shop"
              onClick={() => {
                setBackFromReview(true);
                setStep(0);
              }}
            />
          </div>
          <div className="review-order-odr__shop-card">
            <SearchCard
              shop={{
                name: 'Jimmy’s Shop',
                address: '123 Main Street, Seattle, Washington',
              }}
            />
          </div>
        </div>
        <div className="review-order-odr__raquet">
          <div className="review-order-odr__raquet-heading">
            <Heading customClass="review-order-odr__shop-heading-text">
              {t('odrRacquet')}
            </Heading>
            <HeadingButton text="Change Racquet" />
          </div>
          <div className="review-order-odr__shop-card">
            <SearchCard
              shop={{
                img: '/img/orders/racquet-img.png',
                name: 'Wilson Hyper Prostaff 6.1',
                address: 'Tennis Racquet',
              }}
            />
          </div>
        </div>
        <div className="review-order-odr__summary">
          <div className="review-order-odr__summary-heading">
            <Heading customClass="review-order-odr__summary-heading-text">
              {t('odrSummary')}
            </Heading>
            <HeadingButton text="Change Strings" />
          </div>
          <div className="review-order-odr__summary-card">
            <SummaryCard />
          </div>
        </div>
        <div className="review-order-odr__buttons">
          {/* <PaymentButton isDark className="review-order-odr__buttons-apple">
            Pay with &nbsp; <img src="/img/button/apple.png" alt="apple-pay" />
          </PaymentButton> */}
          <PaymentButton
            className="review-order-odr__buttons-credit"
            handleClick={() => {
              setShowSurvey(true);
            }}
            style={{ marginBottom: '40px' }}
          >
            Pay with Stripe
          </PaymentButton>
        </div>
        {/* {active ? (
          <>
            <div className="review-order-odr__credit-cards">
              <img src="/img/orderpage/cards.png" alt="list-of-cards" />
            </div>
            <div className="review-order-odr__credit-card-input">
              <Field
                name="card-number"
                label="Card Number"
                placeholder="Card Number"
                type="text"
                component={CustomInput}
              />
            </div>
            <div className="review-order-odr__credit-card-input">
              <Field
                name="expiration-date"
                label="Expiration Date"
                placeholder="MM/YY"
                type="text"
                component={CustomInput}
              />
            </div>
            <div className="review-order-odr__credit-card-input">
              <Field
                name="security-code"
                label="Security Code"
                placeholder="Security Code (CVV)"
                type="text"
                component={CustomInput}
              />
            </div>
            <div className="review-order-odr__credit-card-input">
              <Field
                name="zip-code"
                label="ZIP code"
                type="text"
                component={CustomInput}
              />
            </div>
            <div className="review-order-odr__total-card">
              <div className="review-order-odr__total-card-text">
                Replace Strings
              </div>
              <div className="review-order-odr__total-card-price">$62.47</div>
            </div>
          </>
        ) : (
          <></>
        )} */}
        {/* <div className="review-order-odr__form-container">
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
