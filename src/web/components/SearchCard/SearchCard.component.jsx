// Custom Components
import { SubHeading, Description } from 'web/components';

// Styles
import './SearchCard.styles.scss';

export function SearchCard({ shop, brand, raquet }) {
  return (
    <>
      <div className="search">
        <div className="search__card-container">
          <div className="search__card-container-divider"></div>
          <div
            className={`search__card-container-content ${
              raquet && 'search__card-container-content-raquet'
            }`}
          >
            {shop ? (
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
            ) : (
              <>
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
