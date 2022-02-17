import { Field } from 'redux-form';
import { Link } from 'react-router-dom';

// Custom Components
import { SearchCard, CustomInput } from 'web/components';

// Styles
import './BrandSearchResults.styles.scss';

export function BrandSearchResults({ t }) {
  return (
    <>
      <div className="brand-result">
        <div className="brand-result__search-container">
          <Field
            name="brand-search"
            type="text"
            icon="/img/orderpage/search.png"
            label="Search By Name, City Or State"
            noLabel
            component={CustomInput}
          />
          <Link to="#">
            <span className="brand-result__search-container-link">Cancel</span>
          </Link>
        </div>
        <div className="brand-result__results">
          <SearchCard
            brand={{
              name: 'Brnad Name',
              price: '$12.50',
              address: 'Brand Address',
            }}
          />
        </div>
      </div>
    </>
  );
}
