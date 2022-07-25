import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Field } from "redux-form";
// Custom Components
import { Description, CustomInput, SearchCard } from "web/components";
import { fetchEnabledShops } from "web/store/Actions/shopActions";

// Styles
import "./ShopSearchResults.styles.scss";

export function ShopSearchResults({
  t,
  setShopCurrent,
  setStep,
  backFromReview,
  setBackFromReview,
  forward,
  change,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { shops, isFetching } = useSelector((state) => state.shop);
  console.log(shops);
  let inputEl = useRef(null);
  useEffect(() => {
    inputEl.focus();
  }, [inputEl]);
  let FilteredShops = shops && shops.filter((shop) => shop.enabled === true);
  console.log("Enabled", FilteredShops);
  const userSearchHandler = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    if (searchTerm !== "") {
      const Results = FilteredShops.filter((Result) => {
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
    dispatch(fetchEnabledShops());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="shop-result max-w-[450px] m-[0_auto]">
        <div className="shop-result__search-container">
          <Field
            name="shop-search"
            value={searchTerm}
            type="text"
            icon="/img/orderpage/search.png"
            label="Find pro shop or club"
            noLabel
            onChange={userSearchHandler}
            setFieldToBeFocused={(input) => {
              inputEl = input;
            }}
            component={CustomInput}
          />
          <div
            role="button"
            onClick={() => {
              if (backFromReview) {
                setStep(6);
                setBackFromReview(false);
              } else {
                navigate("/");
              }
            }}
          >
            <span className="shop-result__search-container-link">Cancel</span>
          </div>
        </div>
        <div className="shop-result__results">
          {isFetching ? (
            <SearchCard
              shop={{
                name: `Loading shops...`,
                address: `Please hold on as we get you all the shops to search...`,
              }}
            />
          ) : FilteredShops.length < 1 ? (
            <SearchCard
              shop={{
                name: `No enabled shops found on RacquetPass!`,
                address: `Try signing up a shop for users to make orders`,
              }}
            />
          ) : searchTerm.length > 3 && searchResults.length < 1 ? (
            <SearchCard
              shop={{
                name: `No shop matching '${searchTerm.toUpperCase()}' found!`,
                address: `Try searching with another term!`,
              }}
            />
          ) : (
            (searchResults.length > 0 ? searchResults : FilteredShops).map(
              (shop) => (
                <SearchCard
                  key={shop.id}
                  shop={{
                    shop_id: shop.id,
                    name: shop.name,
                    address: `${shop.address.street}, ${shop.address.city}, ${shop.address.state}`,
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
              )
            )
          )}
        </div>
        <div className="shop-result__account-container">
          <Description customClass="shop-result__account-container-text">
            {t("odrSearchNF")} &nbsp;
            <Link to="#" onClick={() => setShopCurrent("find")}>
              <span className="shop-result__accound-container-text-span">
                {t("odrSearchLK")}
              </span>
            </Link>
          </Description>
        </div>
      </div>
    </>
  );
}
