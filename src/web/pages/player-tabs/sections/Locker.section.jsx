import { Heading, HeadingButton, Description } from 'web/components';
import './Locker.styles.scss';

export const Locker = ({ t }) => {
  return (
    <div className="locker">
      <div className="locker__menu-bar">
        <div className="locker__menu-bar-drawer-title">
          <HeadingButton drawer />
          <Heading>My Locker</Heading>
        </div>
        <div className="locker__menu-bar-scan">
          <HeadingButton text={'Scan QR'} />
        </div>
      </div>
      <div className="locker__text">
        <Heading customClass="locker__text-heading">
          Welcome To Racquet Pass
        </Heading>
        <Description>
          Good to see you! To get started, try setting up your first racquet.
        </Description>
      </div>
      <div className="locker__image">
        <div className="locker__image-border">
          <div></div>
          <div className="locker__image-border-btn">
            <HeadingButton add />
          </div>
          <div className="locker__image-border-racquet">
            <img
              className="locker__image-border-racquet-img"
              src="img/homepage/racquet.png"
              alt="racquet"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
