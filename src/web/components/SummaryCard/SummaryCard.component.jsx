// Custom Components
import { SubHeading, Description, Heading } from 'web/components';

// Styles
import './SummaryCard.styles.scss';

const items = [
  {
    heading: 'Mains',
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

const Item = ({ heading, description, price }) => {
  return (
    <div className="summary-card__container-content-txt-item">
      <div className="summary-card__container-content-txt-item-content">
        {heading ? (
          <div className="summary-card__container-content-txt-item-content-heading">
            {heading}
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
  return (
    <>
      <div className="summary-card">
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
    </>
  );
}
