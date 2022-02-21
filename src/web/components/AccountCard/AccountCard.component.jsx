import { Heading, Description } from 'web/components';
// import { Description } from '../atoms/Description.atom';
import './AccountCard.styles.scss';

export function AccountCard({ heading, description, img, onClick }) {
  return (
    <>
      <div className="account-card">
        <div className="account-card__text-container">
          <Heading customClass="account-card__text-container-heading">
            {heading}
          </Heading>
          <Description customClass="account-card__text-container-txt">
            {description}
          </Description>
          <button
            className="account-card__text-container-btn"
            onClick={onClick}
            type="button"
          >
            {' '}
            Get started
          </button>
        </div>
        <div className="account-card__Image">
          <img src={img} alt="image" />
        </div>
      </div>
    </>
  );
}
