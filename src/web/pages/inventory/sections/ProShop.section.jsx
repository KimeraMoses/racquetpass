import { HeadingButton, Heading, SubHeading } from 'web/components';

import './ProShop.styles.scss';

export function ProShop({ t, setCurrentScreen }) {
  return (
    <>
      <div className="shop">
        <div className="shop__header">
          <div className="shop__header-headings">
            <HeadingButton drawer onClick={() => setCurrentScreen('default')} />
            <Heading>{t('shopProHeading')}</Heading>
          </div>
          <HeadingButton
            text={t('shopButtonEdit')}
            onClick={() => {
              setCurrentScreen('editShop');
            }}
          />
        </div>

        <div className="shop__services-card">
          <div className="shop__services-card-divider"></div>
          <div>
            <div className="shop__services-card-inner">
              <div className="shop__services-card-heading">
                <Heading>{t('shopServiceHeading')}</Heading>
              </div>
              <div className="shop__services-card-inner-text">
                <SubHeading customClass="shop__services-card-inner-text-heading">
                  {t('shopDeliveryTime')}
                </SubHeading>
                <SubHeading customClass="shop__services-card-inner-text-txt">
                  {t('shopDeliveryTimeDay')}
                </SubHeading>
              </div>
              <div className="shop__services-card-inner-text">
                <SubHeading customClass="shop__services-card-inner-text-heading">
                  {t('shopLaborPriceHeading')}
                </SubHeading>
                <SubHeading customClass="shop__services-card-inner-text-txt">
                  {t('shopLaborPrice')}
                </SubHeading>
              </div>
            </div>
          </div>
        </div>
        <div className="shop__contact-heading">
          <Heading>{t('ShopContactHeading')}</Heading>
        </div>
        <div className="shop__contact-info">
          <div className="shop__contact-info-inner">
            <SubHeading customClass="shop__contact-info-inner-heading">
              {t('shopEmailHeading')}
            </SubHeading>
            <SubHeading customClass="shop__contact-info-inner-txt">
              {t('shopEmail')}
            </SubHeading>
          </div>
          <div className="shop__contact-info-inner">
            <SubHeading customClass="shop__contact-info-inner-heading">
              {t('taskOpenedPlayerPhoneHeading')}
            </SubHeading>
            <SubHeading customClass="shop__contact-info-inner-txt">
              {t('shopPhone')}
            </SubHeading>
          </div>
          <div className="shop__contact-info-inner">
            <SubHeading customClass="shop__contact-info-inner-heading">
              {t('odrShopName')}
            </SubHeading>
            <SubHeading customClass="shop__contact-info-inner-txt">
              {t('businessAccountDetailsHeading')}
            </SubHeading>
          </div>
          <div className="shop__contact-info-inner">
            <SubHeading customClass="shop__contact-info-inner-heading">
              {t('orderOpenedShopAddressHeading')}
            </SubHeading>
            <SubHeading customClass="shop__contact-info-inner-txt">
              {t('orderOpenedShopAddress')}
            </SubHeading>
            <SubHeading customClass="shop__contact-info-inner-txt">
              {t('orderOpenedShopAddress1')}
            </SubHeading>
          </div>
        </div>
      </div>
    </>
  );
}
