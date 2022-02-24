import { Field } from 'redux-form';

import { BackButton, Heading, CustomInput, SubmitButton } from 'web/components';

import './EditForm.styles.scss';

export function EditForm({ t, setCurrentScreen }) {
  return (
    <>
      <div className="edit-form">
        <div>
          <div className="edit-form__header">
            <BackButton onClick={() => setCurrentScreen('inventory')} />
            {/* <Heading>{t('profileButtonAddNew')}</Heading> */}
            <Heading>{t('profileFormEdit')}</Heading>
          </div>
          <div className="edit-form__form">
            {/* <form></form> */}
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
          <div className="edit-form__delete-button">
            <button
              className="edit-form__delete-button-btn"
              type="button"
              onClick={() => setCurrentScreen('inventory')}
            >
              {t('profileItemDelete')}
            </button>
          </div>
        </div>
        <div className="edit-form__button">
          {/* <SubmitButton>{t('profileButtonAddNew')}</SubmitButton> */}
          <SubmitButton onClick={() => setCurrentScreen('inventory')}>
            {t('profileButtonSave')}
          </SubmitButton>
        </div>
      </div>
    </>
  );
}
