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
  return (
    <>
      <div className="find-shop-section">
        <div>
          <div className="find-shop-section__heading">
            <BackButton onClick={() => setShopCurrent('search')} />
            <Heading customClass="phone-section__heading-text">
              {t('odrShop')}
            </Heading>
          </div>
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
              <Field
                name="shopState"
                label="Shop State"
                placeholder="Select"
                validate={required}
                component={(props) => (
                  <CustomSelect
                    {...props}
                    customOnChange={(option) => {
                      change('shopState', option?.value);
                    }}
                    showInitials
                  />
                )}
                options={states}
              />
            </div>
            <Field
              name="phone-number"
              label="Your Phone Number (Optional)"
              type="number"
              component={(props) => <CustomInput {...props} pattern="\d*" />}
            />
          </div>
          <Description customClass="find-shop-section__form-text">
            {t('odrMsg')}
          </Description>
        </div>
        <div className="find-shop-section__button">
          <StepButton
            className="find-shop-section__button-btn"
            disabled={errors}
            onClick={() => {
              setShopCurrent('thanks');
            }}
          >
            Submit Form
          </StepButton>
        </div>
      </div>
    </>
  );
}
