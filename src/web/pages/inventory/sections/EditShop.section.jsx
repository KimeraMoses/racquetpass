import { Field } from 'redux-form';
import { Link } from 'react-router-dom';

import {
  Heading,
  HeadingButton,
  CustomInput,
  SubHeading,
  Description,
} from 'web/components';

import './EditShop.styles.scss';
import { SubmitButton } from 'web/components/Buttons/SubmitButton.component';

export function EditShop({ t }) {
  return (
    <>
      <div className="edit">
        <div className="edit__heading">
          <Heading>{t('odrHeading')}</Heading>
          <HeadingButton close />
        </div>
        <div className="edit__contact-heading">
          <Heading>{t('ShopContactHeading')}</Heading>
        </div>
        <div className="edit__contact-form">
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
        <div className="edit__shop-details">
          <div className="edit__shop-details-header">
            <SubHeading customClass="edit__shop-details-header-heading">
              {t('odrShopName')}
            </SubHeading>
            <Link to="#" className="edit__shop-details-header-link">
              {t('editNameRequest')}
            </Link>
            {/* modify shop name */}
            {/* <Link to="#" className="edit__shop-details-header-modify-link">
              {t('modifyRequest')}
            </Link> */}
          </div>
          <div className="edit__shop-details-text">
            <SubHeading customClass="edit__shop-details-text-txt">
              {t('businessAccountDetailsHeading')}
            </SubHeading>
            {/* <SubHeading customClass="edit__shop-details-text-modify-txt">
              {t('modifyRequestText')}
            </SubHeading> */}
          </div>
        </div>
        <div className="edit__shop-details">
          <div className="edit__shop-details-header">
            <SubHeading customClass="edit__shop-details-header-heading">
              {t('orderOpenedShopAddressHeading')}
            </SubHeading>
            {/* <Link to="#" className="edit__shop-details-header-link">
              {t('editAddressRequest')}
            </Link> */}
            {/* // modify shop name */}
            <Link to="#" className="edit__shop-details-header-modify-link">
              {t('modifyRequest')}
            </Link>
          </div>
          <div className="edit__shop-details-text">
            <SubHeading customClass="edit__shop-details-text-txt">
              {t('orderOpenedShopAddress')}
            </SubHeading>
            <SubHeading customClass="edit__shop-details-text-txt">
              {t('orderOpenedShopAddress1')}
            </SubHeading>
            {/* //modify shop text */}
            <SubHeading customClass="edit__shop-details-text-modify-txt">
              {t('modifyAddressRequest')}
            </SubHeading>
          </div>
        </div>
        <div className="edit__services-heading">
          <Heading>{t('shopServiceHeading')}</Heading>
        </div>

        <div className="edit__services-form">
          <Field
            name="delivery-time"
            label="Estimated delivery time"
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
        <div className="edit__button">
          <SubmitButton>{t('stringDetailsSave')}</SubmitButton>
        </div>
      </div>
    </>
  );
}
