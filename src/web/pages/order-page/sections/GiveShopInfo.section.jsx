import { useEffect, useState } from 'react';
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

export function GiveShopInfo({ t, setShopCurrent, setStep }) {
  const [states, setStates] = useState([]);

  useEffect(() => {
    fetch('/states.json')
      .then((res) => res.json())
      .then((data) => setStates(data));
  }, []);

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
            />
            <div className="grid grid-cols-[3fr_1fr] items-center gap-[10px]">
              <Field
                name="shop-city"
                label="Shop City"
                type="text"
                component={CustomInput}
              />
              <Field
                name="shopState"
                label="Shop State"
                placeholder="Select"
                component={CustomSelect}
                options={states}
              />
            </div>
            <Field
              name="phone-number"
              label="Phone Number"
              type="text"
              component={CustomInput}
            />
          </div>
          <Description customClass="find-shop-section__form-text">
            {t('odrMsg')}
          </Description>
        </div>
        <div className="find-shop-section__button">
          <StepButton
            className="find-shop-section__button-btn"
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
