import { Fragment } from 'react';
import {
  HeadingButton,
  Heading,
  CustomInput,
  SubHeading,
  SearchCard,
  StepButton,
} from 'web/components';

import './SearchInventory.styles.scss';

const search = [
  {
    name: 'Brand Name',
    description: 'Brand Description',
    size: 'Size Description',
    price: 'price',
  },
  {
    name: 'Brand Name',
    description: 'Brand Description',
    size: 'Size Description',
    price: 'price',
  },
  {
    name: 'Brand Name',
    description: 'Brand Description',
    size: 'Size Description',
    price: 'price',
  },
  {
    name: 'Brand Name',
    description: 'Brand Description',
    size: 'Size Description',
    price: 'price',
  },
  {
    name: 'Brand Name',
    description: 'Brand Description',
    size: 'Size Description',
    price: 'price',
  },
  {
    name: 'Brand Name',
    description: 'Brand Description',
    size: 'Size Description',
    price: 'price',
  },
];

export function SearchInventory({ t, setCurrentScreen }) {
  return (
    <>
      <div className="search-inventory">
        <div>
          <div className="search-inventory__header">
            <HeadingButton drawer onClick={() => setCurrentScreen('default')} />
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
            {search.map((item, idx) => {
              return (
                <Fragment key={idx}>
                  <SearchCard
                    string={item}
                    onClick={() => {
                      setCurrentScreen('edit');
                    }}
                  />
                </Fragment>
              );
            })}
          </div>
        </div>
        <div className="search-inventory__buttons">
          <StepButton outlined>{t('profileButtonCSV')}</StepButton>
          <StepButton
            onClick={() => {
              setCurrentScreen('add');
            }}
          >
            {t('profileButtonAddNew')}
          </StepButton>
        </div>
      </div>
    </>
  );
}
