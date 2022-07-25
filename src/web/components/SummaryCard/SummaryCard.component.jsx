// Custom Components
import { useEffect } from "react";
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

export function SummaryCard({ summary }) {
  useEffect(() => {}, [summary]);

  let isOutOfStock = false;
  summary &&
    summary?.items.forEach((item) => {
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
                ${summary && summary?.TotalPrice}
              </SubHeading>
              {summary &&
                summary?.items.map((item, index) => (
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
