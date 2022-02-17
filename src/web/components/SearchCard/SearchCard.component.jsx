// Custom Components
import { SubHeading, Description } from 'web/components';

// Styles
import './SearchCard.styles.scss';

export function SearchCard({ shop, brand }) {
  return (
    <>
      <div className="search">
        <div className="search__card-container">
          <div className="search__card-container-divider"></div>
          <div className="search__card-container-content">
            {!brand ? (
              <>
                <div className="search__card-container-content-img">
                  <img src="/img/orderpage/shop.png" alt="shop" />
                </div>
                <div className="search__card-container-content-txt">
                  <SubHeading customClass="search__card-container-content-heading">
                    {shop?.name}
                  </SubHeading>
                  <Description customClass="search__card-container-content-text">
                    {shop?.address}
                  </Description>
                </div>
              </>
            ) : (
              <>
                <div className="search__card-container-content-txt">
                  <div>
                    <SubHeading customClass="search__card-container-content-heading">
                      {brand?.name}
                    </SubHeading>
                    <SubHeading>{brand.price}</SubHeading>
                  </div>
                  <Description customClass="search__card-container-content-text">
                    {brand?.address}
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
