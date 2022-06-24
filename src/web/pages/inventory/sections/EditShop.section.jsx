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
import { useEffect, useState } from 'react';

// const r = /^\s*([A-Z]\w*\s*)*$/;
// const titleCase = (value) => {
//   if (r.test(value) === true) {
//     return undefined;
//   } else {
//     return 'Please enter shop name in title case';
//   }
// };
//

export function EditShop({ t, setCurrentScreen, change }) {
  const [labor, setLabor] = useState();
  const [delivery, setDelivery] = useState();

  const [states, setStates] = useState([]);

  useEffect(() => {
    fetch('/states.json')
      .then((res) => res.json())
      .then((data) => setStates(data));
  }, []);
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
            text="Cancel"
            onClick={() => setCurrentScreen('proshop')}
          />
        </div>

        <div className="max-w-[450px] m-[0_auto]">
          <div className="edit__services-heading">
            <Heading>{t('orderOpenedHeading')}</Heading>
          </div>
          <div className="edit__services-form">
            <CustomInput
              type="number"
              value={delivery}
              customOnChange={(e) => {
                setDelivery(e?.target?.value);
              }}
              customOnBlur={(e) => {
                if (e?.target?.value) {
                  setLabor(`$${e?.target?.value}`);
                }
                change('delivery-days', e?.target?.value);
              }}
              hidePostFix
              label="Estimated delivery time (# of days)"
              name="delivery-time"
              pattern="\d*"
            />
            <CustomInput
              pattern="\d*"
              value={labor}
              customOnChange={(e) => {
                setLabor(e?.target?.value);
              }}
              label="Labor Price"
              hidePostFix
              customOnBlur={(e) => {
                if (e?.target?.value) {
                  setLabor(`$${e?.target?.value}`);
                }
                change('labore-price', e?.target?.value);
              }}
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
              // validate={titleCase}
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
                name="state"
                label="State"
                placeholder="Select"
                component={(props) => (
                  <CustomSelect
                    {...props}
                    customOnChange={(option) => {
                      change('state', option?.value);
                    }}
                    showInitials
                  />
                )}
                options={states}
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
