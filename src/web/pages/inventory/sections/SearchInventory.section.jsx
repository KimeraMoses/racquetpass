import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HeadingButton,
  Heading,
  CustomInput,
  SubHeading,
  SearchCard,
  StepButton,
} from "web/components";
import { fetchAllStrings } from "web/store/Actions/racquetActions";

import "./SearchInventory.styles.scss";

export function SearchInventory({ t, setCurrentScreen, setDrawer, change }) {
  const shop = useSelector((state) => state?.auth?.user?.shop);
  const { strings, isLoading } = useSelector((state) => state.racquet);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllStrings(shop));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shop]);
  let FilteredStrings = strings;

  const isSearching = searchTerm.length < 1 ? false : true;
  useEffect(() => {
    setSearchResults([]);
  }, [isSearching]);

  return (
    <>
      <div className="search-inventory">
        <div className="search-inventory__header">
          <HeadingButton drawer onClick={() => setDrawer()} />
          <Heading>{t("businessAccountDetailsInventory")}</Heading>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-full sm:w-[450px]">
            <div className="search-inventory__search">
              <CustomInput
                icon="/img/orderpage/search.png"
                label="Search Inventory"
                noLabel
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                customOnChange={(e) => {
                  const value = e.target.value;
                  if (value) {
                    setSearchTerm(value);
                    const Results = FilteredStrings.filter((Result) => {
                      return Object.values(Result)
                        .join(" ")
                        .replace(/-/g, " ")
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                    });
                    setSearchResults(Results);
                  }
                }}
              />
            </div>

            <div className="search-inventory__strings">
              <SubHeading>{t("profileString")}</SubHeading>
            </div>
            <div className="search-inventory__cards">
              {isLoading ? (
                <SearchCard
                  string={{
                    name: `Loading strings...`,
                    description: `Please hold on as we get you all the strings to search...`,
                  }}
                />
              ) : searchTerm.length > 3 && searchResults.length < 1 ? (
                <SearchCard
                  string={{
                    name: `No string matching '${searchTerm.toUpperCase()}' found!`,
                    description: `Try searching with another term!`,
                  }}
                />
              ) : !isLoading && FilteredStrings?.length < 1 ? (
                <SearchCard
                  string={{
                    name: `No strings for this shop found!`,
                    description: `Click the add button below to add strings to your shop`,
                  }}
                />
              ) : (
                (searchResults.length > 0
                  ? searchResults
                  : FilteredStrings
                ).map((string) => (
                  <SearchCard
                    key={string.id}
                    onClick={() => {
                      setCurrentScreen("detail");
                      change("current_string", string);
                    }}
                    string={{
                      string_id: string.id,
                      tension: string.tension,
                      name: `${string.brand}, ${string.model}, (${string.hybrid_type})`,
                      description: `${string.hybrid_type}`,
                      in_stock: string?.in_stock,
                      price: `$${string.price}`,
                      size: string.size,
                    }}
                    // main={main}
                    // cross={cross}
                    // change={change}
                  />
                ))
              )}
              {/* {inventoryData?.length ? (
                inventoryData.map((item, idx) => {
                  return (
                    <Fragment key={idx}>
                      <SearchCard
                        string={item}
                        onClick={() => {
                          setCurrentScreen("detail");
                        }}
                      />
                    </Fragment>
                  );
                })
              ) : (
                <div>No Data Found!</div>
              )} */}
            </div>
            <div className="search-inventory__buttons">
              {/* <StepButton outlined>{t('profileButtonCSV')}</StepButton> */}
              <StepButton
                onClick={() => {
                  setCurrentScreen("add");
                }}
                type="button"
                tabIndex="-1"
              >
                {t("inventoryItemBtn")}
              </StepButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
