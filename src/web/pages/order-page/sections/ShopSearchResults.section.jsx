import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Field } from 'redux-form';
// Custom Components
import { Description, CustomInput, SearchCard } from 'web/components';

// Styles
import './ShopSearchResults.styles.scss';

export function ShopSearchResults({
  t,
  setShopCurrent,
  setStep,
  backFromReview,
  setBackFromReview,
  forward,
  change,
}) {
  const navigate = useNavigate();
  let inputEl = useRef(null);
  useEffect(() => {
    inputEl.focus();
  }, [inputEl]);
  return (
    <>
      <div className="shop-result">
        <div className="shop-result__search-container">
          <Field
            name="shop-search"
            type="text"
            icon="/img/orderpage/search.png"
            label="Find your pro shop or club by name, city, or state"
            noLabel
            setFieldToBeFocused={(input) => {
              inputEl = input;
            }}
            component={CustomInput}
          />
          <div role="button" onClick={() => navigate('/')}>
            <span className="shop-result__search-container-link">Cancel</span>
          </div>
        </div>
        <div className="shop-result__results">
          <SearchCard
            shop={{
              name: 'Joe’s Tennis Pro',
              address: '123 Main Street, City, State',
            }}
            onClick={() => {
              if (backFromReview) {
                setStep(6);
                setBackFromReview(false);
              } else {
                forward();
              }
            }}
            change={change}
          />
          <SearchCard
            shop={{
              name: 'Joe’s Tennis Pro',
              address: '123 Main Street, City, State',
            }}
            onClick={() => {
              if (backFromReview) {
                setStep(6);
                setBackFromReview(false);
              } else {
                forward();
              }
            }}
            change={change}
          />
          <SearchCard
            shop={{
              name: 'Joe’s Tennis Pro',
              address: '123 Main Street, City, State',
            }}
            onClick={() => {
              if (backFromReview) {
                setStep(6);
                setBackFromReview(false);
              } else {
                forward();
              }
            }}
            change={change}
          />
        </div>
        <div className="shop-result__account-container">
          <Description customClass="shop-result__account-container-text">
            {t('odrSearchNF')} &nbsp;
            <Link to="#" onClick={() => setShopCurrent('find')}>
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
