import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';

// Custom Components
import {
  Heading,
  Description,
  BackButton,
  CustomInput,
  CustomSelect,
  CustomPhoneInput,
} from 'web/components';
import { StepButton } from 'web/components/Buttons/StepButton.componet';

// Styles
import './GiveShopInfo.styles.scss';

const required = (value) => (value ? undefined : 'Required');

export function GiveShopInfo({ t, setShopCurrent, setStep, change }) {
  const [states, setStates] = useState([]);

  useEffect(() => {
    fetch('/states.json')
      .then((res) => res.json())
      .then((data) => setStates(data));
  }, []);

  const errors = useSelector((state) => state?.form?.signup?.syncErrors);
  const phoneNumber = useSelector(
    (state) => state?.form?.['signup']?.values?.['shop-phone-number']
  );
  const state = useSelector(
    (state) => state?.form?.['signup']?.values?.['shop-state']
  );
  return (
    <>
      <div className="find-shop-section">
        <div className="find-shop-section__heading">
          <BackButton onClick={() => setShopCurrent('search')} />
          <Heading customClass="phone-section__heading-text">
            {t('odrShop')}
          </Heading>
        </div>
        <div className="max-w-[450px] m-[0_auto]">
          <div className="find-shop-section__text-container">
            <Description customClass="find-shop-section__text-container-text">
              {t('odrShopText')}
            </Description>
          </div>
          <div className="find-shop-section__form-container">
            <Field
              name="shop-name"
              label="Shop Name"
              type="text"
              component={CustomInput}
              validate={required}
            />
            <div className="grid grid-cols-[3fr_1fr] items-center gap-[10px]">
              <Field
                name="shop-city"
                label="Shop City"
                type="text"
                component={CustomInput}
                validate={required}
              />
              <CustomSelect
                name="shop-state"
                options={states}
                label="State"
                placeholder="Select"
                customOnChange={(option) => {
                  change('shop-state', option?.value);
                }}
                showInitials
              />
            </div>
            <CustomPhoneInput
              change={change}
              name="shop-phone-number"
              label="Your Phone Number (Optional)"
              value={phoneNumber}
            />
          </div>
          <Description customClass="find-shop-section__form-text">
            {t('odrMsg')}
          </Description>
          <div className="find-shop-section__button mt-[50px]">
            <StepButton
              className="find-shop-section__button-btn"
              disabled={errors || !phoneNumber || !state}
              onClick={() => {
                setShopCurrent('thanks');
              }}
            >
              Submit Form
            </StepButton>
          </div>
        </div>
      </div>
    </>
  );
}
