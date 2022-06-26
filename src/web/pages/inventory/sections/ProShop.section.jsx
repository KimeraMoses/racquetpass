import { useNavigate } from 'react-router-dom';
import {
  HeadingButton,
  Heading,
  SubHeading,
  // CustomInput,
} from 'web/components';

import './ProShop.styles.scss';

export function ProShop({ t, setCurrentScreen, setDrawer }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="shop">
        <div className="shop__header">
          <div className="shop__header-headings">
            <HeadingButton drawer onClick={() => setDrawer()} />
            <Heading>{t('shopProHeading')}</Heading>
          </div>
          <HeadingButton
            text={t('shopButtonEdit')}
            onClick={() => {
              setCurrentScreen('editShop');
            }}
          />
        </div>

        <div className="max-w-[450px] m-[0_auto]">
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
                <div className="shop__services-card-inner-text">
                  <SubHeading customClass="shop__services-card-inner-text-heading">
                    {t('shopString')}
                  </SubHeading>
                  <SubHeading customClass="shop__services-card-inner-text-txt">
                    {t('shopNo')}
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
                {t('odrShopName')}
              </SubHeading>
              <SubHeading customClass="shop__contact-info-inner-txt">
                {t('businessAccountDetailsHeading')}
              </SubHeading>
            </div>
            <div className="shop__contact-info-inner">
              <SubHeading customClass="shop__contact-info-inner-heading">
                {t('shopEmailHeading')}
              </SubHeading>
              <SubHeading customClass="shop__contact-info-inner-txt text-[#304FFE]">
                <a href="mailto:awesome_pro_racquets@gmail.com">
                  awesome_pro_racquets@gmail.com
                </a>
              </SubHeading>
            </div>
            <div className="shop__contact-info-inner">
              <SubHeading customClass="shop__contact-info-inner-heading">
                {t('taskOpenedPlayerPhoneHeading')}
              </SubHeading>
              <SubHeading customClass="shop__contact-info-inner-txt text-[#304FFE]">
                <a href="tel:(123) 4567-8910">(123) 4567-8910</a>
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
            <div className="shop__contact-info-inner">
              <div className="text-[#969696] font-semibold text-[12px] mb-[12px]">
                Password
              </div>
              <div className="bg-[#F8F8F8] border-[#E8E8E8] border-[1px] p-[6px] rounded-[12px] flex items-center justify-between">
                <div className="p-[10px]">••••••••••••</div>
                <HeadingButton
                  text="Reset"
                  onClick={() => {
                    navigate('/reset-password?comingFrom=shop');
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
