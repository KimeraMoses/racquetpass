import { React } from 'react';
import { Link } from 'react-router-dom';
import { HeadingButton, Heading, Tabs } from 'web/components';

import './Drawer.styles.scss';

export const Drawer = () => {
  return (
    <div className="drawer">
      <div className="drawer__profile">
        <div></div>

        <div className="drawer__profile-avatar">
          <div className="drawer__profile-avatar-img">
            <img src="/img/player/1.png" alt="player" />
          </div>
          <div className="drawer__profile-avatar-text">
            <Heading customClass="drawer__profile-avatar-text-heading">
              Mannan Cheema
            </Heading>
            <Link className="drawer__profile-avatar-text-link" to="#">
              View Profile
            </Link>
          </div>
        </div>

        <div className="drawer__close">
          <HeadingButton close />
        </div>
      </div>

      <div className="drawer__menu">
        <Tabs />
      </div>
    </div>
  );
};
