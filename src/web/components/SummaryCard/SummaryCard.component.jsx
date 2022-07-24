// Custom Components
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { SubHeading, Heading } from "web/components";

// Styles
import "./SummaryCard.styles.scss";

const Item = ({ heading, description, price, isOutOfStock }) => {
  return (
    <div className="summary-card__container-content-txt-item">
      <div className="summary-card__container-content-txt-item-content">
        {heading ? (
          <div
            className={`summary-card__container-content-txt-item-content-heading ${
              isOutOfStock ? "text-[#E40000] " : ""
            }`}
          >
            {heading} {isOutOfStock && "(out of stock)"}
          </div>
        ) : (
          <></>
        )}
        <div className="summary-card__container-content-txt-item-content-description">
          {description}
        </div>
      </div>
      <div className="summary-card__container-content-txt-item-price">
        {price}
      </div>
    </div>
  );
};

export function SummaryCard() {
  const racquet = useSelector((state) => state.racquet?.racquet);
  const shop = useSelector((state) => state.shop?.shop);

  let mainsPrice = racquet && racquet?.mains?.string_id?.price;
  let crossesPrice = racquet && racquet?.crosses?.string_id?.price;
  if (racquet && racquet?.mains?.string_id?.hybrid_type === "Reel") {
    mainsPrice = racquet && racquet?.mains?.string_id?.price / 2;
  }
  if (racquet && racquet?.crosses?.string_id?.hybrid_type === "Reel") {
    crossesPrice = racquet && racquet?.crosses?.string_id?.price / 2;
  }

  const items = [
    {
      heading: "Mains",
      isOutOfStock: !racquet?.mains?.string_id?.in_stock,
      description: `${racquet?.mains?.string_id?.name}(${racquet?.mains?.string_id?.hybrid_type}) ${racquet?.mains?.string_id?.size} G @ ${racquet?.mains?.string_id?.tension} lbs`,
      price: `$${mainsPrice}`,
    },
    {
      heading: "Crosses",
      isOutOfStock: !racquet?.crosses?.string_id?.in_stock,
      description: `${racquet?.crosses?.string_id?.name}(${racquet?.crosses?.string_id?.hybrid_type}) ${racquet?.crosses?.string_id?.size} G @ ${racquet?.crosses?.string_id?.tension} lbs`,
      price: `$${crossesPrice}`,
    },
    {
      description: "Labor",
      price: `$${shop && shop?.labor_price}`,
    },
    {
      description: "Tax",
      price: `$${shop && shop?.tax}`,
    },
  ];

  useEffect(() => {}, [racquet, shop]);

  const TotalPrice = mainsPrice + crossesPrice + shop?.labor_price + shop?.tax;

  let isOutOfStock = false;
  items.forEach((item) => {
    if (item?.isOutOfStock) {
      isOutOfStock = true;
    }
  });
  return (
    <>
      <div
        className={`summary-card ${
          isOutOfStock ? "summary-card__out-of-stock" : ""
        }`}
      >
        <div className="summary-card__container">
          <div className={`summary-card__container-content`}>
            <div className="summary-card__container-content-txt">
              <Heading customClass="summary-card__container-content-txt-heading">
                Replace Strings
              </Heading>
              <SubHeading customClass="summary-card__container-content-txt-subheading">
                ${TotalPrice}
              </SubHeading>
              {items.map((item, index) => (
                <Item {...item} key={`${item.description}-${index}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {isOutOfStock && (
        <div className="mt-[12px] text-[#E40000] font-semibold text-[12px]">
          The strings you've selected are out of stock at this shop. Press
          “Change strings” to browse in stock options.
        </div>
      )}
    </>
  );
}
