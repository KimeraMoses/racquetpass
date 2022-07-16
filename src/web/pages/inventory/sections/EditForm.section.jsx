import { useState } from 'react';
import { useSelector } from 'react-redux';
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

const required = (value) => (value ? undefined : 'This field is required');

export function EditForm({ t, setCurrentScreen, change }) {
  const errors = useSelector((state) => state?.form?.inventory?.syncErrors);

  const [check, setCheck] = useState(true);
  const [price, setPrice] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOnClick = (index) => setActiveIndex(index);

  const handleCheck = () => setCheck(!check);
  const [show, setShow] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const btns = ['Reel', 'Packet', 'Both'];

  const handleShow = () => setShow(!show);
  const handleShowInfo = () => setShowInfo(!showInfo);
  return (
    <>
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
      <Modal
        showModal={showInfo}
        handleShow={handleShowInfo}
        heading="Type specifies how you store this item."
        text={
          <div className="mt-[25px] flex flex-col gap-[25px]">
            <p>
              This matters when hybrid stringing, since each packet won't be
              fully used.
            </p>

            <p>
              <b>If using reels</b>, players will pay half the price for this
              item (since half as much will be used).
            </p>

            <p>
              <b>If using packets</b>, players will pay full price but will
              recieve the extra string when they pick up their order.
            </p>

            <p>
              <b>If using both</b>, players will get to choose which type you
              string with.
            </p>
          </div>
        }
        closeText="Got it"
      />
      <div className="edit-form">
        <div>
          <div className="edit-form__header">
            <BackButton onClick={() => setCurrentScreen('detail')} />
            {/* <Heading>{t('profileButtonAddNew')}</Heading> */}
            <Heading>{t('profileFormEdit')}</Heading>
          </div>
          <div className="edit-form__form">
            <Field
              name="edit-brand"
              label="Brand"
              type="text"
              component={CustomInput}
              validate={required}
            />
            <Field
              name="edit-model"
              label="Model"
              type="text"
              component={CustomInput}
              validate={required}
            />
            <CustomInput
              pattern="\d*"
              value={price}
              customOnChange={(e) => {
                const value = e.target.value;
                if (value.charAt(0) === '$') {
                  const substr = value?.substring(1);
                  if (!isNaN(Number(substr))) {
                    setPrice(`${substr}`);
                  }
                } else {
                  if (!isNaN(Number(value))) {
                    setPrice(value);
                  }
                }
              }}
              label="Price"
              hidePostFix
              customOnBlur={(e) => {
                const value = e?.target?.value;
                if (value?.charAt(0) === '$') {
                  const substr = value?.substring(1);
                  setPrice(`$${Number(substr)?.toFixed(2)}`);
                } else {
                  setPrice(`$${Number(e?.target?.value).toFixed(2)}`);
                }
                change('itemPrice', e?.target?.value);
              }}
            />

            <div className="edit-form__form-types">
              <div className="edit-form__form-types-heading">
                <Description>{t('inventoryAddItemString')}</Description>

                <img
                  onClick={handleShowInfo}
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuOTk5OTIgMS42NjYzNEM1LjQxNjU4IDEuNjY2MzQgMS42NjY1OCA1LjQxNjM0IDEuNjY2NTggOS45OTk2N0MxLjY2NjU4IDE0LjU4MyA1LjQxNjU4IDE4LjMzMyA5Ljk5OTkyIDE4LjMzM0MxNC41ODMzIDE4LjMzMyAxOC4zMzMzIDE0LjU4MyAxOC4zMzMzIDkuOTk5NjdDMTguMzMzMyA1LjQxNjM0IDE0LjU4MzMgMS42NjYzNCA5Ljk5OTkyIDEuNjY2MzRaIiBzdHJva2U9IiMzQjNCM0IiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTEwIDEzLjMzM1Y5LjE2NjM0IiBzdHJva2U9IiMzQjNCM0IiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTEwLjAwNDYgNi42NjY5OUg5Ljk5NzE1IiBzdHJva2U9IiMzQjNCM0IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo="
                  alt="info-button"
                  className="cursor-pointer"
                />
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
          </div>
          <div className="edit-form__button">
            {/* <SubmitButton>{t('profileButtonAddNew')}</SubmitButton> */}
            <SubmitButton
              disabled={errors || !price}
              onClick={() => setCurrentScreen('inventory')}
              className="w-full"
            >
              {t('profileButtonSave')}
            </SubmitButton>
          </div>
        </div>
      </div>
    </>
  );
}
