import { Field } from 'redux-form';

import { CustomInput, HeadingButton, Heading } from 'web/components';
import { SubmitButton } from 'web/components/Buttons/SubmitButton.component';

import './AddCard.styles.scss';

export function AddCard({ t }) {
  return (
    <>
      <div className="add-card">
        <div>
          <div className="add-card__header">
            <Heading>{t('addCardTitle')}</Heading>
            <HeadingButton close />
          </div>
          <div className="add-card__credit-cards">
            <img src="/img/orderpage/cards.png" alt="list-of-cards" />
          </div>
          <div className="add-card__credit-card-input">
            <Field
              name="card-number"
              label="Card Number"
              placeholder="Card Number"
              type="text"
              component={CustomInput}
            />
          </div>
          <div className="add-card__credit-card-input">
            <Field
              name="expiration-date"
              label="Expiration Date"
              placeholder="MM/YY"
              type="text"
              component={CustomInput}
            />
          </div>
          <div className="add-card__credit-card-input">
            <Field
              name="security-code"
              label="Security Code"
              placeholder="Security Code (CVV)"
              type="text"
              component={CustomInput}
            />
          </div>
          <div className="add-card__credit-card-input">
            <Field
              name="zip-code"
              label="ZIP code"
              type="text"
              component={CustomInput}
            />
            <Field
              name="name"
              label="Name (Optional)"
              placeholder="Name"
              type="text"
              component={CustomInput}
            />
          </div>
        </div>
        <div className="add-card__button">
          <SubmitButton>{t('addCardTitle')}</SubmitButton>
        </div>
      </div>
    </>
  );
}
