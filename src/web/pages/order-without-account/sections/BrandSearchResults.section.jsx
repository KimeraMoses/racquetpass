import { useEffect, useRef } from 'react';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';

// Custom Components
import { SearchCard, CustomInput } from 'web/components';

// Styles
import './BrandSearchResults.styles.scss';

export function BrandSearchResults({
  t,
  setStringsCurrent,
  setMainCross,
  mainCross,
  strings,
  change,
  main,
  cross,
}) {
  let inputEl = useRef(null);
  useEffect(() => {
    inputEl.focus();
  }, [inputEl]);

  const screenChange = () => {
    if (mainCross?.current === 'search') {
      setMainCross({ current: 'initial' });
    } else if (strings?.current === 'search') {
      setStringsCurrent('initial');
    }
  };
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
            setFieldToBeFocused={(input) => {
              inputEl = input;
            }}
          />
          <Link to="#" onClick={screenChange}>
            <span className="brand-result__search-container-link">Cancel</span>
          </Link>
        </div>
        <div className="brand-result__results">
          <SearchCard
            brand={{
              name: 'Custom Name',
              description: 'Brand Address',
              price: 'price',
            }}
            main={main}
            cross={cross}
            onClick={screenChange}
            change={change}
          />
          <SearchCard
            brand={{
              name: 'Brnad Name',
              description: 'Brand Address',
              price: 'price',
            }}
            main={main}
            cross={cross}
            onClick={screenChange}
            change={change}
          />
        </div>
      </div>
    </>
  );
}
