import { useState } from 'react';
import { Field } from 'redux-form';

import {
  BackButton,
  Heading,
  CustomInput,
  SubmitButton,
  Modal,
  Description,
  CustomSwitch,
} from 'web/components';

import './EditForm.styles.scss';

export function EditForm({ t, setCurrentScreen }) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);
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
            {/* <Field
              name="type"
              label="Type"
              type="text"
              component={CustomInput}
            /> */}
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

            <div className="edit-form__form-types">
              <div className="edit-form__form-types-heading">
                <Description>{t('inventoryAddItemString')}</Description>

                <img src="/img/button/info-new.png" alt="info-button" />
              </div>
              <div className="edit-form__form-types-btns">
                <button className="edit-form__form-types-btns-btn edit-form__form-types-btns-btn-active">
                  Reel
                </button>
                <button className="edit-form__form-types-btns-btn">
                  Packet
                </button>
                <button className="edit-form__form-types-btns-btn">Both</button>
              </div>
            </div>
            <div className="edit-form__form-switch">
              <Description>In Stock</Description>
              <CustomSwitch handleChange={() => {}} checked={true} />
            </div>
          </div>
          <div className="edit-form__delete-button flex justify-center">
            <button
              className="edit-form__delete-button-btn"
              type="button"
              onClick={handleShow}
            >
              {t('profileItemDelete')}
            </button>
            <Modal
              showModal={show}
              handleShow={handleShow}
              heading="Delete “Wilson 5989-C3PO”?"
              text={
                <div className="">
                  <p>This will permanently delete this item.</p>
                </div>
              }
              closeText={
                <div className="flex justify-end items-center gap-[24px]">
                  <button>Cancel</button>
                  <button className="text-[#EA5353]">Delete</button>
                </div>
              }
            />
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
