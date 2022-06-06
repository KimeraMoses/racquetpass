import { Field } from 'redux-form';
import { Link } from 'react-router-dom';

import {
  Heading,
  HeadingButton,
  CustomInput,
  SubHeading,
  Description,
  CustomSwitch,
  CustomSelect,
} from 'web/components';

import './EditShop.styles.scss';
import { SubmitButton } from 'web/components/Buttons/SubmitButton.component';

export function EditShop({ t, setCurrentScreen }) {
  const shopNameEdited = true;
  const shopAddressEdited = false;
  return (
    <>
      <div className="edit">
        <div className="edit__heading">
          <Heading>Edit My Pro Shop Info</Heading>
          <HeadingButton close onClick={() => setCurrentScreen('proshop')} />
        </div>

        <div className="edit__services-heading">
          <Heading>{t('orderOpenedHeading')}</Heading>
        </div>

        <div className="edit__services-form">
          <Field
            name="delivery-time"
            label="Estimated delivery time (# od days)"
            type="text"
            component={CustomInput}
          />
          <Field
            name="labor-price"
            label="Labor price"
            type="text"
            component={CustomInput}
          />
        </div>
        <div className="edit__service-text">
          <Description customClass="edit__service-text-txt">
            {t('editServicesText')}
          </Description>
        </div>
        <div className="edit__service-switch flex justify-between mt-[26px]">
          <Description>{t('shopString')}</Description>
          <CustomSwitch handleChange={() => {}} checked={false} />
        </div>
        <div className="edit__sevice-string-txt">
          <Description>{t('editShopNewTxt')}</Description>
        </div>

        <div className="edit__contact-heading">
          <Heading>{t('ShopContactHeading')}</Heading>
        </div>
        <div className="edit__contact-form">
          <Field
            name="shop"
            label="Shop Name"
            type="text"
            component={CustomInput}
          />
          <Field
            name="email"
            label="Email"
            type="email"
            component={CustomInput}
          />
          <Field
            name="phone-number"
            label="Phone Number"
            type="text"
            component={CustomInput}
          />
        </div>
        <div className="edit__address-heading">
          <Heading>{t('orderOpenedShopAddressHeading')}</Heading>
        </div>
        <div className="edit__address-form">
          <Field
            name="address"
            label="Street Address"
            type="text"
            component={CustomInput}
          />
          <Field
            name="apt"
            label="Apt, suite, etc (optional)"
            type="email"
            component={CustomInput}
          />
          <div className="edit__address-form-city">
            <Field
              name="shopcity"
              label="Shop City"
              type="text"
              component={CustomInput}
            />
            <Field
              name="shopstate"
              label="Shop State"
              placeholder="Select"
              component={CustomSelect}
              options={[
                { label: 'Babolat', value: 'Babolat' },
                { label: 'Wilson', value: 'Wilson' },
              ]}
            />
          </div>
          <Field
            name="zip"
            label="Zip Code"
            placeholder="ZIP"
            type="text"
            component={CustomInput}
          />
        </div>
        {/* <div className="edit__shop-details">
          <div className="edit__shop-details-header">
            <SubHeading customClass="edit__shop-details-header-heading">
              {t('odrShopName')}
            </SubHeading>
            {!shopNameEdited ? (
              <div
                className="edit__shop-details-header-link"
                onClick={() => setCurrentScreen('editShopName')}
              >
                {t('editNameRequest')}
              </div>
            ) : (
              <div
                className="edit__shop-details-header-modify-link"
                // onClick={() => setCurrentScreen('modifyShopName')}
              >
                {t('cancelRequest')}
              </div>
            )}
          </div>
          <div className="edit__shop-details-text">
            <SubHeading customClass="edit__shop-details-text-txt">
              {t('businessAccountDetailsHeading')}
            </SubHeading>
            {!shopNameEdited ? (
              <></>
            ) : (
              <SubHeading customClass="edit__shop-details-text-modify-txt">
                {t('modifyRequestText')}
              </SubHeading>
            )}
          </div>
        </div> */}
        {/* <div className="edit__shop-details">
          <div className="edit__shop-details-header">
            <SubHeading customClass="edit__shop-details-header-heading">
              {t('orderOpenedShopAddressHeading')}
            </SubHeading>
            {!shopAddressEdited ? (
              <div
                className="edit__shop-details-header-link"
                onClick={() => setCurrentScreen('editShopAddress')}
              >
                {t('editAddressRequest')}
              </div>
            ) : (
              <div
                className="edit__shop-details-header-modify-link"
                // onClick={() => setCurrentScreen('modifyShopAddress')}
              >
                {t('cancelRequest')}
              </div>
            )}
          </div>
          <div className="edit__shop-details-text">
            <SubHeading customClass="edit__shop-details-text-txt">
              {t('orderOpenedShopAddress')}
            </SubHeading>
            <SubHeading customClass="edit__shop-details-text-txt">
              {t('orderOpenedShopAddress1')}
            </SubHeading>
            {shopAddressEdited ? (
              <SubHeading customClass="edit__shop-details-text-modify-txt">
                {t('modifyAddressRequest')}
              </SubHeading>
            ) : (
              <></>
            )}
          </div>
        </div> */}

        <div className="edit__button">
          <SubmitButton onClick={() => setCurrentScreen('proshop')}>
            {t('stringDetailsSave')}
          </SubmitButton>
        </div>
      </div>
    </>
  );
}
