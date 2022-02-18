import { Heading, Description } from 'web/components';
// import { Description } from '../atoms/Description.atom';
import './AccountCard.styles.scss';

export function AccountCard(props) {
  return (
    <>
      <div className="account-card">
        <div className="account-card__text-container">
          <Heading customClass="account-card__text-container-heading">
            {props.heading}
          </Heading>
          <Description customClass="account-card__text-container-txt">
            {props.description}
          </Description>
          <button className="account-card__text-container-btn">
            {' '}
            Get started
          </button>
        </div>
        <div className="account-card__Image">
          <img src={props.img} alt="image" />
        </div>
      </div>
    </>
  );
}
