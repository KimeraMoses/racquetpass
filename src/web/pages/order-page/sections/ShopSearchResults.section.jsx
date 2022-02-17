import { Link } from 'react-router-dom';
import { Field } from 'redux-form';
// Custom Components
import { Description, CustomInput, SearchCard } from 'web/components';

// Styles
import './ShopSearchResults.styles.scss';

export function ShopSearchResults({ t }) {
  return (
    <>
      <div className="shop-result">
        <div className="shop-result__search-container">
          <Field
            name="shop-search"
            type="text"
            icon="/img/orderpage/search.png"
            label="Search By Name, City Or State"
            noLabel
            component={CustomInput}
          />
          <Link to="#">
            <span className="shop-result__search-container-link">Cancel</span>
          </Link>
        </div>
        <div className="shop-result__results">
          <SearchCard
            shop={{
              name: 'Joe’s Tennis Pro',
              address: '123 Main Street, City, State',
            }}
          />
          <SearchCard
            shop={{
              name: 'Joe’s Tennis Pro',
              address: '123 Main Street, City, State',
            }}
          />
        </div>
        <div className="shop-result__account-container">
          <Description customClass="shop-result__account-container-text">
            {t('odrSearchNF')} &nbsp;
            <Link to="#">
              <span className="shop-result__accound-container-text-span">
                {t('odrSearchLK')}
              </span>
            </Link>
          </Description>
        </div>
      </div>
    </>
  );
}
