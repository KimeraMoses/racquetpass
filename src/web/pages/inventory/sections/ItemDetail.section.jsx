import {
  BackButton,
  Heading,
  HeadingButton,
  Description,
} from 'web/components';
import { SubHeading } from 'web/components/atoms/SubHeading.atom';

import './ItemDetail.styles.scss';

export function ItemDetails({ t, setCurrentScreen }) {
  return (
    <>
      <div className="item-details-inventory">
        <div className="item-details-inventory__header">
          <div className="flex items-center gap-[16px]">
            <BackButton onClick={() => setCurrentScreen('add')} />
            <Heading>{t('profileButtonAddNew')}</Heading>
          </div>
          <div>
            <HeadingButton
              text="Edit"
              onClick={() => setCurrentScreen('edit')}
            />
          </div>
        </div>
        <div className="mt-[30px] flex flex-col gap-[20px]">
          <div className="item-details-inventory__txt flex flex-col gap-[4px]">
            <SubHeading>{t('odrBrnd')}</SubHeading>
            <Description>{t('odrBrndDesc')}</Description>
          </div>
          <div className="item-details-inventory__txt flex flex-col gap-[4px]">
            <SubHeading>{t('ordModel')}</SubHeading>
            <Description>{t('ordModelDesc')}</Description>
          </div>
          <div className="item-details-inventory__txt flex flex-col gap-[4px]">
            <SubHeading>{t('inventoryItemPrice')}</SubHeading>
            <Description>
              {t('orderPaymentSummaryLabelPrice')}&nbsp;{' '}
              <span className="text-[#8E8E8E]">
                {t('inventoryItemRSDetail')}
              </span>
            </Description>
          </div>
          <div className="item-details-inventory__txt flex flex-col gap-[4px]">
            <SubHeading>{t('inventoryType')}</SubHeading>
            <Description>{t('inventoryTypeTxt')}</Description>
          </div>
          <div className="item-details-inventory__txt flex flex-col gap-[4px]">
            <SubHeading>{t('inStock')}</SubHeading>
            <Description>{t('inStockTxt')}</Description>
          </div>
        </div>
      </div>
    </>
  );
}
