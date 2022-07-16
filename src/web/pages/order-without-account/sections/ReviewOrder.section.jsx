// Custom Components
import {
  Heading,
  Description,
  HeadingButton,
  SummaryCard,
  SubHeading,
} from 'web/components';
import { SearchCard } from 'web/components/index';

// Styles
import './ReviewOrder.styles.scss';
import { BackButton } from 'web/components/Buttons/BackButton.component';
import { PaymentButton } from 'web/components/Buttons/PaymentButton.component';

export function ReviewOrder({ t, setStep, setDone }) {
  return (
    <>
      <div className="review-order-owa">
        <div className="review-order-owa__heading">
          <BackButton onClick={() => setStep(8)} />
          <Heading customClass="review-order-owa__heading-text">
            {t('odrReviewHeading')}
          </Heading>
        </div>
        <div className="review-order-owa__text-container">
          <Description customClass="review-order-owa__text-container-text">
            {t('odrReviewDesc')}
          </Description>
        </div>
        <div className="review-order-owa__shop-heading">
          <Heading customClass="review-order-owa__shop-heading-text">
            {t('ShopContactHeading')}
          </Heading>
          <HeadingButton text="Edit" />
        </div>
        <div className="review-order-owa__contact">
          <div className="review-order-owa__contact-details">
            <SubHeading>{t('reviewOdrName')}</SubHeading>
            <Description>{t('scanSuccessOwnerName')}</Description>
          </div>
          <div className="review-order-owa__contact-details">
            <SubHeading>{t('taskOpenedPlayerPhoneHeading')}</SubHeading>
            <Description>{t('taskOpenedPlayerPhone')}</Description>
          </div>
        </div>

        <div className="review-order-owa__shop">
          <div className="review-order-owa__shop-heading">
            <Heading customClass="review-order-owa__shop-heading-text">
              {t('odrReviewShop')}
            </Heading>
            <HeadingButton text="Change Shop" />
          </div>
          <div className="review-order-owa__shop-card">
            <SearchCard
              shop={{
                name: 'Jimmy’s Shop',
                address: '123 Main Street, Seattle, Washington',
              }}
            />
          </div>
        </div>
        <div className="review-order-owa__raquet">
          <div className="review-order-owa__raquet-heading">
            <Heading customClass="review-order-owa__shop-heading-text">
              {t('odrRacquet')}
            </Heading>
            <HeadingButton text="Change Racquet" />
          </div>
          <div className="review-order-owa__shop-card">
            <SearchCard
              shop={{
                img: '/img/orders/racquet-img.png',
                name: 'Wilson Hyper Prostaff 6.1',
                address: 'Tennis Racquet',
              }}
            />
          </div>
        </div>
        <div className="review-order-owa__summary">
          <div className="review-order-owa__summary-heading">
            <Heading customClass="review-order-owa__summary-heading-text">
              {t('odrSummary')}
            </Heading>
            <HeadingButton text="Change Strings" />
          </div>
          <div className="review-order-owa__summary-card">
            <SummaryCard />
          </div>
        </div>
        <div className="review-order-owa__buttons">
          {/* <PaymentButton isDark className="review-order-owa__buttons-apple">
            Pay with &nbsp; <img src="/img/button/apple.png" alt="apple-pay" />
          </PaymentButton> */}
          <PaymentButton
            className="review-order-owa__buttons-credit"
            handleClick={() => {}}
            style={{ marginBottom: '40px' }}
          >
            Pay with Stripe
          </PaymentButton>
        </div>
        {/* {active ? (
          <>
            <div className="review-order-owa__credit-cards">
              <img src="/img/orderpage/cards.png" alt="list-of-cards" />
            </div>
            <div className="review-order-owa__credit-card-input">
              <Field
                name="card-number"
                label="Card Number"
                placeholder="Card Number"
                type="text"
                component={CustomInput}
              />
            </div>
            <div className="review-order-owa__credit-card-input">
              <Field
                name="expiration-date"
                label="Expiration Date"
                placeholder="MM/YY"
                type="text"
                component={CustomInput}
              />
            </div>
            <div className="review-order-owa__credit-card-input">
              <Field
                name="security-code"
                label="Security Code"
                placeholder="Security Code (CVV)"
                type="text"
                component={CustomInput}
              />
            </div>
            <div className="review-order-owa__credit-card-input">
              <Field
                name="zip-code"
                label="ZIP code"
                type="text"
                component={CustomInput}
              />
            </div>
            <div className="review-order-owa__total-card">
              <div className="review-order-owa__total-card-text">
                Replace Strings
              </div>
              <div className="review-order-owa__total-card-price">$62.47</div>
            </div>
          </>
        ) : (
          <></>
        )} */}
        {/* <div className="review-order-owa__form-container">
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