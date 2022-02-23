import { Field } from 'redux-form';

import { BackButton, Heading, CustomInput, SubmitButton } from 'web/components';

import './ItemForm.styles.scss';

export function ItemForm({ t }) {
  return (
    <>
      <div className="item-form">
        <div className="item-form__header">
          <BackButton />
          {/* <Heading>{t('profileButtonAddNew')}</Heading> */}
          <Heading>{t('profileFormEdit')}</Heading>
        </div>
        <div className="item-form__form">
          {/* <form></form> */}
          <Field name="type" label="Type" type="text" component={CustomInput} />
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
        <div className="item-form__delete-button">
          <button className="item-form__delete-button-btn">
            {t('profileItemDelete')}
          </button>
        </div>
        <div className="item-form__button">
          {/* <SubmitButton>{t('profileButtonAddNew')}</SubmitButton> */}
          <SubmitButton>{t('profileButtonSave')}</SubmitButton>
        </div>
      </div>
    </>
  );
}
