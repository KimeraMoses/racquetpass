import {
  HeadingButton,
  Heading,
  SubmitButton,
  SearchCard,
} from 'web/components';

import './EditShop.styles.scss';

export const EditShop = ({ t, setCurrent }) => {
  return (
    <>
      <div className="editshop">
        <div>
          <div className="proshop__header">
            <div className="proshop__header-title">
              <HeadingButton drawer onClick={() => setCurrent('drawer')} />
              <Heading>Edit Pro Shops</Heading>
            </div>
            <div className="proshop__header-btn">
              <HeadingButton text={'Done'} onClick={() => setCurrent('shop')} />
            </div>
          </div>
          <div className="proshop__content">
            <SearchCard
              shop={{
                name: 'Jimmy’s Pro Shop',
                address: '123 Main Street, Seattle, WA',
                homeShop: true,
                editPage: true,
              }}
            />
            <SearchCard
              shop={{
                name: 'Jimmy’s Pro Shop',
                address: '123 Main Street, Seattle, WA',
                editPage: true,
                editOnClick: () => setCurrent('shop'),
              }}
            />
            <SearchCard
              shop={{
                name: 'Jimmy’s Pro Shop',
                address: '123 Main Street, Seattle, WA',
                editPage: true,
                editOnClick: () => setCurrent('shop'),
              }}
            />
            <SearchCard
              shop={{
                name: 'Jimmy’s Pro Shop',
                address: '123 Main Street, Seattle, WA',
                editPage: true,
                editOnClick: () => setCurrent('shop'),
              }}
            />
            <SearchCard
              shop={{
                name: 'Jimmy’s Pro Shop',
                address: '123 Main Street, Seattle, WA',
                editPage: true,
                editOnClick: () => setCurrent('shop'),
              }}
            />
          </div>
        </div>

        <div className="account-details-pt__btn">
          <SubmitButton onClick={() => setCurrent('shop-search')}>
            Add Pro Shop
          </SubmitButton>
        </div>
      </div>
    </>
  );
};
