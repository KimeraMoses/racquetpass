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

import './AddForm.styles.scss';

export function AddForm({ t, setCurrentScreen }) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);
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
                  src="/img/button/info-new.png"
                  alt="info-button"
                />
              </div>
              <div className="item-form__form-types-btns">
                <button className="item-form__form-types-btns-btn item-form__form-types-btns-btn-active">
                  Reel
                </button>
                <button className="item-form__form-types-btns-btn">
                  Packet
                </button>
                <button className="item-form__form-types-btns-btn">Both</button>
              </div>
            </div>
            <div className="item-form__form-switch">
              <Description>In Stock</Description>
              <CustomSwitch handleChange={() => {}} checked={false} />
            </div>
          </div>
        </div>
        <div className="item-form__button">
          <SubmitButton onClick={() => setCurrentScreen('detail')}>
            {t('profileButtonAddNew')}
          </SubmitButton>
        </div>
      </div>
    </>
  );
}
