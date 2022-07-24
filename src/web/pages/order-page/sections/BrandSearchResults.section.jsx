import { useEffect, useRef, useState } from "react";
import { Field } from "redux-form";
import { Link } from "react-router-dom";

// Custom Components
import { SearchCard, CustomInput } from "web/components";

// Styles
import "./BrandSearchResults.styles.scss";
import { fetchAllStrings } from "web/store/Actions/racquetActions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { strings: AllStrings, isLoading } = useSelector(
    (state) => state.racquet
  );
  console.log(AllStrings);
  const shopId = useSelector(
    (state) => state?.form?.signup?.values?.shop?.shop_id
  );
  const dispatch = useDispatch();
  let inputEl = useRef(null);
  useEffect(() => {
    inputEl.focus();
  }, [inputEl]);

  const screenChange = () => {
    if (mainCross?.current === "search") {
      setMainCross({ current: "initial" });
    } else if (strings?.current === "search") {
      setStringsCurrent("initial");
    }
  };

  useEffect(() => {
    inputEl.focus();
  }, [inputEl]);

  let FilteredStrings = AllStrings.filter(
    (string) => string?.in_stock === true
  );

  const userSearchHandler = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    if (searchTerm !== "") {
      const Results = FilteredStrings.filter((Result) => {
        return Object.values(Result)
          .join(" ")
          .replace(/-/g, " ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(Results);
    }
  };
  const isSearching = searchTerm.length < 1 ? false : true;
  useEffect(() => {
    setSearchResults([]);
  }, [isSearching]);

  useEffect(() => {
    dispatch(fetchAllStrings(shopId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="brand-result-o max-w-[450px] m-[0_auto]">
        <div className="brand-result-o__search-container">
          <Field
            name="brand-search"
            type="text"
            value={searchTerm}
            onChange={userSearchHandler}
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
          {isLoading ? (
            <SearchCard
              brand={{
                name: `Loading strings...`,
                description: `Please hold on as we get you all the strings to search...`,
              }}
            />
          ) : FilteredStrings.length < 1 ? (
            <SearchCard
              brand={{
                name: `No strings found for the selected shop!`,
                description: `Try selecting another shop to continue with your order`,
              }}
            />
          ) : searchTerm.length > 3 && searchResults.length < 1 ? (
            <SearchCard
              brand={{
                name: `No string matching '${searchTerm.toUpperCase()}' found!`,
                description: `Try searching with another term!`,
              }}
            />
          ) : (
            (searchResults.length > 0 ? searchResults : FilteredStrings).map(
              (string) => (
                <SearchCard
                  key={string.id}
                  brand={{
                    string_id: string.id,
                    tension: string.tension,
                    name: `${string?.name}(${string.hybrid_type})`,
                    description: `${string.brand}, ${string.model}`,
                    price: `$${string.price}`,
                    size: string.size,
                  }}
                  main={main}
                  cross={cross}
                  onClick={screenChange}
                  change={change}
                />
              )
            )
          )}
        </div>
      </div>
    </>
  );
}
