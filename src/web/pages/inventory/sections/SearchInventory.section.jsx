import { Fragment, useState } from 'react';
import {
  HeadingButton,
  Heading,
  CustomInput,
  SubHeading,
  SearchCard,
  StepButton,
} from 'web/components';

import './SearchInventory.styles.scss';

let search = [];
for (let i = 1; i <= 5; i++) {
  search.push({
    name: `Brand ${i} Model ${i}2${i}`,
    description: i % 2 === 0 ? 'Out of Stock' : 'In Stock',
    price: `$20${i}`,
  });
}

export function SearchInventory({ t, setCurrentScreen, setDrawer }) {
  const [inventoryData, setInventoryData] = useState(search);
  return (
    <>
      <div className="search-inventory">
        <div className="search-inventory__header">
          <HeadingButton drawer onClick={() => setDrawer()} />
          <Heading>{t('businessAccountDetailsInventory')}</Heading>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-full sm:w-[450px]">
            <div className="search-inventory__search">
              <CustomInput
                icon="/img/orderpage/search.png"
                label="Search Inventory"
                noLabel
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
                customOnChange={(e) => {
                  const value = e.target.value;
                  if (value) {
                    const filteredInventory = inventoryData.filter((item) =>
                      item?.name?.includes(value.toLowerCase())
                    );
                    setInventoryData(filteredInventory);
                  } else {
                    setInventoryData(search);
                  }
                }}
              />
            </div>

            <div className="search-inventory__strings">
              <SubHeading>{t('profileString')}</SubHeading>
            </div>
            <div className="search-inventory__cards">
              {inventoryData?.length ? (
                inventoryData.map((item, idx) => {
                  return (
                    <Fragment key={idx}>
                      <SearchCard
                        string={item}
                        onClick={() => {
                          setCurrentScreen('detail');
                        }}
                      />
                    </Fragment>
                  );
                })
              ) : (
                <div>No Data Found!</div>
              )}
            </div>
            <div className="search-inventory__buttons">
              {/* <StepButton outlined>{t('profileButtonCSV')}</StepButton> */}
              <StepButton
                onClick={() => {
                  setCurrentScreen('add');
                }}
                type="button"
                tabIndex="-1"
              >
                {t('inventoryItemBtn')}
              </StepButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
