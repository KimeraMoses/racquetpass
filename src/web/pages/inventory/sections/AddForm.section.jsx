import { Field } from 'redux-form';

import { BackButton, Heading, CustomInput, SubmitButton } from 'web/components';

import './AddForm.styles.scss';

export function AddForm({ t, setCurrentScreen }) {
  return (
    <>
      <div className="item-form">
        <div>
          <div className="item-form__header">
            <BackButton onClick={() => setCurrentScreen('inventory')} />
            <Heading>{t('profileButtonAddNew')}</Heading>
          </div>
          <div className="item-form__form">
            <Field
              name="type"
              label="Type"
              type="text"
              component={CustomInput}
            />
            <Field
              name="brand"
              label="Brand"
              type="text"
              component={CustomInput}
            />
            <Field
              name="model"
              label="Model"
              type="text"
              component={CustomInput}
            />
            <Field
              name="price"
              label="Price"
              type="text"
              component={CustomInput}
            />
          </div>
        </div>
        <div className="item-form__button">
          <SubmitButton onClick={() => setCurrentScreen('inventory')}>
            {t('profileButtonAddNew')}
          </SubmitButton>
        </div>
      </div>
    </>
  );
}
