import { useEffect, useState } from 'react';
import { HeadingButton, Heading, Avatar, Tabs } from 'web/components';
import { exportToExcel } from 'web/utils';
import './AdminDashboard.styles.scss';

const getData = () => {
  let data = [];
  for (let i = 0; i <= 25; i++) {
    data.push({
      firstName: `first${i}`,
      lastName: `last${i}`,
      email: `abc${i}@gmail.com`,
      address: `000${i} street city, ST`,
      zipcode: `0000${i}`,
    });
  }
  return data;
};

export function AdminDashboard({ t, setCurrentScreen }) {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    setData(getData());
  }, []);

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
                onClick: () => exportToExcel(data, 'admin-data'),
              },
              { title: 'Logout', icon: '/img/drawer/logout.png' },
            ]}
          />
        </div>
      </div>
    </>
  );
}
