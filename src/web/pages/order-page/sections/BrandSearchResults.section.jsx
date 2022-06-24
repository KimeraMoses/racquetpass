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
      <div className="brand-result-o max-w-[450px] m-[0_auto]">
        <div className="brand-result-o__search-container">
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
            <span className="brand-result-o__search-container-link">
              Cancel
            </span>
          </Link>
        </div>
        <div className="brand-result-o__results">
          <SearchCard
            brand={{
              name: "I'm bringing my own strings",
              description: ' ',
              price: '$0',
            }}
            main={main}
            cross={cross}
            onClick={screenChange}
            change={change}
          />
          <SearchCard
            brand={{
              name: 'Wilson NXT 16',
              description: 'In stock',
              price: '$9.50',
            }}
            main={main}
            cross={cross}
            onClick={screenChange}
            change={change}
          />
          <SearchCard
            brand={{
              name: 'Wilson NXT 16 (Packet)',
              description: 'In stock',
              price: '$18.99',
            }}
            main={main}
            cross={cross}
            onClick={screenChange}
            change={change}
          />
          <SearchCard
            brand={{
              name: 'Silicon Cooliostrings (Packet)',
              description: 'In stock',
              price: '$17.99',
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
