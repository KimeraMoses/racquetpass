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

import './AddForm.styles.scss';

const required = (value) => (value ? undefined : 'This field is required');

export function AddForm({ t, setCurrentScreen, change }) {
  const errors = useSelector((state) => state?.form?.inventory?.syncErrors);

  const [show, setShow] = useState(false);
  const [price, setPrice] = useState('');
  // const [active, setActive] = useState(true);
  const [check, setCheck] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOnClick = (index) => setActiveIndex(index);

  const handleCheck = () => setCheck(!check);

  // const handleActive = () => setActive(!active);

  const handleShow = () => setShow(!show);
  const btns = ['Reel', 'Packet', 'Both'];
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
              validate={required}
              component={CustomInput}
            />
            <Field
              name="brand"
              label="Brand"
              type="text"
              validate={required}
              component={CustomInput}
            />
            <Field
              name="model"
              label="Model"
              type="text"
              required={required}
              component={CustomInput}
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
            <div className="item-form__form-types">
              <div className="item-form__form-types-heading">
                <Description>{t('inventoryAddItemString')}</Description>
                <Modal
                  showModal={show}
                  handleShow={handleShow}
                  heading="Type specifies how you store this item."
                  text={
                    <div className="mt-[25px] flex flex-col gap-[25px]">
                      <p>
                        This matters when hybrid stringing, since each packet
                        won't be fully used.
                      </p>

                      <p>
                        <b>If using reels</b>, players will pay half the price
                        for this item (since half as much will be used).
                      </p>

                      <p>
                        <b>If using packets</b>, players will pay full price but
                        will recieve the extra string when they pick up their
                        order.
                      </p>

                      <p>
                        <b>If using both</b>, players will get to choose which
                        type you string with.
                      </p>
                    </div>
                  }
                  closeText="Got it"
                />
                <img
                  onClick={handleShow}
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuOTk5OTIgMS42NjYzNEM1LjQxNjU4IDEuNjY2MzQgMS42NjY1OCA1LjQxNjM0IDEuNjY2NTggOS45OTk2N0MxLjY2NjU4IDE0LjU4MyA1LjQxNjU4IDE4LjMzMyA5Ljk5OTkyIDE4LjMzM0MxNC41ODMzIDE4LjMzMyAxOC4zMzMzIDE0LjU4MyAxOC4zMzMzIDkuOTk5NjdDMTguMzMzMyA1LjQxNjM0IDE0LjU4MzMgMS42NjYzNCA5Ljk5OTkyIDEuNjY2MzRaIiBzdHJva2U9IiMzQjNCM0IiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTEwIDEzLjMzM1Y5LjE2NjM0IiBzdHJva2U9IiMzQjNCM0IiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTEwLjAwNDYgNi42NjY5OUg5Ljk5NzE1IiBzdHJva2U9IiMzQjNCM0IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo="
                  alt="info-button"
                  className="cursor-pointer"
                />
              </div>
              <div className="item-form__form-types-btns">
                {btns.map((el, index) => {
                  return (
                    <>
                      <button
                        type="button"
                        key={index}
                        onClick={() => handleOnClick(index)}
                        className={
                          activeIndex === index
                            ? 'item-form__form-types-btns-btn-active'
                            : 'item-form__form-types-btns-btn'
                        }
                      >
                        {el}
                      </button>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="item-form__form-switch">
              <Description>In Stock</Description>
              <CustomSwitch handleChange={handleCheck} checked={check} />
            </div>
          </div>
        </div>
        <div className="item-form__button w-full sm:w-[450px] m-[0_auto] mt-[50px]">
          <SubmitButton
            onClick={() => setCurrentScreen('detail')}
            disabled={errors || !price}
            className="w-full"
          >
            {t('profileButtonAddNew')}
          </SubmitButton>
        </div>
      </div>
    </>
  );
}
