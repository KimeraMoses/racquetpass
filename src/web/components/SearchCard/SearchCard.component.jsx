// Custom Components
import { useDispatch } from "react-redux";
import { SubHeading, Description } from "web/components";
import { fetchShopDetails } from "web/store/Actions/shopActions";

// Styles
import "./SearchCard.styles.scss";

export function SearchCard({
  shop,
  brand,
  raquet,
  string,
  change = () => {},
  main,
  cross,
  onClick = () => {},
}) {
  const dispatch = useDispatch();

  const handleClick = () => {
    // console.log("Selected brand", brand);
    if (shop) {
      change("shop", shop);
      dispatch(fetchShopDetails(shop?.shop_id));
    } else if (string) {
      change("string", string);
    } else if (raquet) {
      change("raquet", raquet);
    } else if (main) {
      change("main", brand);
    } else if (cross) {
      change("cross", brand);
    } else if (brand) {
      console.log(brand);
      change("brand", brand);
    }
    onClick();
  };
  return (
    <>
      <div className="search" onClick={handleClick}>
        <div
          className="search__card-container"
          style={shop?.editPage ? { gap: "10px" } : {}}
        >
          <div className="search__card-container-divider"></div>
          <div
            className={`search__card-container-content ${
              (raquet || brand || string || shop) &&
              "search__card-container-content-raquet"
            }`}
          >
            {shop ? (
              <>
                <div
                  className="search__card-container-content-img"
                  style={
                    shop?.editPage
                      ? { display: "flex", alignItems: "center", gap: "5px" }
                      : {}
                  }
                >
                  {shop?.editPage ? (
                    <img
                      src="/img/delete.png"
                      alt="shop"
                      style={{
                        height: "24px",
                        width: "24px",
                      }}
                    />
                  ) : (
                    <></>
                  )}
                  <img src={"/img/orderpage/shop.png"} alt="shop" />
                </div>
                <div className="search__card-container-content-txt">
                  <SubHeading customClass="search__card-container-content-heading">
                    {shop?.name}
                  </SubHeading>
                  <Description customClass="search__card-container-content-text">
                    {shop?.address}
                  </Description>
                </div>
                {shop?.homeShop ? (
                  <div className="search__card-container-content-hs">
                    Home Shop
                  </div>
                ) : shop?.editPage ? (
                  <div
                    className="search__card-container-content-seths"
                    onClick={shop?.editOnClick}
                  >
                    Set to home shop
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : brand ? (
              <>
                <div className="search__brand-card-container-content-txt">
                  <div>
                    <SubHeading customClass="search__brand-card-container-content-txt-heading">
                      {brand?.name}
                    </SubHeading>
                    <SubHeading customClass="search__brand-card-container-content-txt-subheading">
                      {brand?.description}
                    </SubHeading>
                  </div>
                  <Description customClass="search__brand-card-container-content-txt-text">
                    {brand?.price}
                  </Description>
                </div>
              </>
            ) : string ? (
              <>
                <div className="search__brand-card-container-content-txt search__brand-card-container-content-txt-string">
                  <div>
                    <SubHeading customClass="search__brand-card-container-content-txt-heading">
                      {string?.name}
                    </SubHeading>
                    <SubHeading customClass="search__brand-card-container-content-txt-subheading">
                      {string?.description}
                    </SubHeading>
                  </div>
                  {string?.in_stock && string?.price && (
                    <div>
                      <Description customClass="search__brand-card-container-content-txt-heading">
                        {string?.in_stock ? "In stock" : "Out of stock"}
                      </Description>
                      <Description customClass="search__brand-card-container-content-txt-text">
                        {string?.price}
                      </Description>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {raquet?.img ? (
                  <div className="search__card-container-content-img min-w-[44px]">
                    <img
                      src={raquet?.img}
                      alt="raquet"
                      className="h-[44px] w-[44px] object-cover rounded-[16px]"
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div className="search__card-container-content-txt">
                  <div className="search__card-container-content-heading">
                    <SubHeading customClass="search__card-container-content-heading-text">
                      {raquet?.name}
                    </SubHeading>
                    {raquet?.qrConnected && (
                      <div className="search__card-container-content-heading-connect">
                        Connected with QR
                      </div>
                    )}
                  </div>
                  <Description customClass="search__card-container-content-text">
                    {raquet?.model}
                  </Description>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
