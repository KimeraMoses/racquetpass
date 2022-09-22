import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HeadingButton, Heading, SubHeading } from "web/components";

import "./ProShop.styles.scss";

// Create our number formatter.
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function ProShop({ t, setCurrentScreen, setDrawer }) {
  const navigate = useNavigate();
  const { shop, isFetching: isLoading } = useSelector((state) => state.shop);

  return (
    <>
      <div className="shop">
        <div className="shop__header">
          <div className="shop__header-headings">
            <HeadingButton drawer onClick={() => setDrawer()} />
            <Heading>{t("shopProHeading")}</Heading>
          </div>
          <HeadingButton
            text={t("shopButtonEdit")}
            onClick={() => {
              setCurrentScreen("editShop");
            }}
          />
        </div>

        <div className="max-w-[450px] m-[0_auto]">
          <div className="shop__services-card">
            <div className="shop__services-card-divider"></div>
            <div>
              <div className="shop__services-card-inner">
                <div className="shop__services-card-heading">
                  <Heading>{t("shopServiceHeading")}</Heading>
                </div>
                <div className="shop__services-card-inner-text">
                  <SubHeading customClass="shop__services-card-inner-text-heading">
                    {t("shopDeliveryTime")}
                  </SubHeading>
                  <SubHeading customClass="shop__services-card-inner-text-txt">
                    {/* {t("shopDeliveryTimeDay")} */}
                    {isLoading
                      ? "Loading..."
                      : `${
                          shop && shop.estimated_delivery_time
                            ? `${shop?.estimated_delivery_time}d`
                            : "Not set"
                        }`}
                  </SubHeading>
                </div>
                <div className="shop__services-card-inner-text">
                  <SubHeading customClass="shop__services-card-inner-text-heading">
                    {t("shopLaborPriceHeading")}
                  </SubHeading>
                  <SubHeading customClass="shop__services-card-inner-text-txt">
                    {/* {t("shopLaborPrice")} */}
                    {isLoading
                      ? "Loading..."
                      : shop && shop.labor_price
                      ? `${formatter.format(shop && shop?.labor_price)}`
                      : "Not set"}
                  </SubHeading>
                </div>
                {/* <div className="shop__services-card-inner-text">
                  <SubHeading customClass="shop__services-card-inner-text-heading">
                    {t("shopTaxPriceHeading")}
                  </SubHeading>
                  <SubHeading customClass="shop__services-card-inner-text-txt">
                    {isLoading
                      ? "Loading..."
                      : shop && shop?.tax
                      ? `${formatter.format(shop && shop?.tax)}`
                      : "Not set"}
                  </SubHeading>
                </div> */}
                <div className="shop__services-card-inner-text">
                  <SubHeading customClass="shop__services-card-inner-text-heading">
                    {t("shopString")}
                  </SubHeading>
                  <SubHeading customClass="shop__services-card-inner-text-txt">
                    {/* {t("shopNo")} */}
                    {isLoading
                      ? "Loading..."
                      : shop?.allow_own_strings
                      ? "Yes"
                      : "No"}
                  </SubHeading>
                </div>
              </div>
            </div>
          </div>
          <div className="shop__contact-heading">
            <Heading>{t("ShopContactHeading")}</Heading>
          </div>
          <div className="shop__contact-info">
            <div className="shop__contact-info-inner">
              <SubHeading customClass="shop__contact-info-inner-heading">
                {t("odrShopName")}
              </SubHeading>
              <SubHeading customClass="shop__contact-info-inner-txt">
                {/* {t("businessAccountDetailsHeading")} */}
                {isLoading ? "Loading..." : shop && shop?.name}
              </SubHeading>
            </div>
            <div className="shop__contact-info-inner">
              <SubHeading customClass="shop__contact-info-inner-heading">
                {t("shopEmailHeading")}
              </SubHeading>
              <SubHeading customClass="shop__contact-info-inner-txt text-[#304FFE]">
                <a href={`mailto:${shop && shop?.email}`}>
                  {isLoading ? "Loading..." : shop && shop?.email}
                </a>
              </SubHeading>
            </div>
            <div className="shop__contact-info-inner">
              <SubHeading customClass="shop__contact-info-inner-heading">
                {t("taskOpenedPlayerPhoneHeading")}
              </SubHeading>
              <SubHeading customClass="shop__contact-info-inner-txt text-[#304FFE]">
                <a href={`tel:${shop && shop?.phone}`}>
                  {isLoading ? "Loading..." : shop && shop?.phone}
                </a>
              </SubHeading>
            </div>

            <div className="shop__contact-info-inner">
              <SubHeading customClass="shop__contact-info-inner-heading">
                {t("orderOpenedShopAddressHeading")}
              </SubHeading>
              <SubHeading customClass="shop__contact-info-inner-txt">
                {/* {t("orderOpenedShopAddress")} */}
                {isLoading
                  ? "Loading..."
                  : `${shop && shop?.address?.street}${
                      shop && shop?.address?.apartment
                        ? `, ${shop?.address?.apartment}`
                        : ""
                    }`}
              </SubHeading>
              <SubHeading customClass="shop__contact-info-inner-txt">
                {!shop
                  ? "Loading..."
                  : `${shop && shop?.address?.city}, ${
                      shop && shop?.address?.state
                    } ${shop && shop?.address?.zip_code}`}
              </SubHeading>
              <SubHeading customClass="shop__contact-info-inner-txt">
                {!shop ? "Loading..." : `${shop && shop?.country}`}
              </SubHeading>
            </div>
            <div className="shop__contact-info-inner">
              <div className="text-[#969696] font-semibold text-[12px] mb-[12px]">
                Password
              </div>
              <div className="bg-[#F8F8F8] border-[#E8E8E8] border-[1px] p-[6px] rounded-[12px] flex items-center justify-between">
                <div className="p-[10px]">••••••••••••</div>
                <HeadingButton
                  text="Reset"
                  onClick={() => {
                    navigate("/reset-password?comingFrom=shop");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
