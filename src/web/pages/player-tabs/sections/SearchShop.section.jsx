import { CustomInput, HeadingButton, SearchCard } from 'web/components';
import { Link } from 'react-router-dom';
import './SearchShop.styles.scss';

export const SearchShop = ({ t, setCurrent }) => {
  return (
    <>
      <div className="pt-search-shop">
        <div className="pt-search-shop__header">
          <CustomInput
            icon="/img/orderpage/search.png"
            label="Search By Name, City Or State"
            noLabel
            // onClick={() => {
            //   setShopCurrent('search');
            // }}
          />
          <div className="pt-search-shop__header-link">
            <div
              className="pt-search-shop__header-link-txt"
              onClick={() => {
                setCurrent('shop');
              }}
            >
              Cancel
            </div>
          </div>
        </div>
        <div className="pt-search-shop__content">
          <SearchCard
            shop={{
              name: 'Jimmy’s Pro Shop',
              address: '123 Main Street, Seattle, WA',
            }}
          />
          <SearchCard
            shop={{
              name: 'Jimmy’s Pro Shop',
              address: '123 Main Street, Seattle, WA',
            }}
          />
        </div>
      </div>
    </>
  );
};
