import {
  HeadingButton,
  Heading,
  CustomInput,
  SubHeading,
  SearchCard,
  StepButton,
} from 'web/components';

import './SearchInventory.styles.scss';

export function SearchInventory({ t }) {
  return (
    <>
      <div className="search-inventory">
        <div className="search-inventory__header">
          <HeadingButton />
          <Heading>{t('businessAccountDetailsInventory')}</Heading>
        </div>
        <div className="search-inventory__search">
          <CustomInput
            icon="/img/orderpage/search.png"
            label="Search Inventory"
            noLabel
            onClick={() => {}}
          />
        </div>
        <div className="search-inventory__strings">
          <SubHeading>{t('profileString')}</SubHeading>
        </div>
        <div className="search-inventory__cards">
          <SearchCard
            string={{
              name: 'Brand Name',
              description: 'Brand Description',
              size: 'Size Description',
              price: 'price',
            }}
            onClick={() => {}}
          />
          <SearchCard
            string={{
              name: 'Brand Name',
              description: 'Brand Description',
              size: 'Size Description',
              price: 'price',
            }}
            onClick={() => {}}
          />
          <SearchCard
            string={{
              name: 'Brand Name',
              description: 'Brand Description',
              size: 'Size Description',
              price: 'price',
            }}
            onClick={() => {}}
          />
          <SearchCard
            string={{
              name: 'Brand Name',
              description: 'Brand Description',
              size: 'Size Description',
              price: 'price',
            }}
            onClick={() => {}}
          />
          <SearchCard
            string={{
              name: 'Brand Name',
              description: 'Brand Description',
              size: 'Size Description',
              price: 'price',
            }}
            onClick={() => {}}
          />
          <SearchCard
            string={{
              name: 'Brand Name',
              description: 'Brand Description',
              size: 'Size Description',
              price: 'price',
            }}
            onClick={() => {}}
          />
        </div>
        <div className="search-inventory__buttons">
          <StepButton outlined>{t('profileButtonCSV')}</StepButton>
          <StepButton>{t('profileButtonAddNew')}</StepButton>
        </div>
      </div>
    </>
  );
}
