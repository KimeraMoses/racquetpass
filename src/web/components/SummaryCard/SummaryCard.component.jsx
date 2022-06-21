// Custom Components
import { SubHeading, Heading } from 'web/components';

// Styles
import './SummaryCard.styles.scss';

const items = [
  {
    heading: 'Mains',
    isOutOfStock: true,
    description: 'Luxilon Alu Rough 1.6 G @ 42 lbs',
    price: '$18.99',
  },
  {
    heading: 'Crosses',
    description: 'Luxilon Alu Rough 1.6 G @ 42 lbs',
    price: '$18.99',
  },
  {
    description: 'Labor',
    price: '$19.99',
  },
  {
    description: 'Tax',
    price: '$4.50',
  },
];

const Item = ({ heading, description, price, isOutOfStock }) => {
  return (
    <div className="summary-card__container-content-txt-item">
      <div className="summary-card__container-content-txt-item-content">
        {heading ? (
          <div
            className={`summary-card__container-content-txt-item-content-heading ${
              isOutOfStock ? 'text-[#E40000] ' : ''
            }`}
          >
            {heading} {isOutOfStock && '(out of stock)'}
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
          isOutOfStock ? 'summary-card__out-of-stock' : ''
        }`}
      >
        <div className="summary-card__container">
          <div className={`summary-card__container-content`}>
            <div className="summary-card__container-content-txt">
              <Heading customClass="summary-card__container-content-txt-heading">
                Replace Strings
              </Heading>
              <SubHeading customClass="summary-card__container-content-txt-subheading">
                $62.47
              </SubHeading>
              {items.map((item) => (
                <Item {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[12px] text-[#E40000] font-semibold text-[12px]">
        The strings you've selected are out of stock at this shop. Press “Change
        strings” to browse in stock options.
      </div>
    </>
  );
}
