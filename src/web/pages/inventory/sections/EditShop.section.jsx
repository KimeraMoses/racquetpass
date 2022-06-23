import { Field } from 'redux-form';
import { useSelector } from 'react-redux';

import {
  Heading,
  HeadingButton,
  CustomInput,
  Description,
  CustomSwitch,
  CustomSelect,
  SubmitButton,
  CustomPhoneInput,
} from 'web/components';
import './EditShop.styles.scss';

const r = /^\s*([A-Z]\w*\s*)*$/;
const titleCase = (value) => {
  if (r.test(value) === true) {
    return undefined;
  } else {
    return 'Please enter shop name in title case';
  }
};
//

export function EditShop({ t, setCurrentScreen, change }) {
  // const shopNameEdited = true;
  // const shopAddressEdited = false;
  const phoneNumber = useSelector(
    (state) => state?.form?.inventory?.values?.['phone-number']
  );
  return (
    <>
      <div className="edit">
        <div className="edit__heading">
          <Heading>Edit My Pro Shop Info</Heading>
          <HeadingButton
            text="Close"
            onClick={() => setCurrentScreen('proshop')}
          />
        </div>

        <div className="max-w-[450px] m-[0_auto]">
          <div className="edit__services-heading">
            <Heading>{t('orderOpenedHeading')}</Heading>
          </div>
          <div className="edit__services-form">
            <Field
              name="delivery-time"
              label="Estimated delivery time (# of days)"
              type="number"
              component={CustomInput}
            />
            <Field
              name="labor-price"
              label="Labor price"
              type="number"
              component={CustomInput}
            />
          </div>
          <div className="mt-[12px] text-[10px] text-[#838383] font-semibold">
            This is how much you charge for the labor of restringing a racquet.
            It will be added to the cost of strings to determine the price of a
            service order.
          </div>
          <div className="edit__service-switch flex justify-between mt-[26px]">
            <Description>{t('shopString')}</Description>
            <CustomSwitch handleChange={() => {}} checked={false} />
          </div>
          <div className="mt-[6px] text-[10px] text-[#838383] font-semibold">
            {t('editShopNewTxt')}
          </div>
          <div className="edit__contact-heading">
            <Heading>{t('ShopContactHeading')}</Heading>
          </div>
          <div className="edit__contact-form">
            <Field
              name="shop"
              label="Shop Name"
              type="text"
              validate={titleCase}
              component={CustomInput}
            />
            <Field
              name="email"
              label="Email"
              type="email"
              component={CustomInput}
            />
            <CustomPhoneInput
              change={change}
              name="phone-number"
              label="Phone Number"
              value={phoneNumber}
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
          <div className="edit__button">
            <SubmitButton onClick={() => setCurrentScreen('proshop')}>
              {t('stringDetailsSave')}
            </SubmitButton>
          </div>
        </div>
      </div>
    </>
  );
}
