// Custom Components
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

  const items = [
    {
      heading: "Mains",
      isOutOfStock: !racquet?.mains?.string_id?.in_stock,
      description: `${racquet?.mains?.string_id?.name} ${racquet?.mains?.string_id?.size} G @ ${racquet?.mains?.string_id?.tension} lbs`,
      price: `$${racquet?.mains?.string_id?.price}`,
    },
    {
      heading: "Crosses",
      isOutOfStock: !racquet?.crosses?.string_id?.in_stock,
      description: `${racquet?.crosses?.string_id?.name} ${racquet?.crosses?.string_id?.size} G @ ${racquet?.crosses?.string_id?.tension} lbs`,
      price: `$${racquet?.crosses?.string_id?.price}`,
    },
    {
      description: "Labor",
      price: `$${racquet?.shop?.labor_price}`,
    },
    {
      description: "Tax",
      price: "$4.50",
    },
  ];

  const TotalPrice =
    racquet?.mains?.string_id?.price +
    racquet?.crosses?.string_id?.price +
    racquet?.shop?.labor_price +
    4.5;

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
              {items.map((item) => (
                <Item {...item} key={item.description} />
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
