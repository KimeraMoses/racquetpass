import { useEffect, useRef, useState } from "react";
import { Field, reduxForm } from "redux-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { withNamespaces } from "react-i18next";
// Custom Components
import { SearchCard, CustomInput } from "web/components";

// Styles
import "./BrandSearchResults.styles.scss";
import { fetchAllStrings } from "web/store/Actions/racquetActions";
import { useDispatch, useSelector } from "react-redux";
import {
  setStringBrand,
  setStringCross,
  setStringMain,
} from "web/store/Slices/racquetSlice";

function BrandSearchResults({
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

  const shopId = useSelector((state) => state.shop?.shop?.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let inputEl = useRef(null);
  useEffect(() => {
    inputEl.focus();
  }, [inputEl]);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const type = query.get("type");
  console.log(type);

  // const screenChange = () => {
  //   if (mainCross?.current === "search") {
  //     setMainCross({ current: "initial" });
  //   } else if (strings?.current === "search") {
  //     setStringsCurrent("initial");
  //   }
  // };

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

  const isSearching = searchTerm.length > 1 ? false : true;
  useEffect(() => {
    setSearchResults([]);
  }, [isSearching]);

  useEffect(() => {
    dispatch(fetchAllStrings(shopId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopId]);

  return (
    <div className={`order-flow-page`}>
      <div className="brand-result-o max-w-[450px] m-[0_auto]">
        <div className="brand-result-o__search-container">
          <Field
            name="brand-search"
            type="text"
            value={searchTerm}
            onChange={userSearchHandler}
            icon="/img/orderpage/search.png"
            label="Search strings"
            noLabel
            component={CustomInput}
            setFieldToBeFocused={(input) => {
              inputEl = input;
            }}
          />
          <Link to="/order-flow/strings">
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
                    shop_id: string?.shop,
                    string_id: string?.id,
                    name: `${string?.name}${
                      string?.hybrid ? `(${string?.hybrid_type})` : ""
                    }`,
                    in_stock: string?.in_stock,
                    price: `$${string.price?.toFixed(2)}`,
                  }}
                  main={main}
                  cross={cross}
                  onClick={() => {
                    const stringDetails = {
                      shop: string?.shop,
                      string_id: string?.id,
                      name: `${string?.name} ${
                        string?.hybrid ? `(${string?.hybrid_type})` : ""
                      }`,
                      in_stock: string?.in_stock,
                      price: string.price?.toFixed(2),
                      hybrid_type: string?.hybrid_type,
                      brand: string?.brand,
                      model: string?.model,
                    };
                    if (type === "brand") {
                      // con
                    }
                    dispatch(
                      type === "main"
                        ? setStringMain(stringDetails)
                        : type === "cross"
                        ? setStringCross(stringDetails)
                        : setStringBrand(stringDetails)
                    );
                    navigate("/order-flow/strings");
                  }}
                  change={change}
                />
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}

BrandSearchResults = reduxForm({
  form: "strings",
})(BrandSearchResults);

export default withNamespaces()(BrandSearchResults);
