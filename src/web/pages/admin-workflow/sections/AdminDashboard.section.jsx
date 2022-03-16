import { HeadingButton, Heading, Avatar, Tabs } from 'web/components';
import './AdminDashboard.styles.scss';

export function AdminDashboard({ t, setCurrentScreen }) {
  return (
    <>
      <div className="admin-dashboard">
        <div className="admin-dashboard__profile">
          <div className="admin-dashboard__profile-avatar">
            <Avatar height={102} width={102} img="/img/player/1.png" />
            <div className="admin-dashboard__profile-avatar-text">
              <Heading customClass="admin-dashboard__profile-avatar-text-heading">
                Bryan Song
              </Heading>
            </div>
          </div>
          <div className="admin-dashboard__profile-close">
            <HeadingButton close height="48px" width="48px" />
          </div>
        </div>

        <div className="admin-dashboard__menu">
          <Tabs
            tabs={[
              {
                title: 'Requests',
                icon: '/img/drawer/tick.png',
                onClick: () => setCurrentScreen('request'),
              },
              {
                title: 'Payments',
                icon: '/img/drawer/payment.png',
                onClick: () => setCurrentScreen('payment'),
              },
              {
                title: 'Export',
                icon: '/img/drawer/export.png',
              },
              { title: 'Logout', icon: '/img/drawer/logout.png' },
            ]}
          />
        </div>
      </div>
    </>
  );
}
