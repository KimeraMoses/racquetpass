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
  const [check, setCheck] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOnClick = (index) => setActiveIndex(index);

  const handleCheck = () => setCheck(!check);
  const [show, setShow] = useState(false);
  const btns = ['Reel', 'Packet', 'Both'];

  const handleShow = () => setShow(!show);
  return (
    <>
      <div className="edit-form">
        <div>
          <div className="edit-form__header">
            <BackButton onClick={() => setCurrentScreen('detail')} />
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
                {btns.map((el, index) => {
                  return (
                    <>
                      <button
                        key={index}
                        onClick={() => handleOnClick(index)}
                        type="button"
                        className={
                          activeIndex === index
                            ? 'edit-form__form-types-btns-btn-active'
                            : 'edit-form__form-types-btns-btn'
                        }
                      >
                        {el}
                      </button>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="edit-form__form-switch">
              <Description>In Stock</Description>
              <CustomSwitch handleChange={handleCheck} checked={check} />
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
                  <button onClick={handleShow} type="button">
                    Cancel
                  </button>
                  <button className="text-[#EA5353]" type="button">
                    Delete
                  </button>
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
